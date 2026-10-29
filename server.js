import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataDir = process.env.DATA_DIR || path.join(__dirname, 'data');
const dbFile = path.join(dataDir, 'db.json');

const defaultDb = {
  supporters: 0,
  planVotes: { '30': 0, '40': 0, '50': 0 },
  updatedAt: new Date().toISOString()
};

function readDb() {
  try {
    return { ...defaultDb, ...JSON.parse(fs.readFileSync(dbFile, 'utf8')) };
  } catch {
    return { ...defaultDb };
  }
}

function writeDb(db) {
  fs.mkdirSync(dataDir, { recursive: true });
  db.updatedAt = new Date().toISOString();
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
  return db;
}

app.get('/api/stats', (req, res) => {
  res.json(readDb());
});

app.post('/api/support', (req, res) => {
  const db = readDb();
  db.supporters += 1;
  writeDb(db);
  res.json({ ok: true, supporters: db.supporters });
});

app.post('/api/plan-vote', (req, res) => {
  const price = String(req.body?.price || '');
  if (!['30', '40', '50'].includes(price)) {
    return res.status(400).json({ ok: false, error: 'Plano inválido' });
  }
  const db = readDb();
  db.planVotes[price] += 1;
  writeDb(db);
  res.json({ ok: true, planVotes: db.planVotes });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Sinapse AI rodando em http://localhost:${port}`));

import express, { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'code' | 'text';
}

export const createCellsRouter = (filename: string, dir: string): Router => {
  const router = express.Router();

  const fullPath = join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      const result = await readFile(fullPath, { encoding: 'utf-8' });
      res.status(200).send(JSON.parse(result));
    } catch (error) {
      if (error.code === 'ENOENT') {
        await writeFile(fullPath, '[]', 'utf-8');
        res.status(200).send([]);
      } else {
        throw error;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    await writeFile(fullPath, JSON.stringify(cells, null, 2), 'utf-8');
    res.status(200).send({ status: 'ok' });
  });
  return router;
};

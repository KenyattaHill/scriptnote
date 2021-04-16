import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { dirname } from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  directory: string,
  useProxy: boolean = false
) => {
  const server = express();
  // TODO add ability to share a file?
  server.use(express.json());
  server.use(createCellsRouter(filename, directory));

  if (useProxy) {
    server.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    const packagePath = require.resolve(
      '@scriptnote/local-client/build/index.html'
    );
    server.use(express.static(dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    server.listen(port, resolve).on('error', reject);
  });
};

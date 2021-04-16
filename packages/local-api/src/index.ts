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
  const app = express();

  app.use(express.json());
  app.use(createCellsRouter(filename, directory));
  
  if (useProxy) {
    app.use(
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
    app.use(express.static(dirname(packagePath)));
  }


  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};

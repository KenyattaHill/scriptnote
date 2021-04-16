import { Command } from 'commander';
import { serve } from '@scriptnote/local-api';
import { join, dirname, basename } from 'path';
import open from 'open';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'scripts.js', { port }: { port: string }) => {
    try {
      const dir = join(process.cwd(), dirname(filename));
      await serve(Number(port), basename(filename), dir, !isProduction);
      await open(`http://localhost:${port}`);
    } catch (error) {
      if (error.code === 'EADDERINUSE') {
        console.log('Port is in use. Try running on a different port');
      } else {
        console.error('here is the error', error.message);
      }
      process.exit(1);
    }
  });

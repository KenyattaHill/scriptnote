import { PluginBuild } from 'esbuild-wasm';

export const unpkgPathPlugin = () => ({
  name: 'unpkg-path-plugin',
  setup(build: PluginBuild) {
    build.onResolve({ filter: /^index\.js$/ }, () => {
      return { path: 'index.js', namespace: 'a' };
    });
    build.onResolve({ filter: /^\.+\// }, (args: any) => {
      return {
        namespace: 'a',
        path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
          .href,
      };
    });
    build.onResolve({ filter: /.*/ }, async (args: any) => {
      return {
        namespace: 'a',
        path: `https://unpkg.com/${args.path}`,
      };
    });
  },
});

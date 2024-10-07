import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.tsx'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
  },
  experimental: {
    wasm: true
  },
  customizeWebpackConfig(config) {
      patchWasmModuleImport(config, false);
      config.output.environment = { ...config.output.environment, asyncFunction: true };
      return config
  },

};

function patchWasmModuleImport(config) {
  config.experiments = Object.assign(config.experiments || {}, {
    asyncWebAssembly: true,
    layers: true,
    topLevelAwait: true
  });

  config.optimization.moduleIds = 'named';

  config.module.rules.push({
    test: /\.wasm$/,
    type: 'asset/resource',
  });

  // TODO: improve this function -> track https://github.com/vercel/next.js/issues/25852
  // if (isServer) {
  //   config.output.webassemblyModuleFilename = './../static/wasm/tfhe_bg.wasm';
  // } else {
    config.output.webassemblyModuleFilename = 'static/wasm/tfhe_bg.wasm';
  // }
}

export default config;

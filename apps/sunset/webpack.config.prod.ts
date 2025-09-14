import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/module-federation/webpack';
import baseConfig from './module-federation.config';

export default composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(baseConfig, { dts: false }),
  (config) => {
    config.module = {
      ...config.module,
      rules: [
        ...config.module?.rules ?? [],
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgo: true,
                svgoConfig: {
                  plugins: [
                    { name: 'removeViewBox', active: false },
                    { name: 'removeXMLNS', active: true },
                  ],
                },
              },
            },
          ],
        },
      ],
    }

    config.output = {
      ...config.output,
      publicPath: 'https://horvbalazs.github.io/sunset/',
    }

    return config;
  }
);

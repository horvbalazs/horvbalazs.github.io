import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/module-federation/webpack';
import baseConfig from './module-federation.config';

// Nx plugins for webpack to build config object from Nx options and context.
/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
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

    return config;
  }
);

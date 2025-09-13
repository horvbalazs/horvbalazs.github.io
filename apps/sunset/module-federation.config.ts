import { ModuleFederationConfig, SharedLibraryConfig } from "@nx/module-federation";

const sharedLibraries: ({ name: string, config: SharedLibraryConfig })[] = [
  { name: 'react', config: { singleton: true, strictVersion: true, eager: true, requiredVersion: '19.0.0' } },
  { name: 'react-dom', config: { singleton: true, strictVersion: true, eager: true, requiredVersion: '19.0.0' } },
];

const moduleFederationConfig: ModuleFederationConfig = {
  name: 'sunset',
  exposes: {
    './Module': './src/app/app',
  },
  shared: (library) => sharedLibraries.find((lib) => lib.name === library)?.config ?? false,
};

export default moduleFederationConfig;
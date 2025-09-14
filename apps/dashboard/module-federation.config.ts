import { ModuleFederationConfig, SharedLibraryConfig } from "@nx/module-federation";

const sharedLibraries: ({ name: string, config: SharedLibraryConfig })[] = [
  { name: 'react', config: { singleton: true, strictVersion: true, requiredVersion: false } },
  { name: 'react-dom', config: { singleton: true, strictVersion: true, requiredVersion: false } },
];

const moduleFederationConfig: ModuleFederationConfig = {
  name: 'dashboard',
  remotes: [
    'sunset',
  ],
};

export default moduleFederationConfig;
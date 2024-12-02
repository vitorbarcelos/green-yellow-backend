import { createDefaultEsmPreset, pathsToModuleNameMapper } from 'ts-jest';
import tsConfig from './tsconfig.json' assert { type: 'json' }

const preset = createDefaultEsmPreset({
  tsconfig: tsConfig.compilerOptions,
  isolatedModules: true,
});

export default {
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { useESM: true }),
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest',
  ...preset
}

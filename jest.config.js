import tsConfig from './tsconfig.json' assert { type: 'json' }
import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest',
}

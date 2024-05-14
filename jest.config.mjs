/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/** @type {import('ts-jest').JestConfigWithTsJest} */
/** @type {import('jest').Config} */
const config = {
  'preset': 'ts-jest/presets/default',
  'testEnvironment': 'node',
  'setupFilesAfterEnv': ['jest-extended/all'],
  'rootDir': __dirname,
  'roots': ['<rootDir>'],
  'passWithNoTests': true,
  'moduleFileExtensions': ['js', 'json', 'ts'],
  'testPathIgnorePatterns': ['/node_modules/', '/cypress/'],
  'testRegex': '.*\\.spec\\.ts$'
};

export default config;

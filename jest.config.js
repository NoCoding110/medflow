/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/lib/supabase$': '<rootDir>/src/__mocks__/lib/supabase.ts',
    '^src/lib/supabase$': '<rootDir>/src/__mocks__/lib/supabase.ts',
    '^\.\./lib/supabase$': '<rootDir>/src/__mocks__/lib/supabase.ts',
    '^\./lib/supabase$': '<rootDir>/src/__mocks__/lib/supabase.ts',
    '^@/lib/agora$': '<rootDir>/src/__mocks__/lib/agora.ts',
    '^src/lib/agora$': '<rootDir>/src/__mocks__/lib/agora.ts',
    '^\.\./lib/agora$': '<rootDir>/src/__mocks__/lib/agora.ts',
    '^\./lib/agora$': '<rootDir>/src/__mocks__/lib/agora.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^react-audio-voice-recorder$': '<rootDir>/src/__mocks__/react-audio-voice-recorder.ts',
    '^@/lib$': '<rootDir>/src/__mocks__/lib/index.ts',
    '^@/lib/(.*)$': '<rootDir>/src/__mocks__/lib/$1',
    '^vite$': '<rootDir>/src/lib/mock/env.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
      tsconfig: 'tsconfig.json',
      isolatedModules: true
    }],
  },
  testMatch: [
    '**/__tests__/**/*.test.(ts|tsx)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/serviceWorker.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library|framer-motion)/)',
    '^.+\\.js$'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}; 
import * as migration_20260909_074602_initial from './20260909_074602_initial';

export const migrations = [
  {
    up: migration_20260909_074602_initial.up,
    down: migration_20260909_074602_initial.down,
    name: '20260909_074602_initial'
  },
];

// mikroOrm config file

import { defineConfig, Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export const ormOptions: Options<PostgreSqlDriver> = {
  entities: ['./dist/**/*.entity{.ts,.js}'],
  entitiesTs: ['./src/**/*.entity{.ts,.js}'],
  metadataProvider: TsMorphMetadataProvider,
  dbName: 'postgres',
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  driver: PostgreSqlDriver,
  debug: true,

  migrations: {
    transactional: true, // 트랜잭션 사용 여부
    disableForeignKeys: true, // 마이그레이션 중 외래 키 제약 조건 비활성화
    allOrNothing: true, // 모든 마이그레이션을 하나의 트랜잭션으로 실행
    dropTables: true, // 마이그레이션 실행 시 필요한 경우 테이블 드롭
    safe: false, // 안전 모드 (true일 경우 실제 변경 사항을 적용하지 않음)
    snapshot: true, // 스냅샷 생성 여부
  },
};

export default defineConfig(ormOptions);

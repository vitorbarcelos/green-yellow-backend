import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { CryptoModule } from '@crypto/crypto.module';
import { LoggerModule } from '@logger/logger.module';
import { DatabaseConfig } from '@/app/app.typings';
import { configs } from '@/app/app.config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CryptoModule,
    MulterModule.register(),
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      load: [() => configs],
      ignoreEnvFile: true,
      isGlobal: true,
      cache: true,
    }),
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const database = configService.getOrThrow<DatabaseConfig>('database');
        return {
          migrations: ['./dist/app/core/**/migrations/*.migration.js'],
          migrationsTableName: 'MigrationMeta',
          password: database.password,
          username: database.username,
          database: database.name,
          type: database.dialect,
          host: database.host,
          port: database.port,
          autoLoadEntities: true,
          migrationsRun: true,
        };
      },
    }),
  ],
})
export class CommonModule {}

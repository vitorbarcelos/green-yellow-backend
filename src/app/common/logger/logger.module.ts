import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {
  public static forRoot(): DynamicModule {
    return {
      providers: [LoggerService],
      exports: [LoggerService],
      module: LoggerModule,
      global: true,
    };
  }
}

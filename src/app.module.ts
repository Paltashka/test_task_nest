import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerMiddleware } from './middlewares/logger.middleware.js';
import { FinanceModule } from './modules/finance/finance.module.js';

@Module({
	imports: [FinanceModule, ConfigModule.forRoot({envFilePath: './.env'})],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

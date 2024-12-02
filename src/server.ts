import type { NestExpressApplication } from '@nestjs/platform-express';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import type { Express, Request, Response } from 'express';
import { LoggerService } from '@logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import cors, { CorsOptions } from 'cors';
import morgan, { Options } from 'morgan';
import bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Server {
  private express: Express;
  private logger: LoggerService;
  private app: NestExpressApplication;
  private configService: ConfigService;

  private defaultPort = 3333;

  private context: string = 'MainBootstrap';
  private environment?: string;
  private host?: string;
  private port?: number;

  private allowedContentTypes = ['application/*+json', 'application/json'];

  public static create(): Promise<Server> {
    return new Server().createApplication();
  }

  public listen(): Promise<any> {
    const port = this.port || this.defaultPort;
    return this.app.listen(port, () => {
      this.logger.log(`Application is running on: ${this.host}`, this.context);
      this.logger.log(`Documentation is available at: ${this.host}/docs`, this.context);
      this.logger.log(`Connect with the author on LinkedIn: https://www.linkedin.com/in/vitorbarcelos`, this.context);
      this.logger.log(`Node Environment: ${this.environment}`, this.context);
    });
  }

  private async createApplication<T extends NestExpressApplication>() {
    this.app = await NestFactory.create<T>(AppModule, { bufferLogs: true });
    this.express = this.app.get(HttpAdapterHost).httpAdapter.getInstance();
    this.configService = this.app.get(ConfigService);
    this.logger = this.app.get(LoggerService);
    this.setEnvironmentVariables();
    this.configure();
    return this;
  }

  private setEnvironmentVariables() {
    this.environment = this.configService.getOrThrow<string>('environment');
    this.host = this.configService.getOrThrow<string>('host');
    this.port = this.configService.getOrThrow<number>('port');
  }

  private configure(): void {
    const json = bodyParser.json({ type: this.allowedContentTypes });
    const urlencoded = bodyParser.urlencoded({ extended: false });
    const validationPipe = new ValidationPipe({
      whitelist: true,
      transform: true,
    });

    this.enableSwaggerDocumentation();
    this.enableRequestLogger();
    this.enableCorsRequest();

    this.app.useGlobalPipes(validationPipe);
    this.app.useLogger(this.logger);
    this.app.use(urlencoded);
    this.app.use(json);
  }

  private enableRequestLogger() {
    const format = ':method :url :status - :response-time ms';
    const options = this.getMorganConfiguration();
    this.app.use(morgan(format, options));
  }

  private getMorganConfiguration(): Options<Request, Response> {
    const write = (info: string) => {
      const message = info.trim();
      const context = 'MorganService';
      this.logger.log(message, context);
    };

    return {
      stream: {
        write,
      },
    };
  }

  private enableSwaggerDocumentation(): void {
    const builder = new DocumentBuilder();

    builder.setDescription('The GreenYellow Backend');
    builder.setTitle('GreenYellow Backend');
    builder.setVersion('1.0');
    builder.addBearerAuth();

    const config = builder.build();
    const document = () => SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('docs', this.app, document, {
      jsonDocumentUrl: 'docs/json',
    });
  }

  private enableCorsRequest(): void {
    const config = this.getCorsConfiguration();
    this.express.options('*', cors(config));
    this.express.use(cors(config));
  }

  private getCorsConfiguration(): CorsOptions {
    return {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      origin: '*',
    };
  }
}

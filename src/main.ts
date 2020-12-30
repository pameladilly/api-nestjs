import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bodyParser from 'body-parser';
import { jsJsxMap } from 'ts-loader/dist/constants';
import { options } from 'tsconfig-paths/lib/options';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  // var express = require('express'),
  //   appe = express(),
  //   http = require('http'),
  //   server = http.createServer(appe),
  //   xmlparser = require('express-xml-bodyparser');

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter())
  // app.use(express.json())
  // app.use(express.urlencoded());
  // app.use(xmlparser());

  // app.post('/receive-xml',  function(req, res, next) {
  //    console.log(req.body)
  // });

 // server.listen(1337);
  await app.listen(8080);
}
bootstrap();

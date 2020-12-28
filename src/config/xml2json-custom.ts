import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import convert from 'xml-js';

export const XmlToDto = createParamDecorator(

  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const object = convert.xml2js(request.rawBody /** teu raw body aqui. */);

    return object;
  },

);
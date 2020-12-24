import { Injectable } from '@nestjs/common';

@Injectable()
export class JogadoresService {
  getHello(): string {
    return 'Hello World!';
  }
}

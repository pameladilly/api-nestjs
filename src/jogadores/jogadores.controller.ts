import { Controller, Get } from '@nestjs/common';
import { JogadoresService} from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Get()
  async getHello() {
    return JSON.stringify( {"nome": "pamela"}

    );
  }
}

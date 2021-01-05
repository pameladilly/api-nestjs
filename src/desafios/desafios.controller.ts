import { Body, Controller, Logger, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarDesafioDto } from './dto/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { DesafiosService } from './desafios.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';

@Controller('api/v1/desafios')
export class DesafiosController {

  constructor(private readonly desafiosService: DesafiosService) {}

  private readonly logger = new Logger(DesafiosController.name)

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio>{
    this.logger.log(`criar deafioDto: ${JSON.stringify(criarDesafioDto)}`)
    return await this.desafiosService.criarDesafio(criarDesafioDto)
  }


}

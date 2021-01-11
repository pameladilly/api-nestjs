import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarDesafioDto } from './dto/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { DesafiosService } from './desafios.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';
import { AtualizarDesafioDto } from './dto/atualizar-desafio.dto';

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

  @Get()
  async consultarDesafios(@Query('idJogador') _id: string): Promise<Array<Desafio>> {
    return _id ? await this.desafiosService.consultarDesafiosDeUmJogador(_id)
      : await this.desafiosService.consultarTodosDesafios()
  }

  @Put("/:desafio")
  async atualizarDesafio(@Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
                         @Param("desafio") _id: string): Promise<void> {

    await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto)

  }



}

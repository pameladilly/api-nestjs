import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, Param,
  Post, Put,
  Query, Req, Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JogadoresService} from './jogadores.service';
import { CriarJogadorDto} from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {  } from 'axios';
import { XmlToDto } from '../config/xml2json-custom';
import { xml2json } from 'xml-js';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) : Promise<Jogador>{
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizar(@Param('_id', JogadoresValidacaoParametrosPipe) _id: String, @Body()
      criarJogadorDto: CriarJogadorDto): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, criarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]>{
    return await this.jogadoresService.consultarTodosJogadores()

  }

  @Get('/:_id')
  async consultarJogadorPeloId(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<Jogador>{
      return await this.jogadoresService.consultarJogadorPeloId(_id)

  }

  @Delete('/:_id')
  async deletarJogador(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void>{
      this.jogadoresService.deletarJogador(_id)

  }
}

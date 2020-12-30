import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';

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
  async atualizar(@Param('_id', ValidacaoParametrosPipe) _id: String, @Body()
      criarJogadorDto: CriarJogadorDto): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, criarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]>{
    return await this.jogadoresService.consultarTodosJogadores()

  }

  @Get('/:_id')
  async consultarJogadorPeloId(@Param('_id', ValidacaoParametrosPipe) _id: string): Promise<Jogador>{
      return await this.jogadoresService.consultarJogadorPeloId(_id)

  }

  @Delete('/:_id')
  async deletarJogador(@Param('_id', ValidacaoParametrosPipe) _id: string): Promise<void>{
      this.jogadoresService.deletarJogador(_id)

  }
}

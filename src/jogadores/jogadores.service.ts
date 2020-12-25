import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import  * as uuid from 'uuid'

@Injectable()
export class JogadoresService {

  private jogadores: Jogador[] = []

  private readonly logger = new Logger(JogadoresService.name)

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto

    const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

    if(jogadorEncontrado){
      await this.atualizar(jogadorEncontrado, criaJogadorDto)
    }else{
      await this.criar(criaJogadorDto)
    }

  }

  async consultarTodosJogadores(): Promise<Jogador[]>{
    return this.jogadores;
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador>{
    const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
    if(jogadorEncontrado) {
      return jogadorEncontrado
    }else{
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
    }
  }

  async deletarJogador(email: string): Promise<void>{
    const jogadorEncontrador = await this.jogadores.find(jogador => jogador.email === email)
    if(jogadorEncontrador) {
      this.jogadores.splice(this.jogadores.indexOf(jogadorEncontrador), 1)
    }else{
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
    }
  }

  private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void{
    const  { nome } = criarJogadorDto
    jogadorEncontrado.nome = nome

  }

  private criar(criaJogadorDto: CriarJogadorDto): void{
    const { nome, telefoneCelular, email} = criaJogadorDto

    const jogador: Jogador = {
      _id: Math.random().toString(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg'
    };
    this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
    this.jogadores.push(jogador)
  }

}

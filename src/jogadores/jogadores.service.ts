import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {


  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

  private readonly logger = new Logger(JogadoresService.name)

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto

    //const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()

    if(jogadorEncontrado){
      await this.atualizar( criaJogadorDto)
    }else{
      await this.criar(criaJogadorDto)
    }

  }

  async consultarTodosJogadores(): Promise<Jogador[]>{
    //return this.jogadores;
    return await this.jogadorModel.find().exec()
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador>{
    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()
    if(jogadorEncontrado) {
      return jogadorEncontrado
    }else{
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
    }
  }

  async deletarJogador(email: string): Promise<any>{
    /*const jogadorEncontrador = await this.jogadores.find(jogador => jogador.email === email)

    if(jogadorEncontrador) {
      this.jogadores.splice(this.jogadores.indexOf(jogadorEncontrador), 1)
    }else{
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
    }*/

    return await this.jogadorModel.remove({email}).exec()
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{
    return await this.jogadorModel
        .findOneAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec()

    /*const  { nome } = criarJogadorDto
    jogadorEncontrado.nome = nome
    */
  }

  private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador>{

    const jogadorCriado = new this.jogadorModel(criaJogadorDto)
    return await jogadorCriado.save()

  /*  const { nome, telefoneCelular, email} = criaJogadorDto

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
  */
  }


}

import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {


  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

  private readonly logger = new Logger(JogadoresService.name)

  async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
      const { email } = criaJogadorDto
      const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()

    if(jogadorEncontrado){
      throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`)
    }
    const jogadorCriado = new this.jogadorModel(criaJogadorDto)
    return await jogadorCriado.save()

  }

  async atualizarJogador(_id: String, criaJogadorDto: CriarJogadorDto): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec()

    if(!jogadorEncontrado){
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }
    await this.jogadorModel
      .findOneAndUpdate({_id}, {$set: criaJogadorDto}).exec()

  }

  async consultarTodosJogadores(): Promise<Jogador[]>{
    //return this.jogadores;
    return await this.jogadorModel.find().exec()
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador>{
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec()
    if(jogadorEncontrado) {
      return jogadorEncontrado
    }else{
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }
  }

  async deletarJogador(_id: string): Promise<any>{

    const jogadorEncontrado = this.jogadorModel.findById(_id)
    if(!jogadorEncontrado){
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }
    return await this.jogadorModel.deleteOne({_id}).exec()
  }


}

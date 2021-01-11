import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desafio } from './interfaces/desafio.interface';
import { JogadoresService } from '../jogadores/jogadores.service';
import { CriarDesafioDto } from './dto/criar-desafio.dto';
import { CategoriasService } from '../categorias/categorias.service';
import { DesafioStatus } from './interfaces/desafio-status.enum';
import { AtualizarDesafioDto } from './dto/atualizar-desafio.dto';

@Injectable()
export class DesafiosService {
  constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
              private readonly jogadoresService: JogadoresService,
              private readonly categoriasService: CategoriasService) {}

  private readonly logger = new Logger(DesafiosService.name)


  async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {

    const jogadores = await this.jogadoresService.consultarTodosJogadores()

    criarDesafioDto.jogadores.map( jogadorDto => {

      const jogadorFilter = jogadores.filter( jogador => jogador._id == jogadorDto._id)
      if(jogadorFilter.length == 0){
        throw new BadRequestException(`O id ${jogadorDto._id} não é um jogador!`)
      }
    })
   // const solicitantePossuiCategoria = this.categoriasService.
    const solicitanteEhJogadorDaPartida = await
      criarDesafioDto.jogadores.filter( jogador => jogador._id == criarDesafioDto.solicitante)

    if(solicitanteEhJogadorDaPartida.length == 0){
      throw new BadRequestException(`O solicitante deve ser um jogador da partida!`)
    }

    const categoriaDoJogador = await this.categoriasService.consultarCategoriaDoJogador(criarDesafioDto.solicitante._id)

    if(!categoriaDoJogador){
      throw new BadRequestException(`O solicitante precisa estar registrado em uma categoria!`)
    }
    const desafioCriado = new this.desafioModel(criarDesafioDto)
    desafioCriado.categoria = categoriaDoJogador.categoria
    desafioCriado.dataHoraDesafio = new Date()
    desafioCriado.status = DesafioStatus.PENDENTE
    return await desafioCriado.save()

  }

  async consultarDesafiosDeUmJogador(_id: any) {
    const jogadores = await this.jogadoresService.consultarTodosJogadores()

    const jogadorFilter = jogadores.filter( jogador => jogador._id == _id)

    if(jogadorFilter.length == 0){
      throw new BadRequestException(`O id ${_id} não é um jogador!`)
    }

    return await this.desafioModel.find()
      .where('jogadores')
      .in(_id)
      .populate("solicitante")
      .populate("jogadores")
      .populate("partida")
      .exec()
  }

  async consultarTodosDesafios(): Promise<Array<Desafio>> {
    return await this.desafioModel.find()
      .populate("solicitante")
      .populate("jogadores")
      .populate("partida")
      .exec()
  }

  async atualizarDesafio(_id: string, atualizarDesafioDto: AtualizarDesafioDto) {
    const desafioEncontrado = await this.desafioModel.findById(_id).exec()

    if(!desafioEncontrado){
      throw new NotFoundException(`Desafio ${_id} não cadastrado!`)
    }

    if(atualizarDesafioDto.status){
      desafioEncontrado.dataHoraResposta = new Date()
    }

    desafioEncontrado.status = atualizarDesafioDto.status
    desafioEncontrado.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio

    await this.desafioModel.findOneAndUpdate({_id}, {$set: desafioEncontrado}).exec()
    
  }
}

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desafio } from './interfaces/desafio.interface';
import { JogadoresService } from '../jogadores/jogadores.service';
import { CriarDesafioDto } from './dto/criar-desafio.dto';
import { Jogador } from '../jogadores/interfaces/jogador.interface';
import { CategoriasService } from '../categorias/categorias.service';

@Injectable()
export class DesafiosService {
  constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
              private readonly jogadoresService: JogadoresService) {}

  private readonly logger = new Logger(DesafiosService.name)


  async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    criarDesafioDto.jogadores.forEach( jogador => {
      this.jogadoresService.consultarJogadorPeloId(jogador._id)
    })

    const jogadorEncontrado = criarDesafioDto.jogadores.filter( jogador => criarDesafioDto.solicitante === jogador)
    if(jogadorEncontrado.length == 0){
      throw new BadRequestException(`Solicitante ${criarDesafioDto.solicitante} não faz parte do desafio`)
    }

   // const solicitantePossuiCategoria = this.categoriasService.
    return undefined;
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interface/categoria.interface';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { JogadoresService } from '../jogadores/jogadores.service';

@Injectable()
export class CategoriasService {

  constructor(@InjectModel('Categoria') private readonly categoriasModel: Model<Categoria>,
              private readonly jogadoresService: JogadoresService) {}


  async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const categoriaEncontrada = await this.categoriasModel.findOne({categoria}).exec()

    if(categoriaEncontrada){
      throw new BadRequestException(`Categoria ${categoria} já cadastrada`)
    }

    const categoriaCriada = new this.categoriasModel(criarCategoriaDto)
    return await categoriaCriada.save()
  }

  async consultarTodasCategorias(): Promise<Array<Categoria>> {
    return await this.categoriasModel.find().populate("jogadores").exec()
  }

  async consultarCategoriaPeloId(categoria: string) {
    const categoriaEncontrada = await this.categoriasModel.findOne({categoria}).exec()
    if(!categoriaEncontrada){
      throw new NotFoundException(`Categoria com id ${categoria} não encontrada`)
    }else {
      return categoriaEncontrada
    }
  }

  async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto) : Promise<Categoria>{
    const categoriaEncontrada = await this.categoriasModel.findOne({categoria}).exec()

    if(!categoriaEncontrada){
      throw new NotFoundException(`Categoria  ${categoria} não encontrada`)
    }

    return await this.categoriasModel.findOneAndUpdate({categoria}, {$set: atualizarCategoriaDto}).exec()

  }

  async atribuirCategoriaJogador(params: string[]) {
    const categoria = params['categoria']
    const idJogador = params['idJogador']

    const categoriaEncontrada = await this.categoriasModel.findOne({categoria}).exec()
    const jogadorJaCadastradoCategoria = await this.categoriasModel.find({categoria})
        .where('jogadores').in(idJogador).exec()

    await this.jogadoresService.consultarJogadorPeloId(idJogador)

    if(!categoriaEncontrada){
      throw new BadRequestException(`Categoria ${categoria} não cadastrada`)
    }
    if(jogadorJaCadastradoCategoria.length > 0) {
      throw new BadRequestException(`Jogador ${idJogador} já cadastrado na Categoria ${categoria}`)
    }

    categoriaEncontrada.jogadores.push(idJogador)
    await this.categoriasModel.findOneAndUpdate({categoria}, {$set: categoriaEncontrada}).exec()

  }


}

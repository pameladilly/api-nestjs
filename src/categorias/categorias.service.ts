import { BadRequestException, Injectable } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interface/categoria.interface';

@Injectable()
export class CategoriasService {

  constructor(@InjectModel('Categoria') private readonly categoriasModel: Model<Categoria>) {}

  async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const categoriaEncontrada = await this.categoriasModel.findOne({categoria}).exec()

    if(categoriaEncontrada){
      throw new BadRequestException(`Categoria ${categoria} já cadastrada`)
    }

    const categoriaCriada = new this.categoriasModel(criarCategoriaDto)
    return await categoriaCriada.save()
  }
}

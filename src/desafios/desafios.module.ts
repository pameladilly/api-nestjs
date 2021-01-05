import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafio.schema';
import { JogadoresModule } from '../jogadores/jogadores.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Desafio', schema: DesafioSchema}]), JogadoresModule],
  providers: [DesafiosService],
  controllers: [DesafiosController]
})
export class DesafiosModule {}

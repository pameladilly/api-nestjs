import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:5apXZgIJhjrgeZw1@cluster0.jm7x0.mongodb.net/apinestjs?retryWrites=true&w=majority',
      {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}),
    JogadoresModule,
    CategoriasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

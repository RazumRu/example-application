import { PlacesService } from './services/places.service';
import './places.exceptions';
import { PlacesController } from './controllers/places.controller';
import { Module } from '@nestjs/common';
import { PlacesEntity } from './entity/places.entity';
import { registerEntities } from '@packages/typeorm';
import { PlacesDao } from './dao/places.dao';

@Module({
  imports: [PlacesModule, registerEntities([PlacesEntity])],
  controllers: [PlacesController],
  providers: [PlacesService, PlacesDao],
  exports: [],
})
export class PlacesModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PlacesService } from '../services/places.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreatePlaceDto,
  DeletePlaceByIdDto,
  GetPlaceByIdDto,
  GetPlacesDto,
  PlaceDto,
  UpdatePlaceDto,
} from '../dto/places.dto';

@Controller('places')
@ApiTags('places')
export class PlacesController {
  constructor(private readonly service: PlacesService) {}

  @Post('/')
  public async createPlace(@Body() data: CreatePlaceDto): Promise<PlaceDto> {
    return this.service.create(data);
  }

  @Patch('/:id')
  public async updatePlace(
    @Param('id') id: number,
    @Body() data: UpdatePlaceDto,
  ): Promise<PlaceDto> {
    return this.service.update(id, data);
  }

  @Get('/')
  public async getPlaces(@Query() data: GetPlacesDto): Promise<PlaceDto[]> {
    return this.service.getAll(data);
  }

  @Get('/:id')
  public async getPlaceById(@Param() data: GetPlaceByIdDto): Promise<PlaceDto> {
    return this.service.getById(data.id);
  }

  @Delete('/:id')
  public async deletePlaceById(
    @Param() data: DeletePlaceByIdDto,
  ): Promise<void> {
    await this.service.deleteById(data.id);
  }
}

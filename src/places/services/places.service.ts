import { Injectable } from '@nestjs/common';
import {
  CreatePlaceDto,
  GetPlacesDto,
  PlaceDto,
  UpdatePlaceDto,
} from '../dto/places.dto';
import { PlacesDao } from '../dao/places.dao';
import { EntityManager, TypeormService } from '@packages/typeorm';
import { PlacesEntity } from '../entity/places.entity';
import { isUndefined, pickBy } from 'lodash';
import { NotFoundException } from '@packages/exceptions';

@Injectable()
export class PlacesService {
  constructor(
    private readonly dao: PlacesDao,
    private readonly typeormService: TypeormService,
  ) {}

  public prepareResponse(data: PlacesEntity): PlaceDto {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public async create(data: CreatePlaceDto): Promise<PlaceDto> {
    const { row } = await this.typeormService.trx(
      async (entityManager: EntityManager) => {
        const row = await this.dao.create(data, entityManager);

        return { row };
      },
    );

    return this.prepareResponse(row);
  }

  public async update(id: number, data: UpdatePlaceDto): Promise<PlaceDto> {
    const { row } = await this.typeormService.trx(
      async (entityManager: EntityManager) => {
        const row = await this.dao.updateById(
          id,
          {
            ...pickBy(data, (v) => !isUndefined(v)),
          },
          entityManager,
        );

        if (!row) {
          throw new NotFoundException('PLACE_NOT_FOUND');
        }

        return { row };
      },
    );

    return this.prepareResponse(row);
  }

  public async getById(id: number): Promise<PlaceDto> {
    const { row } = await this.typeormService.trx(
      async (entityManager: EntityManager) => {
        const row = await this.dao.getById(id, entityManager);

        if (!row) {
          throw new NotFoundException('PLACE_NOT_FOUND');
        }

        return { row };
      },
    );

    return this.prepareResponse(row);
  }

  public async deleteById(id: number): Promise<void> {
    await this.typeormService.trx(async (entityManager: EntityManager) => {
      const row = await this.dao.getById(id, entityManager);

      if (!row) {
        throw new NotFoundException('PLACE_NOT_FOUND');
      }

      await this.dao.deleteById(id, entityManager);
    });
  }

  public async getAll(data: GetPlacesDto): Promise<PlaceDto[]> {
    const { rows } = await this.typeormService.trx(
      async (entityManager: EntityManager) => {
        const rows = await this.dao.getAll(data, entityManager);

        return {
          rows,
        };
      },
    );

    return rows.map(this.prepareResponse);
  }
}

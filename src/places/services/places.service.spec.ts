import { PlacesService } from './places.service';
import { PlacesDao } from '../dao/places.dao';
import { createMock } from '@golevelup/ts-jest';
import { buildMockPlace } from '../places.mocks';
import { Test } from '@nestjs/testing';
import {
  CreatePlaceDto,
  DeletePlaceByIdDto,
  GetPlaceByIdDto,
  GetPlacesDto,
  PlaceDto,
  UpdatePlaceDto,
} from '../dto/places.dto';
import { omit } from 'lodash';
import { entityManagerMock, typeormServiceMock } from '../../utils/utils.mocks';
import { TypeormService } from '@packages/typeorm';
import { NotFoundException } from '@packages/exceptions';
import { PlacesEntity } from '../entity/places.entity';
import 'jest-extended';

describe(PlacesService, () => {
  const daoMock = createMock<PlacesDao>();
  const mockEntity = buildMockPlace();

  let service: PlacesService;

  const validatePlaceDto = (entity: PlacesEntity, dto: PlaceDto) => {
    expect(entity.id).toBe(dto.id);
    expect(entity.name).toBe(dto.name);
    expect(entity.createdAt).toBe(dto.createdAt);
    expect(entity.updatedAt).toBe(dto.updatedAt);
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PlacesService,
        {
          provide: PlacesDao,
          useValue: daoMock,
        },
        {
          provide: TypeormService,
          useValue: typeormServiceMock,
        },
      ],
    }).compile();

    service = module.get(PlacesService);
  });

  describe('create', () => {
    const createDtoMock: CreatePlaceDto = omit(mockEntity, [
      'id',
      'createdAt',
      'updatedAt',
    ]);

    let response: PlaceDto;

    beforeAll(async () => {
      jest.clearAllMocks();

      daoMock.create.mockResolvedValueOnce(mockEntity);

      response = await service.create(createDtoMock);
    });

    it('should call create method in dao', () => {
      expect(daoMock.create).toHaveBeenCalledWith(
        createDtoMock,
        entityManagerMock,
      );
    });

    it('should return correct response', () => {
      validatePlaceDto(mockEntity, response);
    });
  });

  describe('update', () => {
    describe('when row is found', () => {
      const updateDtoMock: UpdatePlaceDto = {
        name: 'new name',
      };

      let response: PlaceDto;

      beforeAll(async () => {
        jest.clearAllMocks();

        daoMock.updateById.mockResolvedValueOnce(mockEntity);

        response = await service.update(1, updateDtoMock);
      });

      it('should call update method in dao', () => {
        expect(daoMock.updateById).toHaveBeenCalledWith(
          1,
          updateDtoMock,
          entityManagerMock,
        );
      });
      it('should return correct response', () => {
        validatePlaceDto(mockEntity, response);
      });
    });

    describe('when row is not found', () => {
      beforeAll(() => {
        jest.clearAllMocks();

        daoMock.updateById.mockResolvedValueOnce(null);
      });

      it('should throw error', async () => {
        await expect(service.update(1, {})).rejects.toThrow(
          new NotFoundException('LENS_NOT_FOUND'),
        );
      });
    });
  });

  describe('getById', () => {
    let response: PlaceDto;

    const requestData: GetPlaceByIdDto = {
      id: 1,
    };

    describe('should return row', () => {
      beforeAll(async () => {
        jest.clearAllMocks();

        daoMock.getById.mockResolvedValueOnce(mockEntity);

        response = await service.getById(requestData.id);
      });

      it('should call getById method in dao', () => {
        expect(daoMock.getById).toHaveBeenCalledWith(
          requestData.id,
          entityManagerMock,
        );
      });

      it('should return correct response', () => {
        validatePlaceDto(mockEntity, response);
      });
    });

    describe('should throw an error if row not found', () => {
      beforeAll(() => {
        jest.clearAllMocks();

        daoMock.getById.mockResolvedValueOnce(null);
      });

      it('should throw an error', async () => {
        await expect(service.getById(1)).rejects.toThrow(
          new NotFoundException('LENS_NOT_FOUND'),
        );
      });
    });
  });

  describe('deleteById', () => {
    const requestData: DeletePlaceByIdDto = {
      id: 1,
    };

    describe('should delete row', () => {
      beforeAll(async () => {
        jest.clearAllMocks();

        daoMock.getById.mockResolvedValueOnce(mockEntity);

        await service.deleteById(requestData.id);
      });

      it('should call getById method in dao', () => {
        expect(daoMock.getById).toHaveBeenCalledWith(
          requestData.id,
          entityManagerMock,
        );
      });

      it('should call deleteById method in dao', () => {
        expect(daoMock.deleteById).toHaveBeenCalledWith(
          requestData.id,
          entityManagerMock,
        );
      });
    });

    describe('when row is not found', () => {
      beforeAll(() => {
        jest.clearAllMocks();

        daoMock.getById.mockResolvedValueOnce(null);
      });

      it('should throw an error', async () => {
        await expect(service.deleteById(1)).rejects.toThrow(
          new NotFoundException('PLACE_NOT_FOUND'),
        );
      });
    });
  });

  describe('getAll', () => {
    describe('should return all rows', () => {
      let response: PlaceDto[];

      const mockDto: GetPlacesDto = {
        ids: [mockEntity.id, 555],
      };

      beforeAll(async () => {
        jest.clearAllMocks();

        daoMock.getAll.mockResolvedValueOnce([mockEntity]);

        response = await service.getAll(mockDto);
      });

      it('should call getAll in dao', () => {
        expect(daoMock.getAll).toHaveBeenCalledWith(mockDto, entityManagerMock);
      });

      it('should return correct response', () => {
        expect(response).toBeArray();
        validatePlaceDto(mockEntity, response[0]);
      });
    });
  });
});

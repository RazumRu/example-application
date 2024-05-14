import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TransformQueryArray } from '@packages/http-server';

export class PlaceDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class UpdatePlaceDto extends OmitType(PartialType(PlaceDto), [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class CreatePlaceDto extends OmitType(PlaceDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class DeletePlaceByIdDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class GetPlaceByIdDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class GetPlacesDto {
  @IsNumber(undefined, { each: true })
  @IsOptional()
  @TransformQueryArray(Number)
  ids?: number[];

  @IsNumber(undefined, { each: true })
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}

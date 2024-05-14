import {
  CreatePlaceDto,
  GetPlacesDto,
  PlaceDto,
  UpdatePlaceDto,
} from '../../../src/places/dto/places.dto';
import { generateRandomUUID } from '../common.helper';
import { omit } from 'lodash';

export const buildMockPlaceDto = (
  data?: Partial<CreatePlaceDto>,
): CreatePlaceDto => ({
  name: generateRandomUUID(),
  ...(data || {}),
});

export const createPlace = (body?: Partial<CreatePlaceDto>) =>
  cy.request<PlaceDto>({
    url: '/api/v1/places',
    method: 'POST',
    failOnStatusCode: false,
    body: buildMockPlaceDto(body),
  });

export const updatePlace = (id: number, body: UpdatePlaceDto) =>
  cy.request<PlaceDto>({
    url: `/api/v1/places/${id}`,
    method: 'PATCH',
    failOnStatusCode: false,
    body: body,
  });

export const getPlaceById = (id: number) =>
  cy.request<PlaceDto>({
    url: `/api/v1/places/${id}`,
    method: 'GET',
    failOnStatusCode: false,
  });

export const getPlaces = (data?: GetPlacesDto) =>
  cy.request<PlaceDto[]>({
    url: `/api/v1/places`,
    method: 'GET',
    qs: data,
  });

export const deletePlaceById = (id: number) =>
  cy.request({
    url: `/api/v1/places/${id}`,
    method: 'DELETE',
    failOnStatusCode: false,
  });

export const validatePlace = (
  data: PlaceDto,
  compare?: PlaceDto | CreatePlaceDto,
) => {
  expect(data.id).to.a('number');
  expect(data.name).to.a('string');
  expect(data.createdAt).to.a('string');
  expect(data.updatedAt).to.a('string');

  if (compare) {
    expect(data).to.deep.include(omit(compare, ['updatedAt']));
  }
};

import {
  buildMockPlaceDto,
  createPlace,
  deletePlaceById,
  getPlaceById,
  getPlaces,
  updatePlace,
  validatePlace,
} from './places.helper';
import { generateRandomInt } from '../common.helper';

describe('Places E2E', () => {
  describe('POST /api/places', () => {
    it('must create new place', () => {
      const newEntity = buildMockPlaceDto();

      createPlace(newEntity).then((response) => {
        validatePlace(response.body, newEntity);
      });
    });
  });

  describe('PATCH /api/places', () => {
    it('must update place', () => {
      let createdEntity;

      createPlace()
        .then((response) => {
          createdEntity = response.body;

          return updatePlace(createdEntity.id, {
            name: 'new-name',
          });
        })
        .then((response) => {
          expect(response.status).to.eq(200);

          validatePlace(response.body, {
            ...createdEntity,
            name: 'new-name',
          });
        });
    });

    it('must return 404 error', () => {
      updatePlace(generateRandomInt(), {
        name: 'new-name',
      }).then((response) => {
        expect(response.status).to.eq(404);

        expect((<any>response.body).fullMessage).to.include('PLACE_NOT_FOUND');
      });
    });
  });

  describe('GET /api/places/:id', () => {
    it('must get places by id', () => {
      let createdEntity;

      createPlace()
        .then((response) => {
          createdEntity = response.body;

          return getPlaceById(createdEntity.id);
        })
        .then((response) => {
          expect(response.status).to.eq(200);

          validatePlace(response.body, createdEntity);
        });
    });

    it('must return 404 error', () => {
      getPlaceById(generateRandomInt()).then((response) => {
        expect(response.status).to.eq(404);

        expect((<any>response.body).fullMessage).to.include('PLACE_NOT_FOUND');
      });
    });
  });

  describe('GET /api/places', () => {
    const createdEntities = [];

    before(() => {
      for (let i = 0; i < 3; i++) {
        createPlace().then((response) => {
          createdEntities.push(response.body);
        });
      }
    });

    it('must get all places', () => {
      getPlaces().then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.a('array');
        expect(response.body.length >= createdEntities.length).to.be.true;

        for (const entity of createdEntities) {
          const _i = response.body.find((i) => i.id === entity.id);
          validatePlace(entity, _i);
        }
      });
    });
  });

  describe('DELETE /api/places/:id', () => {
    it('must delete place by id', () => {
      let createdEntity;

      createPlace()
        .then((response) => {
          createdEntity = response.body;

          return deletePlaceById(createdEntity.id);
        })
        .then((response) => {
          expect(response.status).to.eq(200);

          return getPlaceById(createdEntity.id);
        })
        .then((response) => {
          expect(response.status).to.eq(404);

          expect((<any>response.body).errorCode).to.eq('PLACE_NOT_FOUND');
        });
    });
  });
});

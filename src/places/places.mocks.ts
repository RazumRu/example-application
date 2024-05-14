import { buildTimestampsEntityMockFields } from '@packages/typeorm';
import { PlacesEntity } from './entity/places.entity';

export const buildMockPlace = (data?: Partial<PlacesEntity>): PlacesEntity => ({
  id: 1,
  name: 'name',
  ...buildTimestampsEntityMockFields(),
  ...(data || {}),
});

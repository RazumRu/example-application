import { createMock } from '@golevelup/ts-jest';
import { EntityManager, TypeormService } from '@packages/typeorm';

// entity manager
const entityManagerMock: jest.Mock<EntityManager> = jest.fn();
const typeormServiceMock = createMock<TypeormService>();
typeormServiceMock.trx.mockImplementation((cb: any) => cb(entityManagerMock));

export { entityManagerMock, typeormServiceMock };

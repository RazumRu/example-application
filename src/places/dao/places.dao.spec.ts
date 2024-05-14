import { DataSource, In, getRepositoryMock } from '@packages/typeorm';
import { PlacesDao, SearchTerms } from './places.dao';
import { createMock } from '@golevelup/ts-jest';

describe(PlacesDao, () => {
  const repositoryMock = getRepositoryMock();

  const dataSourceMock = createMock<DataSource>();
  dataSourceMock.getRepository.mockReturnValue(repositoryMock);

  const dao = new PlacesDao(dataSourceMock);

  describe('applySearchParams', () => {
    const searchTerms: Required<SearchTerms> = {
      ids: [1],
    };

    it('should apply all filters', async () => {
      await dao.getAll(searchTerms);

      expect(repositoryMock.andWhere).toHaveBeenCalledWith({
        id: In(searchTerms.ids),
      });
    });
  });
});

import { PlacesEntity } from '../entity/places.entity';
import { BaseDao, DataSource, In, BaseQueryBuilder } from '@packages/typeorm';
import { Injectable } from '@nestjs/common';

export type SearchTerms = Partial<{
  ids?: number[];
}>;

@Injectable()
export class PlacesDao extends BaseDao<PlacesEntity, SearchTerms> {
  protected get alias() {
    return 'p';
  }

  protected get entity() {
    return PlacesEntity;
  }

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected applySearchParams(
    builder: BaseQueryBuilder<PlacesEntity>,
    params?: SearchTerms,
  ) {
    if (params?.ids && params.ids?.length > 0) {
      builder.andWhere({
        id: In(params?.ids),
      });
    }
  }
}

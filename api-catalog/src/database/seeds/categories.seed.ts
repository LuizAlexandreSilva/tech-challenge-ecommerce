import { Category } from '../../models/Category';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import data from '../catalog.json';

export default class Categories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const categories = new CreateCategories().getCategories();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(categories)
      .onConflict(`("id") DO NOTHING`)
      .execute();
  }
}

interface Catalog {
  categories: {
    id: string;
    name: string;
    parents: string[];
  }[];
}

class CreateCategories {
  public getCategories(): any[] {
    const catalog = data as Catalog[];
    const categories: any[] = [];
    catalog.map(items => {
      items.categories.map((category: any) => {
        if (
          category &&
          category.id &&
          !categories.some(i => i.id === category.id)
        ) {
          categories.push({
            id: category.id,
            name: category.name,
            parent_id: category.parents ? category.parents[0] : null,
          });
        }
      });
    });

    return categories;
  }
}

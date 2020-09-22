import { Product } from '../../models/Product';
import { ProductDetail } from '../../models/ProductDetail';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import data from '../catalog.json';
import { ProductSku } from '../../models/ProductSku';
import { SkuSpec } from '../../models/SkuSpec';
import { ProductImage } from '../../models/ProductImage';
import { ProductCategory } from '../../models/ProductCategory';

interface Catalog {
  id?: string;
  skus?: {
    sku: string;
    specs: any;
    properties: {
      name: string;
      installment: {
        count: number;
        price: number;
      };
      url: string;
      price: number;
      details: {
        precoavista: number;
      };
      oldPrice: number;
      status: string;
    };
  }[];
  images?: any;
  description?: string;
  details?: {
    name: string;
    brand: string;
    rating: string;
    cod_venda: string;
    precoavista: string;
  };
  name?: string;
  status?: string;
  categories?: {
    id: string;
    name: string;
    parents: string[];
  }[];
}

export default class CreateProducts implements Seeder {
  private getProducts(): Catalog[] {
    const catalog = data as Catalog[];
    const products: Catalog[] = [];

    catalog.map(item => {
      products.push(Object.assign({} as Catalog, item));
    });

    return products;
  }

  public async run(factory: Factory, connection: Connection): Promise<void> {
    const products = this.getProducts();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(
        products.map(product => {
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            status: product.status,
          };
        }),
      )
      .onConflict(`("id") DO NOTHING`)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(ProductDetail)
      .values(
        products.map(product => {
          return {
            product_id: product.id,
            name: product.details?.name,
            brand: product.details?.brand,
            rating: product.details?.rating,
            sell_code: Number(product.details?.cod_venda),
            price_cash: Number(product.details?.precoavista),
          };
        }),
      )
      .execute();

    const images: any[] = [];
    const categories: any[] = [];
    const skus: any[] = [];
    const skuSpecs: any[] = [];

    products.forEach(product => {
      const keys = Object.keys(product.images);
      if (keys.length) {
        keys.map(key => {
          console.log(product.images[key], product.images.key?.url);
          if (product.images[key]) {
            images.push({
              product_id: product.id,
              url: product.images[key],
            });
          }
        });
      }

      product.categories?.map(cat => {
        categories.push({
          product_id: product.id,
          category_id: cat.id,
        });
      });

      product.skus?.map(sku => {
        skus.push({
          sku: sku.sku,
          product_id: product.id,
          name: sku.properties.name,
          installment_count: sku.properties.installment.count,
          installment_price: sku.properties.installment.price,
          price: sku.properties.price,
          price_cash: sku.properties.details.precoavista,
          old_price: sku.properties.oldPrice,
          status: sku.properties.status,
        });

        const keys = Object.keys(sku.specs);
        if (keys.length) {
          keys.forEach(key => {
            skuSpecs.push({
              sku_id: sku.sku,
              name: key,
              value: sku.specs[key],
            });
          });
        }
      });
    });

    await connection
      .createQueryBuilder()
      .insert()
      .into(ProductImage)
      .values(images)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(ProductCategory)
      .values(categories)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(ProductSku)
      .values(skus)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(SkuSpec)
      .values(skuSpecs)
      .execute();
  }
}

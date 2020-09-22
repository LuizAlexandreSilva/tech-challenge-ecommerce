export interface Catalog {
  imagesSsl: any;
  skus: {
    sku: string;
    specs: any;
  }[];
  categories: [
    {
      id: number;
      name: string;
      parents: string[];
    },
  ];
  apiKey: string;
  description: string;
  type: string;
  auditInfo: any;
  specs: any;
  eanCode: any;
  price: string;
  details: {
    name: string;
    brand: string;
    rating: string;
    cod_venda: string;
    precoavista: string;
  };
  remoteUrl: null;
  id: string;
  stock: null;
  brand: string;
  customBusiness: any;
  basePrice: null;
  images: any;
  kitProducts: [];
  created: string;
  oldPrice: string;
  published: null;
  version: string;
  url: string;
  tags: [];
  unit: string;
  installment: {
    count: number;
    price: number;
  };
  name: string;
  clientLastUpdated: string;
  extraInfo: any;
  status: string;
  ungroupedId: 'default';
}

export interface Category {
  id: number;
  name: string;
  parents: string[];
}

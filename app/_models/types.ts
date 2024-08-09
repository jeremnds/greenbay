export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  available: boolean;
};

export type ProductsType = ProductType[];

export type CategoryNameType = {
  name: string;
};

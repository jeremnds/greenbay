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

export type ProductsWithPaginationType = {
  products: ProductsType;
  totalPages: number;
  count?: number;
};

export type CategoryNameType = {
  name: string;
};

export type CategoryType = {
  id: number;
  name: string;
  image?: string;
};

export type CategoriesType = CategoryType[];

export type UserType = {
  id: number;
  email: string;
  name: string;
  role: "admin" | "customer";
};

export type UsersType = UserType[];

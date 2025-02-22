export interface IProduct {
  brand: string;
  type: string;
  quantity: number;
  inStock: boolean;
  _id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  color: string;
  stock: number;
  category: string;
  tags: string[];
  sku: number;
  image_url: string;
}
export interface Icart {
  brand: string;
  quantity: number;
  _id: string;
  name: string;
  price: number;
  color: string;
  category: string;
  image_url: string;
}
  export interface UserInterface {
  role: string;
  userId: string;
}
// ts/types/ts.types.ts

export interface TRoute {
  path: string;
  element: JSX.Element;
}

export interface TuserPath {
  name: string;
  path: string;
  element: JSX.Element;
  children?: TuserPath[]; // Optional to allow for nested routes
}

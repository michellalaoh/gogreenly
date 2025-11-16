import type { Dispatch, SetStateAction } from "react";

export interface CartProps {
  cartShow: boolean;
  setCartShow: Dispatch<SetStateAction<boolean>>;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CategoryProps {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ProductPageProps extends CartProps, CategoryProps {}

export interface Cart {
  id: string;
  name: string;
  price: number;
  image: string;  
  quantity: number;
}

export interface OrderProduct {
  productId: string;
  name: string;
  quantity: number;
  image: string;

}

export interface Order {
  id: string;
  orderTimeMs: number;
  totalPrice: number;
  products: OrderProduct[];
}

export interface BestSellerItem {
  id: string;
  name: string;
  price: number;
  image: string;
  categories: string[];
}
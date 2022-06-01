import { Branch } from '~/types/Models/Branch';
import { Category } from '~/types/Models/Category';

export interface Product {
  id: string;
  //code: string;
  name: string;
  CategoryId: number;
  Category: Partial<Category>;
  BranchId: number;
  Branch?: Partial<Branch>;
  price: number;
  netPrice: number;
  brand?: string;
  observations?: string;
  image: string | null;
  precod: number; // TODO:Que es esto? preguntas a maxilana
  slug?: string;
  saleOnline?: boolean;
  promoDiscount?: number;
}

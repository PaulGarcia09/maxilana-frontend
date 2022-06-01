// NO PUEDO NORMALIZAR ESTE OBJETO
//  YA QUE NO COINCIDEN LOS DATOS DEL PRODUCTO...
export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  cityId: number;
  branchId: number;
  insurance?: number;
}

export interface LineItem {
  branch: string;
  shipping: number;
  products: CartProduct[];
}

export interface Cart {
  id: string;
  cart: LineItem[];
  pricing: {
    shipping: number;
    subtotal: number;
    total: number;
  };
}

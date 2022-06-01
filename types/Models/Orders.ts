// TOMÉ COMO REFERENCIA EL MODELO
//  QUE SE USA EN EL CHECKOUT SUCCESS
//  TEORÍCAMENTE ESTE SERÍA UN MODELO DE ORDEN
export interface Order {
  reference: string;
  amount: number;
  productName: string;
  contactName: string;
  shipping: {
    address: string;
    locality: string;
    city: string;
    amount: number;
    contactName: string;
  };
}

export type Product={
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    rating:{
        rate:number;
        count:number;
    }
}

export type CustomerReview = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  productId: number;
}

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand?: string;
  discountPercentage: number;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
};

export type CustomerReview = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  productId: number;
};

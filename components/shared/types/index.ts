export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  images: [string];
  rating: {
    rate: number;
    count: number;
  };
}

export interface cartProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  images: [string];
  rating: {
    rate: number;
    count: number;
  };
  number: number;
}

export interface cookieCart {
  id: number;
  title: string;
  number: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

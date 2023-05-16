import { RestaurantInformation } from 'api';

export interface RestaurantAsset {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: string;
}

export interface RestaurantContent {
  component: string;
  image: string;
  title: string;
  author: string;
  content: string;
  schedule: string;
  description: string;
  categories: string[];
  company?: string;
  assets: RestaurantAsset[];
  google_place_id?: string;
  offer_title: string;
  main_offer: string;
}

export interface Restaurant {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  created_at: string;
  published_at: string;
  first_published_at: string;
  content: RestaurantContent;
  placeDetails: RestaurantInformation
}

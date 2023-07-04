import { RestaurantInformation } from 'api';

export interface PostAsset {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: string;
}

export interface PostContent {
  active: boolean;
  author: string;
  company: string;
  available_from: string;
  description: string;
  title: string;
  type: string;
  assets: PostAsset[];
}

export interface Post {
  uuid: string;
  content: PostContent
  published_at: string;
  placeDetails: RestaurantInformation
}

export interface PostCard {
  description: string;
  assets: PostAsset[];
  title: string;
  uuid: string;
  published_at: string;
}

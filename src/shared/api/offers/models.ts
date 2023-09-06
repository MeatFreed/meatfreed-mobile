import { RestaurantInformation, RestaurantPhoto } from 'api';
import { AnyType } from 'helpers';

export interface OfferAsset {
  id: number;
  filename: string;
}

export enum OfferType {
  VOUCHER = 'Voucher',
  RAFFLE = 'Raffle',
}

export enum OfferStatus {
  PENDING = 'PENDING',
  WON = 'WON',
  LOSE = 'LOSE',
  CLAIMED = 'CLAIMED'
}

export interface OfferContent {
  component: string;
  image: string;
  content: string;
  title: string;
  offer_type: OfferType;
  assets: OfferAsset[];
  description: string;
  start_date: string;
  end_date: string;
  active: boolean;
  public: boolean;
  featured: boolean;
  max_claims_per_user: number;
  how_many_winners: number;
  company?: string;
  voucher_code: AnyType;
  business: string;
  google_place_id?: string;
  status: OfferStatus;
  subtitle: string;
}

export interface Offer {
  id: number;
  uuid: string;
  name: string;
  published_at: string;
  content: OfferContent;
  placeDetails: RestaurantInformation
  userIds?: string[]
}

export interface OfferCard {
  uuid: string;
  assets: OfferAsset[];
  title: string;
  subtitle: string;
  offer_type: OfferType;
  end_date: string;
  photos: RestaurantPhoto[];
  business: string;
  published_at: string;
}

export interface UserOffer {
  id: string;
  createdAt: number;
  offerId: string;
  status: OfferStatus;
  userId: string;
  voucherCode: string;
}

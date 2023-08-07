export interface RestaurantPhoto {
  photo_reference: string;
}

export interface RestaurantOpeningHours {
  open_now: boolean;
  weekday_text: string[];
}

export interface RestaurantInformation {
  name: string;
  formatted_address: string;
  opening_hours: RestaurantOpeningHours;
  photos: RestaurantPhoto[];
  website: string;
  price_level?: number;
  international_phone_number: string;
  rating: number;
  user_ratings_total: number;
  icon_background_color: string;
  place_id: string;
  favoriteUserIds?: number[];
  current_opening_hours: {
    open_now: boolean;
  }
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  }
  picture: string;
}

export interface RestaurantResponse {
  result: RestaurantInformation;
}

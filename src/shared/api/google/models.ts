export interface Photo {
  photo_reference: string;
}

export interface RestaurantInformation {
  name: string;
  formatted_address: string;
  opening_hours: {
    weekday_text: string[];
  };
  photos: Photo[];
  website: string;
  international_phone_number: string;
  rating: number;
  user_ratings_total: number;
  icon_background_color: string;
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

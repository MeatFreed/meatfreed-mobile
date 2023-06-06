export enum PreferenceStatus {
  OPTED_IN = 'OPTED_IN',
  OPTED_OUT = 'OPTED_OUT',
}

export interface Preference {
  custom_routing: string[];
  has_custom_routing: boolean;
  default_status: PreferenceStatus;
  status: PreferenceStatus;
  section_name: string;
  section_id: string;
  topic_id: string;
  topic_name: string;
}

export interface UpdatePreferenceParams {
  userId: string;
  topicId: string;
  status: PreferenceStatus;
}

export interface UpdateProfileParams {
  userId: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
}

export interface UpdatePreferenceResponse {
  userId: string;
  topicId: string;
}

export interface GetPreferencesResponse {
  items: Preference[]
}

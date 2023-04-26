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

export interface FirebasePost {
  uid: string;
  title: string;
  subtitle: string;
  images?: string[];
  video?: string;
  body: string;
  clicksCount?: number;
}

export interface Post {
  uuid: string;
  content: PostContent
}

export interface Post {
  uid: string;
  title: string;
  subtitle: string;
  images?: string[];
  video?: string;
  body: string;
  clicksCount?: number;
}

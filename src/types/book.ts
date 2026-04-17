export interface Book {
  id: number;
  title: string;
  description: string;
  image: string | null;
  author: string;
  published: string;
  uploadFile: string | null
}
export type BookFormData=Pick<Book,'title'|'description'|'author'>;
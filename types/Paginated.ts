export interface Paginated<T> {
  page: number;
  pages: number;
  next: boolean;
  prev: boolean;
  limit: number;
  count: number;
  rows: T[];
}

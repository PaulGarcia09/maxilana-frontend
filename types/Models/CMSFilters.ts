interface ItemId {
  id: number;
  itemID: string;
}

export interface CMSFilters {
  id: number;
  search: string | null;
  categories: ItemId[];
  products: ItemId[];
  quantity?: number;
  order: 'rand' | 'desc' | 'asc';
  city: number;
}

export interface Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  icon: string;
  sortIndex: number;
}

export function createCategory(params: Partial<Category>) {
  return {} as Category;
}

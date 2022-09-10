export interface ISupplierOption {
  name: string;
  score: number;
  isSelected: boolean;
}

export interface ISupplierCategory {
  categoryId: string;
  order: number;
  header: string;
  options: ISupplierOption[];
}

export interface ISuppliersData {
  categories: ISupplierCategory[];
}

export interface IFormData {
  questions: IFormQuestion[];
}

export interface IFormOption {
  optionId: string;
  text: string;
  score?: number;
}

export interface IFormQuestion {
  questionId: string;
  order: number;
  text: string;
  options: ISupplierOption[];
  selectedOptionId?: string;
}

export type ExpenseCategory = {
    id: string;
    name: string;
    icon: string;
  }
  
  export type Expense = {
    id: string;
    amount: number;
    category: ExpenseCategory;
    description: string;
    date: string;
    currency: string;
  }
  
  
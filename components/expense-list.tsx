'use client';

import { motion } from 'framer-motion';
import { Coffee, Gift, Mail, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '@/utils/format';
import { Card, CardContent } from '@/components/ui/card';
import { Expense } from '@/types/expense';

const categoryIcons = {
  coffee: Coffee,
  gift: Gift,
  subscription: Mail,
  default: DollarSign,
} as const;

type CategoryIconKey = keyof typeof categoryIcons;

export function ExpenseList() {
  const { data: expenses = [], isLoading, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const response = await fetch('/api/expenses');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading expenses...</div>;
  if (error) return <div>Error loading expenses</div>;

  return (
    <div className="space-y-6">
      {expenses.map((expense: Expense, index: number) => {
        const iconKey = (expense.category.icon in categoryIcons ? expense.category.icon : 'default') as CategoryIconKey;
        const Icon = categoryIcons[iconKey];

        return (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{expense.category.name}</p>
                    <p className="text-sm text-muted-foreground">{expense.description}</p>
                  </div>
                </div>
                <p className="font-semibold">
                  {formatCurrency(expense.amount, expense.currency)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
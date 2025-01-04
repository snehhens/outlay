'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addExpense } from '@/utils/sheets';
import { useQueryClient } from '@tanstack/react-query';

export function AddExpenseForm({ onSuccess }: { onSuccess: () => void }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Tea & Snacks');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    const expense = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      category: { id: category, name: category, icon: getCategoryIcon(category) },
      description,
      date: new Date().toISOString(),
      currency: 'USD',
    };

    const result = await addExpense(expense);
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      onSuccess();
    } else {
      console.error('Failed to add expense:', result.error);
    }
  };

  // Fix for the number pad grid: ensure numbers are added correctly
  const handleNumberClick = (num: string | number) => {
    if (num === '') return; // Skip empty values
    setAmount((prev) => {
      const newAmount = prev + num.toString();
      return newAmount;
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Amount</h2>
          <span className="text-sm text-muted-foreground">USD</span>
        </div>
        <Input
          type="number" // This triggers the number pad on mobile
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-4xl font-bold text-center"
          placeholder="0"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tea & Snacks">Tea & Snacks</SelectItem>
              <SelectItem value="Coffee">Coffee</SelectItem>
              <SelectItem value="Gift">Gift</SelectItem>
              <SelectItem value="Subscription">Subscription</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0].map((num, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNumberClick(num)}
              className="p-4 text-2xl font-medium rounded-full hover:bg-primary/10"
            >
              {num}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="p-4 text-2xl font-medium bg-primary text-primary-foreground rounded-full"
          >
            →
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(category: string): string {
  switch (category.toLowerCase()) {
    case 'coffee':
    case 'tea & snacks':
      return 'coffee';
    case 'gift':
      return 'gift';
    case 'subscription':
      return 'mail';
    default:
      return 'dollar-sign';
  }
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Ensure this import is correct
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AddExpenseForm({ onSuccess }: { onSuccess: () => void }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Tea & Snacks');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    const expense = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      category: { id: category, name: category, icon: getCategoryIcon(category) },
      description,
      date: new Date().toISOString(),
      currency: 'USD',
    };

    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });

    if (response.ok) {
      onSuccess(); // Refresh the expense list
    } else {
      console.error('Failed to add expense');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Amount</h2>
          <span className="text-sm text-muted-foreground">USD</span>
        </div>
        <Input
          type="number"
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

        {/* Add the Button component here */}
        <Button onClick={handleSubmit} className="w-full">
          Add Expense
        </Button>
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
'use client'

import { useQuery } from '@tanstack/react-query'
import { getExpenses } from '@/utils/sheets'
import { formatCurrency } from '@/utils/format'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TotalBalance() {
  const { data: expenses = [] } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  })

  const totalBalance = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Total Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{formatCurrency(totalBalance, 'INR')}</p>
      </CardContent>
    </Card>
  )
}

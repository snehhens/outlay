import { Suspense } from 'react'
import { ExpenseList } from '@/components/expense-list'
import { TotalBalance } from '@/components/total-balance'
import { AddExpenseButton } from '@/components/add-expense-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function DashboardPage() {
  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </header>
      
      <Suspense fallback={<div className="h-20 w-full bg-muted animate-pulse rounded-lg"></div>}>
        <TotalBalance />
      </Suspense>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Expenses</h2>
          <AddExpenseButton />
        </div>
        <Suspense fallback={<div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>}>
          <ExpenseList />
        </Suspense>
      </div>
    </div>
  )
}

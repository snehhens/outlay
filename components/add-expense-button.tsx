'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AddExpenseForm } from '@/components/add-expense-form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export function AddExpenseButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Add Expense</Button>
      </DialogTrigger>
      <DialogContent>
        <VisuallyHidden>
          <DialogTitle>Add Expense</DialogTitle>
        </VisuallyHidden>
        <AddExpenseForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
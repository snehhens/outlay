'use server'

import { google } from 'googleapis';
import { Expense } from '../types/expense';

// Log environment variables for debugging
console.log('Client Email:', process.env.GOOGLE_CLIENT_EMAIL);
console.log('Private Key:', process.env.GOOGLE_PRIVATE_KEY);
console.log('Sheet ID:', process.env.GOOGLE_SHEET_ID);

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Replace escaped \n with actual newlines
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function addExpense(expense: Expense) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Expenses!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            expense.id,
            expense.date,
            expense.amount,
            expense.category.name,
            expense.description,
            expense.currency,
          ],
        ],
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding expense:', error);
    return { success: false, error };
  }
}

export async function getExpenses(): Promise<Expense[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Expenses!A:F',
    });

    const rows = response.data.values || [];
    return rows.slice(1).map((row: any[]) => ({
      id: row[0],
      date: row[1],
      amount: parseFloat(row[2]),
      category: { id: row[3], name: row[3], icon: getCategoryIcon(row[3]) },
      description: row[4],
      currency: row[5],
    }));
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
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
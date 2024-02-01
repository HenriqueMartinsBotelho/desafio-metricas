export const earningsColor = '#49A8FF'
export const expensesColor = '#154EC1'

export const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export type Revenues = {
  month: string
  earning: number
}

// export type Signature = {
//   id: number
//   startDate: string
//   cancelation: string | null
//   value: number
//   status: string
// }

// export const Signatures = [
//   { id: 1, startDate: '2024-01-01', cancelation: null, value: 10, status: 'ativo' },
//   { id: 2, startDate: '2024-01-10', cancelation: '2024-01-20', value: 15, status: 'cancelado' },
// ]

export const TempRevenueData: Revenues[] = [
  { month: 'Jan', earning: 10000 },
  { month: 'Feb', earning: 30000 },
  { month: 'Mar', earning: 30000 },
  { month: 'Apr', earning: 40000 },
  { month: 'May', earning: 55000 },
  { month: 'Jun', earning: 20000 },
  { month: 'Jul', earning: 70000 },
  { month: 'Aug', earning: 80000 },
  { month: 'Sep', earning: 35000 },
  { month: 'Oct', earning: 100000 },
  { month: 'Nov', earning: 70000 },
  { month: 'Dec', earning: 120000 },
]

export const generateRevenues = (months: string[]): Revenues[] => {
  return months.map((month: string) => {
    const earning = Math.floor(Math.random() * 100000 + 10000)
    return {
      month,
      earning,
      expenses: Math.floor(earning * Math.random()),
    }
  })
}

export const getRevenuePerMonth = (month: string, revenues: Revenues[]): Revenues => {
  // const revenue = revenues.find((revenue) => revenue.month === month)
  return { month, earning: 0, expenses: 0 }
}

export const formatMoney = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

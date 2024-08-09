import BillImage from '../assets/img/icon.png'
import TaxImage from '../assets/img/icon (1).png'
import RevenueImage from '../assets/img/icon (2).png'
import PayersImage from '../assets/img/payers.png'

export const agentInventoryData = [
  {
    title: 'Tax Wallet',
    accessor: 'agentWalletBalance',
    imageSrc: BillImage,
  },
  {
    title: 'Tax Expenses',
    accessor: 'taxExpenses',
    imageSrc: TaxImage,
  },
  {
    title: 'Revenue',
    accessor: 'revenue',
    imageSrc: RevenueImage,
  },
  {
    title: 'Bill Generated',
    accessor: 'billGenerated',
    imageSrc: BillImage,
  },
  {
    title: 'Number of Registered Tax Payers',
    accessor: 'numberOfMyRegisteredTaxpayers',
    imageSrc: PayersImage,
  },
]

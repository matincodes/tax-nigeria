import BillImage from '../assets/img/icon.png'
import TaxImage from '../assets/img/icon (1).png'
import RevenueImage from '../assets/img/icon (2).png'
import PayersImage from '../assets/img/payers.png'

export const agentInventoryData = [
  {
    title: 'Wallet Balance',
    accessor: 'agentWalletBalance',
    imageSrc: BillImage,
    prefix: '₦',
  },
  {
    title: 'Tax Expenses',
    accessor: 'taxExpenses',
    imageSrc: TaxImage,
    prefix: '₦',
  },
  {
    title: 'Revenue',
    accessor: 'revenue',
    imageSrc: RevenueImage,
    prefix: '₦',
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

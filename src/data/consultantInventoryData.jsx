import BillImage from "../assets/img/icon.png";
import TaxImage from "../assets/img/icon (1).png";
import RevenueImage from "../assets/img/icon (2).png";
import ConsultantImage from "../assets/img/icon (3).png";
import PayersImage from "../assets/img/payers.png";
import AgentImage from "../assets/img/agents.png";

export const consultantInventoryData = [
  {
    title: 'Tax Wallet',
    accessor: 'consultantWalletBalance',
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
    title: 'Registered Tax Agents',
    accessor: 'numberOfMyRegisteredTaxAgents',
    imageSrc: AgentImage,
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
import BillImage from "../assets/img/icon.png";
import TaxImage from "../assets/img/icon (1).png";
import RevenueImage from "../assets/img/icon (2).png";
import ConsultantImage from "../assets/img/icon (3).png";
import PayersImage from "../assets/img/payers.png";
import AgentImage from "../assets/img/agents.png";

export const inventoryData = [
  {
    title: "Bill Generated",
    accessor: "billGenerated",
    imageSrc: BillImage,
  },
  {
    title: "Tax Income",
    accessor: "taxIncome",
    imageSrc: TaxImage,
  },
  {
    title: "Revenue",
    accessor: "revenue",
    imageSrc: RevenueImage,
  },
  {
    title: "Consultant",
    accessor: "numberOfConsultants",
    imageSrc: ConsultantImage,
  },
  {
    title: "Number of Registered Taxpayers",
    accessor: "numberOfRegisteredTaxpayers",
    imageSrc: PayersImage,
  },
  {
    title: "Number of Registered Tax Agents",
    accessor: "numberOfRegisteredTaxAgents",
    imageSrc: AgentImage,
  },
];

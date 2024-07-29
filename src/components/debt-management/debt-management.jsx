import Cloud from "../../assets/img/download-cloud-02.svg";
import Button from "../button/button";
import DataTable from "../data-table/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThreeDotIcon from "../../assets/img/Bussiness_Sector/three_dots.svg";
import { useNavigate } from "react-router-dom";

const debtorsData = [
  {
    agentName: "John Doe",
    taxPayerID: "1234567890",
    taxPayerFirstName: "Jane",
    taxPayerLastName: "Doe",
    amountOwed: "₦100,000",
    status: "Active",
  },
  {
    agentName: "John Doe",
    taxPayerID: "1234567890",
    taxPayerFirstName: "Jane",
    taxPayerLastName: "Doe",
    amountOwed: "₦100,000",
    status: "Inactive",
  },
  {
    agentName: "John Doe",
    taxPayerID: "1234567890",
    taxPayerFirstName: "Jane",
    taxPayerLastName: "Doe",
    amountOwed: "₦100,000",
    status: "Active",
  },
  {
    agentName: "John Doe",
    taxPayerID: "1234567890",
    taxPayerFirstName: "Jane",
    taxPayerLastName: "Doe",
    amountOwed: "₦100,000",
    status: "Inactive",
  },
];

const columns = [
  {
    accessorKey: "agentName",
    header: () => (
      <div className="flex items-center">
        <span>Agent Name</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M6.00065 1.33325V10.6666M6.00065 10.6666L10.6673 5.99992M6.00065 10.6666L1.33398 5.99992"
            stroke="#667085"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-nowrap text-black">
        {row.getValue("agentName")}
      </div>
    ),
  },
  {
    accessorKey: "taxPayerID",
    header: () => (
      <div className="flex items-center">
        <span>Tax Payer ID</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M6.00065 1.33325V10.6666M6.00065 10.6666L10.6673 5.99992M6.00065 10.6666L1.33398 5.99992"
            stroke="#667085"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    ),
  },
  {
    accessorKey: "taxPayerFirstName",
    header: () => (
      <div className="flex items-center">
        <span>Tax Payer First Name</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M6.00065 1.33325V10.6666M6.00065 10.6666L10.6673 5.99992M6.00065 10.6666L1.33398 5.99992"
            stroke="#667085"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    ),
  },
  {
    accessorKey: "taxPayerLastName",
    header: () => (
      <div className="flex items-center">
        <span>Tax Payer Last Name</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M6.00065 1.33325V10.6666M6.00065 10.6666L10.6673 5.99992M6.00065 10.6666L1.33398 5.99992"
            stroke="#667085"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    ),
  },
  {
    accessorKey: "amountOwed",
    header: () => (
      <div className="flex items-center">
        <span>Amount Owed</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M6.00065 1.33325V10.6666M6.00065 10.6666L10.6673 5.99992M6.00065 10.6666L1.33398 5.99992"
            stroke="#667085"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      let statusClass = "";
      let dotClass = "";

      switch (status) {
        case "Active":
          statusClass = "bg-emerald-50 text-emerald-700";
          dotClass = "bg-emerald-500";
          break;
        case "Inactive":
          statusClass = "bg-gray-100 text-gray-800";
          dotClass = "bg-gray-800";
      }

      return (
        <div
          className={`pl-1.5 pr-2 py-0.5 ${statusClass} rounded-2xl justify-center items-center gap-1.5 inline-flex`}
        >
          <div className="w-2 h-2 relative">
            <div
              className={`w-1.5 h-1.5 left-[1px] top-[1px] absolute rounded-full ${dotClass}`}
            />
          </div>
          <div className="text-center text-xs font-semibold leading-[18px]">
            {status}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img src={ThreeDotIcon} alt="" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => alert(`Viewing ${row.original.lga}`)}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => alert(`Editing ${row.original.taxPayer}`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => alert(`Deleting ${row.original.taxPayer}`)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const DebtManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-10">
      <div className="flex gap-2 justify-end pr-5">
        <button className="h-10 px-4 py-2.5 bg-white rounded-lg border border-gray-300 justify-center items-center gap-2 inline-flex">
          <img src={Cloud} alt="export" className="w-5 h-5 relative" />
          <span className="text-slate-700 text-sm font-medium">Export</span>
        </button>
        <Button
          text="Add New Debtor"
          iconposition="left"
          icon="+"
          handleButton={() => navigate("/add-debtor")}
        />
      </div>
      <div className="pl-3">
        <DataTable data={debtorsData} columns={columns} />
      </div>
    </div>
  );
};

export default DebtManagement;

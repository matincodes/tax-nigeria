import Button from "../button/button";
import Search from "../search/search";
import Inventories from "../dashboard/inventories/inventories";

import { taxCardData } from "../../data/taxCardData";
import Cloud from "../../assets/img/download-cloud-02.svg";
import Filter from "../../assets/img/filter-lines.svg";
import DataTable from "../data-table/data-table";
import { cardPeopleData } from "../../data/taxCardData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThreeDotIcon from "../../assets/img/Bussiness_Sector/three_dots.svg";

const columns = [
  {
    accessorKey: "taxPayer",
    header: "Tax Payer",
    cell: ({ row }) => (
      <div className="font-medium text-nowrap text-black">
        {row.getValue("taxPayer")}
      </div>
    ),
  },
  {
    accessorKey: "businessType",
    header: "Business Type",
  },
  {
    accessorKey: "taxID",
    header: "Tax ID",
  },
  {
    accessorKey: "cardType",
    header: "Card Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      let statusClass = "";
      let dotClass = "";

      switch (status) {
        case "Collected":
          statusClass = "bg-emerald-50 text-emerald-700";
          dotClass = "bg-emerald-500";
          break;
        case "Eligible":
          statusClass = "bg-yellow-300 bg-opacity-50 text-lime-600";
          dotClass = "bg-lime-500";
          break;
        case "Not Eligible":
          statusClass = "bg-red-600 bg-opacity-75 text-white";
          dotClass = "bg-white";
          break;
        default:
          statusClass = "bg-gray-100 text-gray-800";
          break;
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
            onClick={() => alert(`Viewing ${row.original.taxPayer}`)}
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

const TaskCardManagement = () => {
  return (
    <div className="p-2 px-4">
      <Search />

      <div className="flex justify-between mt-5">
        <h2 className="font-semibold text-xl">Tax Card Management</h2>
        <div className="flex gap-2">
          <button className="h-10 px-4 py-2.5 bg-white rounded-lg justify-center items-center gap-2 inline-flex">
            <img src={Filter} alt="filters" className="w-5 h-5 relative" />
            <span className="text-slate-700 text-sm font-medium">Filters</span>
          </button>
          <button className="h-10 px-4 py-2.5 bg-white rounded-lg border border-gray-300 justify-center items-center gap-2 inline-flex">
            <img src={Cloud} alt="export" className="w-5 h-5 relative" />
            <span className="text-slate-700 text-sm font-medium">Export</span>
          </button>
          <Button text="Issue Card" icon="+" iconposition="left" />
        </div>
      </div>

      <div className="flex mt-5 gap-3">
        {taxCardData.map((task, index) => (
          <Inventories
            key={index}
            title={task.title}
            metric={task.numbers}
            image={task.imageSrc}
          />
        ))}
      </div>

      <DataTable data={cardPeopleData} columns={columns} />
    </div>
  );
};

export default TaskCardManagement;

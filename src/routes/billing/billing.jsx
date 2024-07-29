import { AiOutlinePlus, AiOutlineCloudDownload } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import dots from "../../assets/img/Bussiness_Sector/three_dots.svg";
import { BsDot } from "react-icons/bs";
import { DropDown } from "../../components/profile/payercard/payercard";

const billingColumns = [
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => <p>{row.getValue("year")}</p>,
  },
  {
    accessorKey: "taxPayer_Id",
    header: "Tax Payer ID",
    cell: ({ row }) => <p>{row.getValue("taxPayer_Id")}</p>,
  },
  {
    accessorKey: "payerFullName",
    header: "Payer Full Name",
    cell: ({ row }) => (
      <p>{`${row.original.txPayFName} ${row.original.txPayLName}`}</p>
    ),
  },
  {
    accessorKey: "billAmount",
    header: "Amount",
    cell: ({ row }) => <p>${row.getValue("billAmount")?.toFixed(2)}</p>,
  },
  {
    accessorKey: "totalAmountPaid",
    header: "Total Amount Paid",
    cell: ({ row }) => <p>${row.getValue("totalAmountPaid")?.toFixed(2)}</p>,
  },
  {
    accessorKey: "billStatus",
    header: "Bill Status",
    cell: ({ row }) => <p>{row.getValue("billStatus")}</p>,
  },
  {
    accessorKey: "billReferenceNo",
    header: "Bill Reference",
    cell: ({ row }) => <p>{row.getValue("billReferenceNo")}</p>,
  },
  // {
  //   accessorKey: 'assessmentRef',
  //   header: 'Assessment Reference',
  //   cell: ({ row }) => <p>{row.getValue('assessmentRef')}</p>,
  // },
  {
    accessorKey: "billDate",
    header: "Date",
    cell: ({ row }) => (
      <p>{new Date(row.getValue("billDate")).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ActionCell,
  },
];

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    axios
      .get("https://assettrack.com.ng/api/BillGeneration")
      .then((response) => {
        setBillingData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching billing data:", error);
      });
  }, []);

  const filteredData = billingData.filter((item) => {
    const fullName = `${item.txPayFName} ${item.txPayLName}`.toLowerCase();
    return (
      item.year.toString().includes(searchQuery.toLowerCase()) ||
      item.taxPayerId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fullName.includes(searchQuery.toLowerCase()) ||
      item.miniTaxStation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.billAmount.toString().includes(searchQuery.toLowerCase()) ||
      item.totalAmountPaid.toString().includes(searchQuery.toLowerCase()) ||
      item.billStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.billReferenceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assessmentRef?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(item.billDate)
        .toLocaleDateString()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="w-full p-6 h-full space-y-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-semibold text-xl">Billing</h2>
        <div className="flex items-center gap-x-2">
          <div className="w-80 relative h-11">
            <CiSearch className="text-xl absolute top-3 left-3" />
            <input
              type="search"
              className="w-full h-11 outline-none border rounded-md pl-10 pr-4"
              placeholder="Search Billing"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="border rounded-md px-2 h-11 flex items-center w-fit justify-center gap-x-2">
            <AiOutlineCloudDownload className="text-[22px]" />
            <p>Export</p>
          </button>
        </div>
      </div>

      <DataTable data={filteredData} columns={billingColumns} />
    </div>
  );
};

export default Billing;

function ActionCell({ row }) {
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button onClick={onClose} className="relative">
        <img src={dots} alt="dots" />
      </button>
      {isOpen && <DropDown className={"right-0"} close={onClose} />}
    </>
  );
}

function DataTable({ columns, data, rowStyle }) {
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => (row?.id ? row?.id.toString() : ""),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border min-w-full overflow-x-scroll">
      <Table className="min-w-full  divide-y divide-gray-200">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              style={rowStyle}
              key={headerGroup.id}
              className="h-11 bg-gray-50"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="px-4 pt-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="max-w-full">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                style={rowStyle}
                className="max-w-full gap-2"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-4 px-4 text-gray-600 text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

import { AiOutlinePlus, AiOutlineCloudDownload } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,

} from "@tanstack/react-table";
import dots from "../../assets/img/Bussiness_Sector/three_dots.svg";
import { BsDot } from "react-icons/bs";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DropDown } from "../profile/payercard/payercard";
import { taxpayerdata } from "../../data/taxpayerdata";

const TaxPayerManagement = () => {
  return (
    <div className="w-full p-6  h-full space-y-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-semibold text-xl">Tax Payer Management</h2>
        <div className="flex items-center gap-x-2">
          <div className="w-80 relative h-11">
            <CiSearch className="text-xl absolute top-3 left-3" />
            <input
              type="search"
              className="w-full h-11 outline-none border rounded-md pl-10 pr-4 "
              placeholder="Search Tax Payer"
            />
          </div>
          <button className="border rounded-md px-2 h-11 flex items-center w-fit justify-center gap-x-2">
            <AiOutlineCloudDownload className="text-[22px]" />
            <p>Export</p>
          </button>
          <button className="text-white rounded-md px-2 h-11 flex items-center justify-center gap-x-2 w-fit  bg-[#4E72D1]">
            <AiOutlinePlus className="text-[22px]" />
            <p>Add New Tax Payer</p>
          </button>
        </div>
      </div>

      <DataTable data={taxpayerdata} columns={columns} />
    </div>
  );
};

export default TaxPayerManagement;

const ActionCell = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(!isOpen);
  }
  return (
    <button
    onClick={onClose}
    className="relative ">
      <img src={dots} alt="" />
      {isOpen && <DropDown className={"right-0"} close={onClose} />}
    </button>
  );
};

const columns = [
  {
    accessorKey: "taxPayer",
    header: "Tax Payer",

    cell: ({ row }) => {
      return (
        <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {row.getValue("taxPayer")}
        </p>
      );
    },
  },
  {
    accessorKey: "businessType",
    header: "Business Type",

    cell: ({ row }) => {
      return <p className="w-full ">{row.getValue("businessType")}</p>;
    },
  },
  {
    accessorKey: "taxAgent",
    header: "Tax Agent",

    cell: ({ row }) => {
      return (
        <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap ">
          {row.getValue("taxAgent")}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div
          className={`w-fit py-1 pr-1 rounded-md font-medium justify-center text-xs flex items-center ${
            status === "verified"
              ? "bg-green-500/10 text-green-500"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <BsDot className="text-xl" />
          <p>{status}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "",

    cell: ActionCell,
  },
];

// Don't know if we can consider using this data table
// the one i saw in the code was designed specifically for a part of the  code
function DataTable({ columns, data, rowStyle }) {
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => (row?.id ? row?.id.toString() : ""),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border min-w-max">
      <Table className="min-w-max">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              style={rowStyle}
              key={headerGroup.id}
              className="max-w-full gap-2 h-11 bg-gray-50"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-gray-700 font-medium px-4 pt-2"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
                className="max-w-full gap-2 "
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-4 px-4 text-gray-600 text-sm "
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

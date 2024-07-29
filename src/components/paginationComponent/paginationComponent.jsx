// PaginationComponent.jsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const PaginationComponent = ({
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  pageIndex,
  pageCount,
  setPageIndex,
  pageOptions,
  gotoPage,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Pagination className="cursor-pointer p-2 mt-3 flex font-manrope">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={canPreviousPage ? previousPage : null}
              className={`${
                !canPreviousPage ? " text-[#74737371] cursor-not-allowed" : ""
              }`}
            />
          </PaginationItem>
          {pageOptions.slice(0, 6).map((page, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setPageIndex(page)}
                isActive={pageIndex === page}
                className={`font-semibold ${
                  pageIndex === page
                    ? "w-[30px] h-[30px] rounded-full flex place-content-center items-center bg-tax-blue text-white"
                    : "w-[30px] h-[30px] rounded-full flex place-content-center items-center"
                }`}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {pageOptions.length > 5 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => gotoPage(pageCount - 1)}
                  isActive={pageIndex === pageCount - 1}
                  className={`font-semibold ${
                    pageIndex === pageCount - 1
                      ? "w-[30px] h-[30px] rounded-full flex place-content-center items-center bg-tax-blue text-white"
                      : "w-[30px] h-[30px] rounded-full flex place-content-center items-center"
                  }`}
                >
                  {pageCount}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={canNextPage ? nextPage : null}
              className={`${
                !canNextPage ? " text-[#74737371] cursor-not-allowed" : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;

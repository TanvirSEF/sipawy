import ReactPaginate from "react-paginate";

const Pagination = ({ itemsLength, itemsPerPage, onPageChange, pageCount }) => {
  if (itemsLength <= itemsPerPage) return null;

  return (
    <div className="mt-8 flex justify-center px-3">
      <ReactPaginate
        breakLabel={<span className="hidden sm:inline">...</span>}
        nextLabel="Next >"
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Prev"
        containerClassName="flex flex-wrap items-center gap-2"
        pageClassName="hidden sm:block px-2 sm:px-3 py-1 text-sm sm:text-base border rounded cursor-pointer"
        activeClassName="bg-black text-white"
        previousClassName="px-2 sm:px-3 py-1 text-sm sm:text-base border rounded cursor-pointer"
        nextClassName="px-2 sm:px-3 py-1 text-sm sm:text-base border rounded cursor-pointer"
        breakClassName="px-2 sm:px-3 py-1 text-sm sm:text-base"
      />
    </div>
  );
};

export default Pagination;

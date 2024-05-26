interface PaginationProps {
  currentPage: number;
  handlesetCurrentPage: (pageNumber: number) => void;
  handleSetItensPerPage: (number: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlesetCurrentPage,
  totalItems,
  itemsPerPage,
  handleSetItensPerPage
}) => {
  return (
    <div className="relative flex w-full">
      <div className="mx-auto flex w-full items-center justify-center gap-4">
        <button
          className="flex select-none items-center gap-2 rounded-lg px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          disabled={currentPage === 1}
          onClick={() => handlesetCurrentPage(currentPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
          Previous
        </button>
        {currentPage <= 3 ? (
          <div className="flex items-center gap-2">
            <button
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${currentPage === 1 ? 'bg-gray-900 text-white' : 'text-gray-900'} text-center align-middle font-sans text-xs font-medium uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              type="button"
              onClick={() => handlesetCurrentPage(1)}
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                1
              </span>
            </button>
            {totalItems > itemsPerPage * 1 ? (
              <button
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${currentPage === 2 ? 'bg-gray-900 text-white' : 'text-gray-900'} text-center align-middle font-sans text-xs font-medium uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                type="button"
                onClick={() => handlesetCurrentPage(2)}
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  2
                </span>
              </button>
            ) : null}
            {totalItems > itemsPerPage * 2 ? (
              <button
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${currentPage === 3 ? 'bg-gray-900 text-white' : 'text-gray-900'} text-center align-middle font-sans text-xs font-medium uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                type="button"
                onClick={() => handlesetCurrentPage(3)}
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  3
                </span>
              </button>
            ) : null}
            {totalItems > itemsPerPage * 3 ? (
              <button
                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  ...
                </span>
              </button>
            ) : null}
          </div>
        ) : (
          <div>
            <button
              className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                ...
              </span>
            </button>

            <button
              className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                {currentPage}
              </span>
            </button>

            {totalItems > itemsPerPage * currentPage ? (
              <button
                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  ...
                </span>
              </button>
            ) : null}
          </div>
        )}
        <button
          className="flex select-none items-center gap-2 rounded-lg px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => handlesetCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= totalItems}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </button>
      </div>
      <div className="absolute right-2">
        <select
          className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none"
          value={itemsPerPage}
          onChange={(e) => handleSetItensPerPage(parseInt(e.target.value))}
        >
          <option value={10}>10 items</option>
          <option value={20}>20 items</option>
          <option value={50}>50 items</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;

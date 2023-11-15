import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import React from 'react';

export  function PaginationWhite({ page, setPage, max }) {
  const totalPages = max

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 3; // Define cuántos números de página mostrar antes y después de la página actual
    let startPage = Math.max(1, page - range);
    let endPage = Math.min(totalPages+1, startPage + range * 2);
  
    if (endPage - startPage < range * 2) {
      startPage = Math.max(1, endPage - range * 2);
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <a
          key={i}
          href="#"
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            i === page ? 'bg-admin-blue text-white' : 'bg-white text-blue'
          }`}
          onClick={() => setPage(i)}
        >
          {i}
        </a>
      );
    }
  
    return pageNumbers;
  };
  
  
  

  return (
    <div className="flex justify-center px-4 py-3 sm:px-6">
      <div className='felx justify-center'>


      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handlePreviousPage}
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover-bg-gray-50"
          onClick={handleNextPage}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between bg-white rounded-md">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-admin-green bg-admin-green hover:bg-new-dark-green focus:z-20 focus-outline-offset-0"
              onClick={handlePreviousPage}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {renderPageNumbers()}
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white ring-1 ring-inset ring-admin-green bg-admin-green hover:bg-new-dark-green focus:z-20 focus-outline-offset-0"
              onClick={handleNextPage}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>

      </div>
     
    </div>
  );
}

export function PaginationWhite2({ page, setPage, totalPages }) {
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 3;
    let startPage = Math.max(1, page - range);
    let endPage = Math.min(totalPages, startPage + range * 2);

    if (endPage - startPage < range * 2) {
      startPage = Math.max(1, endPage - range * 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <a
          key={i}
          href="#"
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            i === page ? 'bg-admin-blue text-white' : 'bg-white text-blue'
          }`}
          onClick={() => setPage(i)}
        >
          {i}
        </a>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center px-4 py-3 sm:px-6">
      <div className='flex justify-center'>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between bg-white rounded-md">
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-admin-green bg-admin-green hover:bg-new-dark-green focus:z-20 focus-outline-offset-0"
                onClick={handlePreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {renderPageNumbers()}
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white ring-1 ring-inset ring-admin-green bg-admin-green hover:bg-new-dark-green focus:z-20 focus-outline-offset-0"
                onClick={handleNextPage}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}



export default function PaginationBlack({ page, setPage, max }) {
  const totalPages = max

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 3; // Define cuántos números de página mostrar antes y después de la página actual
    let startPage = Math.max(1, page - range);
    let endPage = Math.min(totalPages+1, startPage + range * 2);
  
    if (endPage - startPage < range * 2) {
      startPage = Math.max(1, endPage - range * 2);
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <a
          key={i}
          href="#"
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            i === page ? 'bg-admin-blue text-white' : 'bg-admin-black text-white'
          }`}
          onClick={() => setPage(i)}
        >
          {i}
        </a>
      );
    }
  
    return pageNumbers;
  };
  
  
  

  return (
    <div className="flex justify-center px-4 py-3 sm:px-6">
      <div className='felx justify-center'>


      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handlePreviousPage}
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover-bg-gray-50"
          onClick={handleNextPage}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between bg-admin-black rounded-md">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-admin-green bg-admin-green hover:bg-new-dark-green focus:z-20 focus-outline-offset-0"
              onClick={handlePreviousPage}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {renderPageNumbers()}
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white ring-1 ring-inset ring-admin-green bg-admin-green hover:bg-new-dark-green focus:z-20 focus-outline-offset-0"
              onClick={handleNextPage}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>

      </div>
     
    </div>
  );
}

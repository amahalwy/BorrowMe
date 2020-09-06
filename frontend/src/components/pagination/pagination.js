import React, { useState } from 'react';

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const next = () => {
    setCurrentPage((currentPage) => Math.min(
      currentPage + 1, maxPage
    ));
  }

  const prev = () => {
    setCurrentPage((currentPage) => Math.min(
      currentPage - 1, 1
    ));
  }

  const select = (page) => {
    const pageNumber = Math.max(1, page)
    setCurrentPage((currentPage) => Math.min(
      currentPage, maxPage
    ));
  }

  const currentItems = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    setCurrentPage((currentPage) => Math.min(
      currentPage, maxPage
    ));
  }


}

export default usePagination;
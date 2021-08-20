import React from 'react';
import ReactPaginate from 'react-paginate';
import './style.css';

export default function RequestPagination(props) {
  let { totalPages, pageNumber, setPageNumber, setIsReLoad } = props;

  function changePage(event) {
    setPageNumber(event.selected + 1);
    setIsReLoad(1);
  }

  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      pageCount={totalPages}
      marginPagesDisplayed={0}
      pageRangeDisplayed={2}
      containerClassName="pagination"
      pageLinkClassName="numberPage"
      onPageChange={(e) => changePage(e)}
      forcePage={pageNumber - 1}
    />
  );
}

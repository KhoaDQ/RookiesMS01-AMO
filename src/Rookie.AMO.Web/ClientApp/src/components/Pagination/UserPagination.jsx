import React from "react";
import ReactPaginate from 'react-paginate';
import "./style.css";

export default function Pagination(props) {
  let { totalPages, pageNumber, setPageNumber, setPaging, paging } = props;

  function changePage(event) {
    const currentPage = event.selected + 1;
    if (currentPage !== paging.page) {
      setPageNumber(currentPage);
      setPaging({...paging, page: currentPage});
    }
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
  )
}
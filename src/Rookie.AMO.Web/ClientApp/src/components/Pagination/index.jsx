import React from "react";
import ReactPaginate from 'react-paginate';
import "./style.css";

export default function Pagination(props) {
  let {totalPages,pageSelected} = props
  function goToNextPage() {
    // not yet implemented
  }

  function goToPreviousPage() {
      // not yet implemented
  }

  function changePage(event) {
      console.log('a')
  }

  return (
    <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={totalPages}
          marginPagesDisplayed={0}
          pageRangeDisplayed={2}
          containerClassName = "pagination"
          pageLinkClassName = "numberPage"
          onPageChange={changePage}
      />
  )
}
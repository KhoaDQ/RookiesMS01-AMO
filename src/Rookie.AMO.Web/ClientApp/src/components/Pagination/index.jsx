import React from "react";
import ReactPaginate from 'react-paginate';
import "./style.css";

export default function Pagination(props) {
  let {totalPages,pageNumber,setPageNumber} = props

  function changePage(event) {
      setPageNumber(event.selected+1)
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
          forcePage={pageNumber - 1}
      />
  )
}
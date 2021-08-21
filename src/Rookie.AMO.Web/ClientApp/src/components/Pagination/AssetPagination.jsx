import React from "react";
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import "./style.css";

export default function AssetPagination(props) {
  let { totalPages, filterPage,setFilterPage} = props

  const [pageNumber,setPageNumber] = useState(filterPage.Page-1)

  function changePage(event) {
    setFilterPage({...filterPage,Page:event.selected + 1});
    setPageNumber(event.selected);
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
      forcePage={pageNumber}
    />
  )
}
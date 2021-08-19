import React from "react";
import ReactPaginate from 'react-paginate';
import "./style.css";

export default function Pagination(props) {
    let { paging, setFilters, filters } = props;
    function changePage(event) {
        const currentPage = event.selected + 1;
        setFilters(
            {
                ...filters, Page: currentPage
            })
    }



    return (
        <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={paging.totalPages}
            marginPagesDisplayed={0}
            pageRangeDisplayed={2}
            containerClassName="pagination"
            pageLinkClassName="numberPage"
            onPageChange={(e) => changePage(e)}
            forcePage={paging.currentPage - 1}
        />
    )
}
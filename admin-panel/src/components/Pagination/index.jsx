import ReactPaginate from 'react-paginate';
import { useState } from "react";
import "./styles.css";

function PaginatedItems({ itemsPerPage, itemsLength, switchPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const pageCount = Math.ceil(itemsLength / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemsLength;
    //console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
    switchPage(newOffset)
  };

  return (
    <div className='clearfix mx-3'>
      <div className="float-md-left">
        <div className="">
          Showing <span className="font-medium text-slate-600 dark:text-slate-300">{itemOffset} </span> 
          to <span className="font-medium text-slate-600 dark:text-slate-300">{itemOffset + itemsPerPage} </span> 
          of <span className="font-medium text-slate-600 dark:text-slate-300">{itemsLength}</span> results
        </div>
      </div>
      <div className='float-md-right'>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className='pagination'
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
}

export default PaginatedItems;
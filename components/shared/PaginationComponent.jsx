import React from "react";
import Pagination from "react-js-pagination";

const PaginationComponent = ({
  postsPerPage,
  totalPosts,
  pageRange,
  onChangepage,
  getPageUrl,
  currPage,
}) => {
  const recordPerPage = postsPerPage;
  const totalRecords = totalPosts;

  const handlePageChange = (pageNumber) => {
    onChangepage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (totalRecords <= recordPerPage) {
    return null;
  }
  
  return (
    <Pagination
      prevPageText="قبلی"
      nextPageText="بعدی"
      activePage={currPage}
      itemsCountPerPage={recordPerPage}
      totalItemsCount={totalRecords}
      pageRangeDisplayed={pageRange}
      onChange={handlePageChange}
      getPageUrl={getPageUrl}
      hideDisabled
      itemClass="page"
      linkClass="link"
      itemClassFirst="first-page"
      itemClassLast="last-page"
      itemClassPrev="prev-page"
      itemClassNext="next-page"
      activeClass="active-page"
      disabledClass="disabled-page"
      activeLinkClass="active-page-link"
    />
  );
};

export default PaginationComponent;

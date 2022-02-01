import React from "react";
import { useRouter } from "next/router";
import PaginationComponent from "../shared/PaginationComponent";

const PaginationLayout = ({ children, postsCount, currentPage }) => {
  const router = useRouter();
  const handleChangePage = (pageNumber) => {
    console.log("pageNumber");
    console.log(pageNumber);
    if (pageNumber === 1) {
      router.push(`/`);
    } else {
      router.push(`/page/${pageNumber}`);
    }
  };
  return (
    <>
      {children}
      <PaginationComponent
        postsPerPage={12}
        totalPosts={postsCount}
        pageRange={3}
        onChangepage={handleChangePage}
        getPageUrl={(n) => `/page/${n}`}
        currPage={currentPage}
      />
    </>
  );
};

export default PaginationLayout;

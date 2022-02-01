import React, { useEffect } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { lighten } from "polished";
import _ from "lodash";
import { useRouter } from "next/router";

import { getPostsByTag } from "../../redux/slices/posts";
import Post from "../../components/shared/Post";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import EmptyState from "../../components/shared/EmptyState";
import PaginationComponent from "../../components/shared/PaginationComponent";
import MainLayout from "../../components/layouts/MainLayout";

const Wraper = styled.section`
  margin-top: 60px;
  .posts-container {
    background-color: ${({ theme }) => lighten(0.1, theme.primary)};
    min-height: 100vh;
    padding: 1rem 4rem;
  }
  .empty-state-text {
    position: absolute;
    bottom: 100px;
  }
`;

const Posts = () => {
  const router = useRouter();
  const { tag, page } = router.query;
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPostsByTag({ tag, page }));
  }, [tag, page]);

  const handleChangePage = (pageNumber) => {
    if (pageNumber === 1) {
      router.push(`/t/${tag}`);
    } else {
      router.push(`/t/${tag}/?page=${pageNumber}`);
    }
  };

  return (
    <Wraper className="row flex-column w-100 mx-0 justify-content-center align-items-center">
      <LoadingSpinner show={posts?.status === "loading"} />
      <div className="posts-container justify-content-center justify-content-sm-start col-12 col-sm-10 py-2 px-0 px-sm-5">
        <div className="row m-0 justify-content-center justify-content-sm-start">
          {_.isEmpty(posts?.entity) ? (
            <EmptyState>
              <h6 className="text-center empty-state-text">
                پستی با این هشتگ وجود ندارد
              </h6>
            </EmptyState>
          ) : (
            posts?.entity?.map((post) => (
              <div className="col-11 col-sm-6 col-lg-4 mb-4" key={post?._id}>
                <Post post={post} />
              </div>
            ))
          )}
        </div>
        <PaginationComponent
          postsPerPage={12}
          totalPosts={posts?.entity?.length}
          pageRange={3}
          onChangepage={handleChangePage}
          getPageUrl={(n) => `/t/${tag}/?page=${n}`}
          currPage={+page || 1}
        />
      </div>
    </Wraper>
  );
};

Posts.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Posts;

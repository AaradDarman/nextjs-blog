import React from "react";

import styled from "styled-components";
import { lighten } from "polished";
import { useRouter } from "next/router";

import Post from "../../components/Index/Post";
import MainLayout from "../../components/layouts/MainLayout";
import api from "../../adapters/adapter";
import PaginationComponent from "../../components/shared/PaginationComponent";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const Wraper = styled.div`
  margin-top: 60px;
  .posts {
    background-color: ${({ theme }) => lighten(0.1, theme.primary)};
    min-height: 100vh;
    padding: 1rem 4rem;
  }
`;

const Page = ({ posts, postsCount, page }) => {
  const { isFallback, push } = useRouter();

  const handleChangePage = (pageNumber) => {
    if (pageNumber === 1) {
      push(`/`);
    } else {
      push(`/page/${pageNumber}`);
    }
  };

  return (
    <Wraper className="row flex-column w-100 mx-0 justify-content-center align-items-center">
      <LoadingSpinner show={isFallback} />
      <div className="posts col-12 col-sm-10 py-2 px-0 px-sm-5">
        <div className="row m-0 justify-content-center justify-content-sm-start">
          {posts?.map((post) => (
            <div className="col-11 col-sm-6 col-lg-4 mb-4" key={post?._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
        <PaginationComponent
          postsPerPage={12}
          totalPosts={postsCount}
          pageRange={3}
          onChangepage={handleChangePage}
          getPageUrl={(n) => `/page/${n}`}
          currPage={+page}
        />
      </div>
    </Wraper>
  );
};

export const getStaticPaths = async () => {
  try {
    console.log("getStaticPaths");
    const { status, data } = await api.getPosts();
    if (status === 200) {
      let pages = Math.ceil(data.posts.length / 12);
      const paths = [...Array(pages).keys()].map((p) => ({
        params: { page: p + 1 + "" },
      }));

      return { paths, fallback: true };
    }
  } catch (e) {
    return e;
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    console.log("page");
    console.log(params?.page);
    const { status, data } = await api.getPosts(params?.page);
    if (status === 200) {
      return {
        props: {
          posts: data.posts,
          postsCount: data.postsCount,
          page: params?.page,
        },
        revalidate: 120,
      };
    }
  } catch (e) {
    return e;
  }
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;

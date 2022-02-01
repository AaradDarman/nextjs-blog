import React from "react";

import styled from "styled-components";
import { lighten } from "polished";
import { useRouter } from "next/router";

import Post from "../../../../components/Index/Post";
import MainLayout from "../../../../components/layouts/MainLayout";
import Hero from "../../../../components/Index/Hero";
import api from "../../../../adapters/adapter";
import PaginationComponent from "../../../../components/shared/PaginationComponent";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";

const Wraper = styled.div`
  margin-top: 60px;
  .posts {
    background-color: ${({ theme }) => lighten(0.1, theme.primary)};
    min-height: 100vh;
    padding: 1rem 4rem;
  }
`;

const Page = ({ posts, postsCount, page, category }) => {
  const { isFallback, push } = useRouter();

  const handleChangePage = (pageNumber) => {
    if (pageNumber === 1) {
      push(`/${category}`);
    } else {
      push(`/${category}/page/${pageNumber}`);
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
          getPageUrl={(n) => `/${category}/page/${n}`}
          currPage={+page}
        />
      </div>
    </Wraper>
  );
};

export const getStaticPaths = async () => {
  try {
    const { status, data } = await api.getCategories();
    let paths = await Promise.all(
      data.categories.map(async (c) => {
        const popstsRes = await api.getPostsByCategory(c.url);
        if (popstsRes.status === 200) {
          let pages = Math.ceil(popstsRes.data.posts.length / 5);
          let par;
          if (pages === 0) {
            par = { params: { category: c.url, page: 1 + "" } };
          } else {
            par = [...Array(pages).keys()].map((p) => ({
              params: { category: c.url, page: p + 1 + "" },
            }));
          }
          return par;
        }
      })
    );
    console.log("paths");
    console.log(paths.flat());
    return { paths: paths.flat(), fallback: true };
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    const { status, data } = await api.getPostsByCategory(
      params?.category,
      params?.page
    );
    if (status === 200) {
      return {
        props: {
          posts: data.posts,
          postsCount: data.postsCount,
          page: params?.page,
          category: params?.category,
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

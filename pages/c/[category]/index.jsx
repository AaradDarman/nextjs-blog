import React, { useEffect } from "react";

import styled from "styled-components";
import { lighten } from "polished";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Post from "../../../components/Index/Post";
import MainLayout from "../../../components/layouts/MainLayout";
import api from "../../../adapters/adapter";
import { toast } from "react-toastify";
import PaginationComponent from "../../../components/shared/PaginationComponent";
import EmptyState from "../../../components/shared/EmptyState";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import Head from "next/head";
import _ from "lodash";

const Wraper = styled.div`
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

const Index = ({ posts, postsCount }) => {
  const router = useRouter();
  const { category } = router.query;
  const { categories } = useSelector((state) => state);

  const handleChangePage = (pageNumber) => {
    if (pageNumber === 1) {
      router.push(`/${category}`);
    } else {
      router.push(`/${category}/${pageNumber}`);
    }
  };

  return (
    <Wraper className="row flex-column w-100 mx-0 justify-content-center align-items-center">
      <Head>
        <title>{`پست ها | ${
          typeof window !== "undefined" &&
          categories.find((cat) => cat.url === category)?.title
        }`}</title>
      </Head>
      <LoadingSpinner show={router.isFallback} />
      <div className="posts-container col-12 col-sm-10 py-2 px-0 px-sm-5">
        <div className="row m-0 justify-content-center justify-content-sm-start">
          {_.isEmpty(posts) && !router.isFallback ? (
            <EmptyState>
              <h6 className="text-center empty-state-text">
                در این دسته بندی پستی وجود ندارد
              </h6>
            </EmptyState>
          ) : (
            posts?.map((post) => (
              <div className="col-11 col-sm-6 col-lg-4 mb-4" key={post?._id}>
                <Post post={post} />
              </div>
            ))
          )}
        </div>
        <PaginationComponent
          postsPerPage={12}
          totalPosts={postsCount}
          pageRange={3}
          onChangepage={handleChangePage}
          getPageUrl={(n) => `/c/${category}/${n}`}
          currPage={1}
        />
      </div>
    </Wraper>
  );
};

export const getStaticPaths = async () => {
  try {
    const { status, data } = await api.getCategories();
    if (status === 200) {
      const paths = data.categories.map((category) => ({
        params: { category: category.url },
      }));

      return { paths, fallback: true };
    }
    return { paths, fallback: true };
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    const { status, data } = await api.getPostsByCategory(params?.category);
    if (status === 200) {
      return {
        props: {
          posts: data.posts,
          postsCount: data.postsCount + "",
        },
        revalidate: 120,
      };
    }
  } catch (e) {
    return e;
  }
};

Index.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;

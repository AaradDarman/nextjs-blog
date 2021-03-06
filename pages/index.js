import React from "react";

import styled from "styled-components";
import { lighten } from "polished";
import { useRouter } from "next/router";

import Post from "../components/Index/Post";
import MainLayout from "../components/layouts/MainLayout";
import Hero from "../components/Index/Hero";
import api from "../adapters/admin-adapter";
import PaginationComponent from "../components/shared/PaginationComponent";

const Wraper = styled.div`
  .posts {
    background-color: ${({ theme }) => lighten(0.1, theme.primary)};
    min-height: 100vh;
    padding: 1rem 4rem;
  }
`;

const Index = ({ posts, postsCount }) => {
  const router = useRouter();
  const handleChangePage = (pageNumber) => {
    if (pageNumber === 1) {
      router.push(`/`);
    } else {
      router.push(`/page/${pageNumber}`);
    }
  };

  return (
    <Wraper className="row flex-column w-100 m-0 justify-content-center align-items-center">
      <div className="col-12 p-0">
        <Hero posts={posts} />
      </div>
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
          currPage={1}
        />
      </div>
    </Wraper>
  );
};

export const getStaticProps = async () => {
  try {
    console.log("index");
    const { status, data } = await api.getPosts();
    if (status === 200) {
      return {
        props: {
          posts: data.posts,
          postsCount: data.postsCount,
        },
        revalidate: 120,
      };
    }
  } catch (e) {
    console.log(e);
  }
};

Index.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { darken } from "polished";
import _ from "lodash";

import Post from "../../components/Dashboard/Post";
import { getPostsByAuthor } from "../../redux/slices/posts";
import Icon from "../../components/shared/Icon";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import EmptyState from "../../components/shared/EmptyState";
import Link from "next/link";
import Head from "next/head";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PostContext from "../../context/PostContext";

const Wraper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .actions {
    display: flex;
    justify-content: center;
  }
  .filter-ooptions {
    display: flex;
  }
  .create-btn {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 0.3rem;
    transition: all 0.3s ease;
    box-shadow: 1px 2px 2px 2px ${({ theme }) => darken(0.06, theme.accent)};
  }
  .create-btn:hover {
    background-color: ${({ theme }) => darken(0.06, theme.accent)};
  }
  .posts-container {
    display: flex;
    justify-content: center;
    flex: 1;
    overflow-y: hidden;
    text-align: right;
    direction: rtl;
    transition: all 0.3s ease;
  }
  .post-wraper {
    height: 100%;
    padding: 0.7rem 0.5rem;
    padding-right: 0;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 0.5rem;
    box-shadow: 1px 2px 2px 2px ${({ theme }) => darken(0.01, theme.primary)};
  }
  .overflow-layer {
    height: 100%;
    overflow-y: scroll;
    direction: ltr;
  }
  @media (min-width: 500px) {
    .overflow-layer::-webkit-scrollbar {
      width: 10px;
    }
    .overflow-layer::-webkit-scrollbar-track {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
    .overflow-layer::-webkit-scrollbar-thumb {
      border-radius: 0.5rem;
    }
  }
  .empty-state-text {
    position: absolute;
    bottom: 100px;
  }
`;

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPostsByAuthor(user._id));
  }, []);

  return (
    <Wraper className="posts">
      <Head>
        <title>داشبورد | پست ها</title>
      </Head>
      <LoadingSpinner show={posts?.status === "loading"} />
      <div className="actions mb-4">
        <div className="col-8 d-flex justify-content-between">
          <Link href="/dashboard/work-table">
            <a className="create-btn">
              ساخت پست
              <Icon className="icon ml-1" icon="plus" size={15} />
            </a>
          </Link>
          <div className="filter-ooptions">
            <Icon className="mr-1" icon="home" size={15} />
            <Icon className="mr-1" icon="home" size={15} />
            <Icon className="mr-1" icon="home" size={15} />
          </div>
        </div>
      </div>
      <div className="posts-container">
        <div className="col-12 col-md-10 col-xl-8 pb-1 px-0">
          <div className="post-wraper">
            <div className="overflow-layer">
              {_.isEmpty(posts?.entity) ? (
                <EmptyState className="h-100">
                  <h6 className="text-center empty-state-text">
                    هنوز پستی ایجاد نکردید
                  </h6>
                </EmptyState>
              ) : (
                posts?.entity?.map((post) => (
                  <Post post={post} key={post?._id} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Wraper>
  );
};

Posts.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <PostContext>{page}</PostContext>
    </DashboardLayout>
  );
};

export default Posts;

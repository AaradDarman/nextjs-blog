import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { darken, lighten } from "polished";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";

import {
  createMarkup,
  convertContentToHTML,
} from "../../utils/post-content-helper";
import { convetStringToUrlFormat } from "../../utils/string-helper";
import { getPost, clearPost, handleLikeDislike } from "../../redux/slices/post";
import Icon from "../../components/shared/Icon";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { fromNow } from "../../utils/date-helper";
import { useRouter } from "next/router";
import MainLayout from "../../components/layouts/MainLayout";
import api from "../../adapters/adapter";
import Head from "next/head";
import Image from "next/image";

const Wraper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => lighten(0.1, theme.primary)};
  .post-banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 25px);
    position: relative;
  }
  .post-banner::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 70%;
    width: 100%;
    transition: 0.3s;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      #000000 70%
    );
    opacity: 0.85;
    z-index: 1;
    pointer-events: none;
  }
  .post-title {
    color: rgb(232, 230, 227);
    text-shadow: rgb(0 0 0) 2px 2px 3px;
    z-index: 1;
  }
  .post-subtitle {
    z-index: 1;
    font-size: 1rem;
    color: rgb(232, 230, 227);
  }
  .post-content {
    width: 90%;
    position: relative;
    top: -100px;
    z-index: 1;
    background: ${({ theme }) => theme.primary};
    padding: 1rem;
    border-radius: 0.5rem;
  }
  p,
  img {
    margin-bottom: 20px;
  }
  img {
    width: 100% !important;
    border-radius: 0.3rem;
  }
  .author,
  .create-date,
  .views-count,
  .likes-count,
  .tags {
    color: inherit !important;
    background-color: inherit !important;
    font-family: inherit !important;
    line-height: 1.5;
  }
  .meta-data {
    display: flex;
    color: rgb(232, 230, 227);
    font-size: 0.8rem;
    transition: all 0.3s ease;
    z-index: 1;
  }
  .post-categories {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  .post-category {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    margin: 0 2px;
    transition: all 0.3s ease;
  }
  .post-category:not(:last-child):after {
    content: "،";
  }
  .post-category:hover {
    color: ${({ theme }) => darken(0.06, theme.accent)};
  }
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  .post-tag {
    color: ${({ theme }) => theme.button};
    margin-left: 5px;
    text-decoration: none;
  }
  .post-tag::before {
    content: "#";
  }
  @media (min-width: 768px) {
    .post-content {
      width: 75%;
    }
  }
  .like-btn {
    cursor: pointer;
  }
  .liked-icon {
    color: #db3737;
  }
`;

const Post = ({ post }) => {
  const { user } = useSelector((state) => state);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(async () => {
    window.scrollTo({
      top: 0,
    });

    try {
      api.updatePostView(post._id);
      if (!_.isEmpty(user)) {
        const { status, data } = await api.checkPostLike(post._id);
        if (status === 200) {
          setIsLiked(data.isLiked);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLikeBtn = async () => {
    if (_.isEmpty(user)) {
      toast.error("باید اول وارد حسابت بشی", {
        position: "bottom-center",
        closeOnClick: true,
      });
    } else {
      const { status, data } = await api.likeDislikePost(post._id);
      if (status === 200) {
        setIsLiked(data.liked);
      }
    }
  };

  return (
    <Wraper className="post rtl">
      <Head>
        <title>{`بلاگ | ${post?.title}`}</title>
      </Head>
      <LoadingSpinner show={post?.status === "loading"} />
      <div className="post-banner">
        <Image
          src={post?.bannerImage}
          alt="post-banner"
          layout="fill"
          objectFit="cover"
        />
        <h1 className="post-title">{post?.title}</h1>
        <h3 className="post-subtitle mb-3">{post?.subtitle}</h3>
        <div className="meta-data">
          <div className="d-flex align-items-center">
            <Icon className="icon mr-1" icon="profile" size={15} />
            <span className="author mr-3">{post?.author?.fullName}</span>
          </div>
          <div className="d-flex align-items-center">
            <Icon className="icon mr-1" icon="calendar" size={15} />
            <span className="create-date mr-3">{fromNow(post?.createAt)}</span>
          </div>
          <div className="d-flex align-items-center">
            <Icon className="icon mr-1" icon="view" size={15} />
          </div>
          <span className="views-count">{post?.viewCount}</span>
        </div>
        <div className="d-flex align-items-center meta-data mt-3">
          <span className={post?.liked && "liked-icon"}>
            <Icon
              className="icon mr-1"
              icon={post?.liked ? "like-filled" : "like"}
              size={15}
            />
          </span>
          <span className="likes-count">{post?.likes?.length}</span>
        </div>
      </div>
      <div className="post-content">
        <div
          dangerouslySetInnerHTML={createMarkup(
            convertContentToHTML(post?.content)
          )}
        ></div>
        <div className="post-categories">
          <Icon className="icon mr-1" icon="folder" size={15} />
          {post?.categories?.map((c, index) => (
            <Link href={`/c/${c.url}`} key={index}>
              <a className="post-category">{c.title}</a>
            </Link>
          ))}
        </div>
        {post?.tags?.length > 0 && (
          <div className="post-tags">
            <span className="tags">برچسب ها: </span>
            {post?.tags?.map((t, index) => (
              <Link href={`/t/${convetStringToUrlFormat(t)}`} key={index}>
                <a className="post-tag">{convetStringToUrlFormat(t)}</a>
              </Link>
            ))}
          </div>
        )}
        <div className="d-flex justify-content-end">
          <span
            className={`like-btn p-2 ${isLiked && "liked-icon"}`}
            onClick={handleLikeBtn}
          >
            <Icon icon={isLiked ? "like-filled" : "like"} size={15} />
          </span>
        </div>
      </div>
    </Wraper>
  );
};

export const getStaticPaths = async () => {
  try {
    console.log("getStaticPaths");
    const { status, data } = await api.getPosts();
    if (status === 200) {
      const paths = data.posts.map((post) => ({
        params: { id: post._id },
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
    const { status, data } = await api.getPost(params?.id);
    if (status === 200) {
      return {
        props: {
          post: data.post,
        },
        revalidate: 120,
      };
    }
  } catch (e) {
    return e;
  }
};

Post.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Post;

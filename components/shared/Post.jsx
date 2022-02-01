import React from "react";

import styled from "styled-components";
import { darken } from "polished";

import { shorten } from "../../utils/string-helper";
import { fromNow } from "../../utils/date-helper";
import Icon from "./Icon";
import Link from "next/link";
import Image from "next/image";

const Wraper = styled.article`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary};
  text-align: right;
  direction: rtl;
  padding: 0.5rem;
  border-radius: 1.2rem;
  box-shadow: 5px 5px 5px 2px ${({ theme }) => darken(0.01, theme.primary)};
  transition: all 0.3s ease;
  line-height: 1.5;
  height: 370px;
  :hover {
    box-shadow: 5px 5px 5px 6px ${({ theme }) => darken(0.01, theme.primary)};
  }
  .post-info {
    flex: 1;
    padding: 0.2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .post-banner {
    width: 100%;
    height: 200px;
    position: relative;
  }
  .post-banner-img {
    border-radius: 0.7rem;
  }
  .post-title {
    font-size: 1.4rem;
  }
  .post-title a {
    text-decoration: none;
    color: inherit;
  }
  .post-subtitle {
    color: ${({ theme }) => theme.accent};
  }
  .meta-data {
    display: flex;
    color: ${({ theme }) => darken(0.3, theme.text)};
    font-size: 0.72rem;
  }
  .author-profile {
    width: 30px;
    height: 30px;
    border-radius: 40%;
    margin-left: 5px;
  }
`;
const Post = ({ post }) => {
  return (
    <Wraper bannerSrc={post.bannerImage}>
      <Link href={`/p/${post?._id}`}>
        <a className="post-banner">
          <Image
            src={post?.bannerImage}
            alt="post-banner"
            layout="fill"
            objectFit="cover"
            className="post-banner-img"
          />
        </a>
      </Link>
      <div className="post-info">
        <h3 className="post-title">
          <Link href={`/p/${post?._id}`}>
            <a>{shorten(post?.title, 87)}</a>
          </Link>
        </h3>
        <p className="post-subtitle">{shorten(post?.subtitle, 80)}</p>
        <div className="meta-data">
          {post?.author?.profileImage ? (
            <img
              src={post?.author?.profileImage}
              alt="profile"
              className="author-profile"
            />
          ) : (
            <img
              src={
                post?.author?.gender === "مرد"
                  ? "/images/male-avatar.png"
                  : "/images/female-avatar.png"
              }
              alt="profile"
              className="author-profile"
            />
          )}
          <div className="d-flex flex-column">
            <span className="author-name">{post?.author?.fullName}</span>
            <span className="create-date">{fromNow(post?.createAt)}</span>
          </div>
        </div>
      </div>
    </Wraper>
  );
};

export default Post;

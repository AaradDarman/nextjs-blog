import React from "react";

import styled from "styled-components";
import Link from "next/link";
import { darken } from "polished";
import Image from "next/image";

import { convetStringToUrlFormat, shorten } from "../../utils/string-helper";
import { fromNow } from "../../utils/date-helper";
import { shimmer, toBase64 } from "../../utils/image-helper";

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
    padding: 0.4rem;
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
    align-items: center;
    color: ${({ theme }) => darken(0.3, theme.text)};
    font-size: 0.72rem;
  }
  .author-profile {
    width: 30px;
    height: 30px;
    border-radius: 40%;
    margin-left: 5px;
  }
  .post-categories {
    display: flex;
    flex-wrap: wrap;
  }
  .post-category {
    background-color: ${({ theme }) => theme.button};
    border: 1px solid ${({ theme }) => darken(0.2, theme.button)};
    color: ${({ theme }) => theme.text};
    border-radius: 0.3rem;
    padding: 3px 5px;
    margin: 0 2px;
    text-decoration: none;
  }
`;
const Post = ({ post }) => {
  return (
    <Wraper bannerSrc={post?.bannerImage}>
      <Link href={`/p/${post?._id}`}>
        <a className="post-banner">
          <Image
            src={post?.bannerImage}
            alt="post-banner"
            layout="fill"
            objectFit="cover"
            className="post-banner-img"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer("100%", 200)
            )}`}
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
          <div className="post-categories mr-auto">
            {post?.categories?.map((c, index) => (
              <Link href={`/c/${c.url}`} key={index}>
                <a className="post-category"> {c.title}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Wraper>
  );
};

export default Post;

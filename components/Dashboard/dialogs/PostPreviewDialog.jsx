import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { darken, lighten } from "polished";
import produce from "immer";
import _ from "lodash";
import { Dialog } from "@blueprintjs/core";
import { useSelector } from "react-redux";

import { convertContentToHTML } from "../../../utils/post-content-helper";
import { useCreatePost } from "../../../context/post-context";
import Icon from "../../shared/Icon";
import { convetStringToUrlFormat } from "../../../utils/string-helper";
import Link from "next/link";

const MDialog = styled(Dialog)`
  background-color: ${({ theme }) => lighten(0.1, theme.primary)};
  width: 90vw;
  padding-bottom: 0;
  direction: rtl;
  text-align: right;
  .bp3-dialog-header {
    background-color: ${({ theme }) => darken(0.01, theme.primary)};
    color: ${({ theme }) => theme.text};
  }
  .bp3-button.bp3-minimal {
    color: ${({ theme }) => theme.text};
  }
  .bp3-heading {
    color: ${({ theme }) => theme.text};
  }
  .bp3-dialog-header .bp3-icon {
    margin-right: 0;
    margin-left: 10px;
  }
  .post-banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: calc(100vh - 25px);
    background-image: url(${({ bannerSrc }) => bannerSrc});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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
  span {
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
`;

const PostPreviewDialog = ({ isOpen, onClose }) => {
  const {
    content,
    contentImages,
    postTitle,
    postSubtitle,
    bannerImage,
    categories,
    tags,
  } = useCreatePost();

  const { user } = useSelector((state) => state);
  const [previewContent, setPreviewContent] = useState();
  const [bSrc, setBSrc] = useState("");

  useEffect(() => {
    if (!_.isEmpty(content.entityMap)) {
      const nextState = produce(content, (draftState) => {
        Object.keys(draftState.entityMap).map(function (key, index) {
          let targetImg = contentImages.find(
            (img) => img.file.name === draftState.entityMap[key].data.src
          );
          if (targetImg) {
            return (draftState.entityMap[key].data.src = URL.createObjectURL(
              targetImg.file
            ));
          }
        });
      });
      setPreviewContent(nextState);
    } else {
      setPreviewContent(content);
    }
  }, [content]);

  useEffect(() => {
    if (typeof bannerImage === "string") {
      setBSrc(bannerImage);
    } else if (typeof bannerImage === "object") {
      setBSrc(URL.createObjectURL(bannerImage));
    }
  }, [bannerImage]);

  return (
    <MDialog
      icon="info-sign"
      title="پیش نمایش"
      onClose={onClose}
      isOpen={isOpen}
      bannerSrc={bSrc}
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="post-banner">
          <h1 className="post-title">{postTitle}</h1>
          <h3 className="post-subtitle">{postSubtitle}</h3>
          <div className="meta-data">
            <div className="d-flex align-items-center">
              <Icon className="icon mr-1" icon="profile" size={15} />
              <span className="author mr-3">{user?.fullName}</span>
            </div>
          </div>
        </div>
        <div className="post-content w-75">
          <div
            dangerouslySetInnerHTML={{
              __html: convertContentToHTML(previewContent),
            }}
          ></div>
          <div className="post-categories">
            <Icon className="icon mr-1" icon="folder" size={15} />
            {categories?.map((c, index) => (
              <Link href={`/c/${c.value}`} key={index}>
                <a className="post-category">{c.label}</a>
              </Link>
            ))}
          </div>
          {tags && (
            <div className="post-tags">
              <span>برچسب ها: </span>
              {tags?.map((t, index) => (
                <Link
                  href={`/t/${convetStringToUrlFormat(t.text)}`}
                  key={index}
                >
                  <a className="post-tag">{convetStringToUrlFormat(t.text)}</a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </MDialog>
  );
};

export default PostPreviewDialog;

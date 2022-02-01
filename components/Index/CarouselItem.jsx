import React, { useEffect } from "react";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Wraper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  @media (max-width: 768px) {
    max-height: 500px;
    .carousel-caption h2 {
      width: 100%;
      text-align: center;
    }
  }
  & a:hover {
    color: inherit;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .carousel-caption {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    text-align: right;
    width: 80%;
    left: 10%;
    right: auto;
    bottom: 30%;
    direction: rtl;
  }
  .bg-overlay {
    position: absolute;
    inset: 0px;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.primary};
    opacity: 0.6;
  }
  @media (min-width: 993px) {
    .carousel-caption {
      width: 30%;
    }
  }
  .carousel-caption h2 {
    color: rgb(232, 230, 227);
    text-shadow: rgb(0 0 0) 2px 2px 3px;
    padding: 8px 15px;
    margin: 0;
    font-size: 1.3rem;
  }
  .carousel-caption div:first-of-type {
    color: ${({ theme }) => theme.text};
    display: flex;
    padding: 8px 8px 8px 30px;
    margin: 1rem 0;
    font-size: 1rem;
  }
  .carousel-caption div:last-child {
    display: inline-block;
    padding: 8px 8px 8px 30px;
    font-size: 1rem;
  }
  .carousel-caption div:last-child a {
    display: flex;
    align-items: center;
    transition: all 300ms ease-in-out;
  }
  .carousel-caption div:last-child a:hover {
    color: ${({ theme }) => theme.accent};
  }
  .carousel-caption div:last-child a:hover::after {
    transform: translateX(-20%);
  }
  .carousel-caption div:last-child a:after {
    content: "";
    display: inline-block;
    width: 20px;
    height: 33px;
    clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%);
    background-color: ${({ theme }) => theme.accent};
    margin-right: 1rem;
    transition: all 300ms ease-in-out;
  }
`;

const CarouselItem = ({ post }) => {
  return (
    <Wraper className="embla__slide">
      <Image src={post?.bannerImage} layout="fill" objectFit="cover" />
      <div className="bg-overlay"></div>
      <div className="carousel-caption">
        <h2>
          <Link href={`/p/${post?._id}`}>
            <a>{post?.title}</a>
          </Link>
        </h2>
        <div className="d-none d-lg-block">
          <Link href={`/p/${post?._id}`}>
            <a>{post?.subtitle}</a>
          </Link>
        </div>
        <div className="d-none d-lg-block">
          <Link href={`/p/${post?._id}`}>
            <a>مطالعه می‌کنم ...</a>
          </Link>
        </div>
      </div>
    </Wraper>
  );
};

export default CarouselItem;

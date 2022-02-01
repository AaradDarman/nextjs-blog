import React from "react";

import Link from "next/link";

import styled from "styled-components";
import { darken } from "polished";

import { convetStringToUrlFormat } from "../../utils/string-helper";

const Wraper = styled.nav`
  transition: all 200ms ease-in-out;
  line-height: 2;
  * {
    transition: all 200ms ease-in-out;
  }
  & > ul {
    display: flex;
    justify-content: start;
    align-items: center;
    list-style: none;
    width: 100%;
    margin: 0;
    transition: all 200ms ease-in-out;
  }
  & a {
    display: block;
    padding: 0.5rem 0.75rem;
    transition: all 200ms linear;
    color: ${({ float, theme }) => (float ? theme.accent : "inherit")};
    font-weight: bold;
  }
  & a:hover {
    color: ${({ float, theme }) =>
      float ? darken(0.1, theme.accent) : "inherit"};
    text-decoration: none;
  }
`;

const Nav = ({ float, className }) => {
  return (
    <Wraper className={`${className} navigation-menu`} float={float}>
      <ul>
        <li>
          <Link href="/c/news-and-articles">
            <a>اخبار و مقالات</a>
          </Link>
        </li>
        <li>
          <Link href={`/c/scientific`}>
            <a>علمی</a>
          </Link>
        </li>
        <li>
          <Link href={`/c/movies-and-series`}>
            <a>فیلم و سریال</a>
          </Link>
        </li>
        <li>
          <Link href={`/c/games-review`}>
            <a>بررسی بازی ها</a>
          </Link>
        </li>
        <li>
          <Link href={`/c/technology`}>
            <a>فناوری</a>
          </Link>
        </li>
        <li>
          <Link href={`/c/health`}>
            <a>سلامت</a>
          </Link>
        </li>
      </ul>
    </Wraper>
  );
};

export default Nav;

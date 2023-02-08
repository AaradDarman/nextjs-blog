import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import Link from "next/link";

import _ from "lodash";
import { useSelector } from "react-redux";
import { darken } from "polished";

import Nav from "./Nav";
import ProfilePopover from "./ProfilePopover";
import DrawerMenu from "./DrawerMenu";
import { useRouter } from "next/router";

const Wraper = styled.header`
  position: fixed;
  top: 0;
  display: block;
  width: 100%;
  transition: all 200ms ease-in-out;
  z-index: 11;
  .dark-layer {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    transition: all 400ms ease-in-out;
    background-image: linear-gradient(#000000c7, transparent);
    color: #fefefe;
    min-height: 60px;
  }
  .dark-layer nav ul {
    transition: all 50ms ease-in-out;
  }
  .bp3-icon {
    cursor: pointer;
  }
  .navbar-brand img {
    width: 200px;
  }
  .logo {
    transition: all 50ms ease-in-out;
    display: block;
    background: ${({ float }) =>
        float ? "url(/logo.svg)" : "url(/logo-light.svg)"}
      no-repeat center center;
    background-size: contain;
    width: 50px;
    height: 39px;
    line-height: 0;
    font-size: 0;
    color: transparent;
  }
  .signup-btn {
    background-color: ${({ theme }) => theme.text};
    border: none;
    color: ${({ theme }) => theme.primary};
  }
  .signup-btn:hover {
    background-color: ${({ theme }) => darken(0.1, theme.text)};
  }
`;

const Header = () => {
  let lastKnownScrollPosition = 0;
  const { user } = useSelector((state) => state);
  const [offset, setOffset] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Wraper
      float={
        (router.asPath !== "/" && !router.asPath.startsWith("/p/")) ||
        offset > 15
      }
      className={`header ${
        (router.asPath !== "/" &&
          !router.asPath.startsWith("/p/") &&
          "float-header") ||
        (offset > 15 && "float-header")
      }`}
      id="header"
    >
      <div className="dark-layer rtl d-flex justify-content-between">
        <Link href="/">
          <a className="logo order-2 order-xl-1 ">sd</a>
        </Link>
        <Nav
          float={
            (router.asPath !== "/" && !router.asPath.startsWith("/p/")) ||
            offset > 15
          }
          className="d-none d-xl-block order-2"
        />
        <DrawerMenu className="d-inline-block d-xl-none order-1 " />
        {_.isEmpty(user) ? (
          <div className="auth-wraper d-none d-xl-block order-3  order-xl-3 ">
            <button
              className="m-btn mr-1"
              onClick={() => router.push("/login")}
            >
              ورود
            </button>
            <button
              className="m-btn-cancel signup-btn ml-1"
              onClick={() => router.push("/signup")}
            >
              ثبت نام
            </button>
          </div>
        ) : (
          <ProfilePopover className="order-3  order-xl-3" />
        )}
      </div>
    </Wraper>
  );
};

export default Header;

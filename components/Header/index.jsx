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
  const [float, setFloat] = useState(false);
  const { user } = useSelector((state) => state);

  // const navigate = useNavigate();
  const router = useRouter();

  let scrollEventListener = useCallback(() => {
    lastKnownScrollPosition = window.scrollY;
    if (
      (router.asPath.startsWith("/p/") || router.asPath === "/") &&
      lastKnownScrollPosition === 0
    ) {
      document.getElementById("header")?.classList.remove("float-header");
      setFloat(false);
    }
    if (
      (router.asPath.startsWith("/p/") || router.asPath === "/") &&
      lastKnownScrollPosition > 15
    ) {
      document.getElementById("header")?.classList.add("float-header");
      setFloat(true);
    }
  }, [router.asPath]);

  useEffect(() => {
    window.removeEventListener("scroll", scrollEventListener, true);
    window.addEventListener("scroll", scrollEventListener, true);
    return () => {
      window.removeEventListener("scroll", scrollEventListener, true);
    };
  }, [scrollEventListener]);

  // useEffect(() => {
  //   if (!router.asPath.startsWith("/p/") && router.asPath !== "/") {
  //     document.getElementById("header")?.classList.add("float-header");
  //     setFloat(true);
  //   }
  // }, [router.asPath]);

  return (
    <Wraper float={float} className="header" id="header">
      <div className="dark-layer rtl d-flex justify-content-between">
        <Link href="/">
          <a className="logo order-2 order-xl-1 ">sd</a>
        </Link>
        <Nav float={float} className="d-none d-xl-block order-2" />
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

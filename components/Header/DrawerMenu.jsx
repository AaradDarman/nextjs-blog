import React, { useEffect, useState } from "react";

import { Drawer, Icon } from "@blueprintjs/core";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { useTheme } from "styled-components";
import { useSelector } from "react-redux";
import _ from "lodash";

import useBreakpoints from "../../utils/useBreakPoints";
import { convetStringToUrlFormat } from "../../utils/string-helper";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 200px;
  transition: all 200ms ease-in-out;
  line-height: 2;
  * {
    transition: all 200ms ease-in-out;
  }
  & > ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0;
    transition: all 200ms ease-in-out;
  }
  & a {
    display: block;
    padding: 0.5rem 0.75rem;
    transition: all 200ms linear;
    color: inherit;
    font-weight: bold;
  }
  & a:hover {
    color: ${({ theme }) => theme.accent};
    text-decoration: none;
  }
`;

const DrawerHeader = styled.div`
  background-color: ${({ theme }) => theme.primary};
  position: relative;
  align-items: center;
  border-radius: 0;
  box-shadow: 0 1px 0 rgb(16 22 26 / 15%);
  display: flex;
  flex: 0 0 auto;
  min-height: 40px;
  padding: 0.5rem 1rem;
  padding-left: 20px;
  .header-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  .theme-toggler {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
`;

const DrawerBody = styled.div`
  flex: 1 1 auto;
  line-height: 18px;
  overflow: auto;
  background-color: ${({ theme }) => theme.primary};
  direction: rtl;
  text-align: right;
`;

const DrawerFooter = styled.div`
  background-color: ${({ theme }) => theme.primary};
  box-shadow: inset 0 1px 0 rgb(16 22 26 / 15%);
  flex: 0 0 auto;
  padding: 10px 20px;
  position: relative;
  .auth-btns-wraper {
    display: flex;
    margin-bottom: 1rem;
  }
`;

const DrawerMenu = ({ float, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { active, isXs } = useBreakpoints();
  const mTheme = useTheme();
  // const navigate = useNavigate();
  const router = useRouter();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    closeDrawer();
  }, [active, router.pathname]);

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  return (
    <div className={`${className} drawer-menu`}>
      <Icon
        color={mTheme.text}
        icon="menu"
        iconSize={22}
        onClick={openDrawer}
      />
      <Drawer
        onClose={closeDrawer}
        size={isXs && "65%"}
        isOpen={isOpen}
        position="right"
      >
        <DrawerHeader>
          <Icon
            className="ml-auto header-icon"
            style={{ cursor: "pointer" }}
            color={mTheme.text}
            iconSize={22}
            icon="cross"
            onClick={closeDrawer}
          />
        </DrawerHeader>
        <DrawerBody>
          <Nav>
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
          </Nav>
        </DrawerBody>
        {_.isEmpty(user) && (
          <DrawerFooter>
            <div className="auth-btns-wraper rtl">
              <button
                className="m-btn mr-1"
                onClick={() => {
                  closeDrawer();
                  router.push("/login");
                }}
              >
                ورود
              </button>
              <button
                className="m-btn-cancel ml-1"
                onClick={() => {
                  closeDrawer();
                  router.push("/signup");
                }}
              >
                ثبت نام
              </button>
            </div>
          </DrawerFooter>
        )}
      </Drawer>
    </div>
  );
};

export default DrawerMenu;

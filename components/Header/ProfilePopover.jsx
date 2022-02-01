import React, { useState } from "react";

import { Popover2 } from "@blueprintjs/popover2";
import styled from "styled-components";
import Link from "next/link";
import { useSelector } from "react-redux";

import useBreakpoints from "../../utils/useBreakPoints";
import Icon from "../shared/Icon";

const Wraper = styled.div`
  z-index: 8888;
  height: 20px;
  .profile-btn {
    display: flex;
    align-items: center;
    text-align: center;
    vertical-align: middle;
    background-color: transparent;
    color: inherit;
    border: none;
    padding: 0;
    font-size: 1.4rem;
    line-height: 1.5;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .register-btn i {
    font-size: 1.2rem;
  }
`;

const ProfileMenuWraper = styled.ul`
  padding: 1rem;
  list-style: none;
  li {
    display: flex;
  }
  a {
    width: 100%;
    text-decoration: none;
    padding: 0.2rem 0.5rem;
    color: inherit;
  }
  .user-fullname {
    font-size: 1rem;
    text-align: center;
  }
`;

const ProfilePopover = ({ className }) => {
  const breakPoints = useBreakpoints();
  const { isMd } = breakPoints;
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state);

  const ProfileMenu = () => {
    return (
      <>
        <ProfileMenuWraper className="profile-menu rtl">
          <h5 className="user-fullname rtl">{user.fullName}</h5>
          <li>
            {!user?.isAdmin ? (
              <Link href="/account">
                <a>
                  <Icon className="mr-2" icon="profile" size={20} />
                  پروفایل
                </a>
              </Link>
            ) : (
              <Link href="/dashboard">
                <a>
                  <Icon className="mr-2" icon="dashboard" size={20} />
                  داشبورد
                </a>
              </Link>
            )}
          </li>
          <li>
            <Link onClick={() => setIsOpen(false)} href="/change-password">
              <a>
                <Icon className="mr-2" icon="password" size={20} />
                تغییر رمز عبور
              </a>
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <a>
                <Icon className="mr-2" icon="logout" size={20} />
                خروج
              </a>
            </Link>
          </li>
        </ProfileMenuWraper>
      </>
    );
  };

  return (
    <Wraper className={className} menuState={isOpen} {...breakPoints}>
      <Popover2
        menuState={isOpen}
        isOpen={isOpen}
        popoverClassName="cpopover"
        onOpened={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        modifiers={{ arrow: { enabled: false } }}
        interactionKind="click"
        content={<ProfileMenu />}
        placement="auto"
      >
        <button
          className="profile-btn"
          onMouseEnter={() => isMd && setIsOpen(true)}
          onClick={() => setIsOpen(true)}
        >
          <Icon icon="profile" size={20} />
        </button>
      </Popover2>
    </Wraper>
  );
};

export default ProfilePopover;

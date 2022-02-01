import React, { useEffect } from "react";

import styled from "styled-components";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";
import { DateObject } from "react-multi-date-picker";

import Icon from "../../components/shared/Icon";
import { useAuth } from "../../context/auth-context";
import { getAuthorInfo } from "../../redux/slices/user";
import { getPersianDate } from "../../utils/date-helper";
import BirthdayPicker from "../../components/Singup/BirthdayPicker";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Head from "next/head";
import AuthContext from "../../context/AuthContext";


const Wraper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .profile {
    height: 90%;
    width: 50%;
    background-color: ${({ theme }) => theme.primary};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 0.5rem;
    padding: 1rem 3rem;
  }
  .profile__img {
    position: relative;
  }
  .profile__img img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }
  .profile__img__label-file-input {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin: 0;
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    text-align: center;
    left: 50%;
    padding: 5px;
  }
  .profile__img__file-input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  @media (max-width: 500px) {
    .profile {
      padding: 1rem;
    }
  }
`;

const Dashboard = () => {
  const { handleChangeProfileImage, uploadProfileLoading } = useAuth();
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorInfo());
  }, []);

  return (
    <Wraper>
      <Head>
        <title>داشبورد | پروفایل</title>
      </Head>
      <LoadingSpinner show={uploadProfileLoading} />
      <div className="profile col-11 col-md-4">
        <div className="profile__img">
          {user?.profileImage ? (
            <img src={user?.profileImage} alt="profile" />
          ) : (
            <img
              src={
                user?.gender === "مرد"
                  ? "/images/male-avatar.png"
                  : "/images/female-avatar.png"
              }
              alt="profile"
            />
          )}
          <label
            htmlFor="profile-img"
            className="profile__img__label-file-input m-btn"
          >
            <Icon className="icon" icon="edit" size={18} />
          </label>
          <form encType="multipart/form-data">
            <input
              className="profile__img__file-input"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="profileImage"
              id="profile-img"
              aria-describedby="profileImage"
              onChange={(e) => handleChangeProfileImage(e.target.files[0])}
            />
          </form>
        </div>
        <div className="profile__fullname d-flex flex-column w-100 w-sm-75">
          <FormGroup
            // helperText={errors.email && touched.email ? errors.email : ""}
            label="نام"
          >
            <InputGroup
              // intent={
              //   errors.email && touched.email
              //     ? "danger"
              //     : touched.email && "success"
              // }
              disabled
              // onChange={(e) => {
              //   setEmail(toEnglishDigits(e.target.value));
              //   setFieldValue("email", toEnglishDigits(e.target.value));
              // }}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     e.preventDefault();
              //     passElem.current.focus();
              //   }
              // }}
              value={user?.fullName}
              // onBlur={handleBlur("email")}
              rightElement={<Icon className="icon" icon="name" size={20} />}
              type="text"
            />
          </FormGroup>
        </div>
        <div className="profile__email d-flex flex-column w-100 w-sm-75">
          <FormGroup
            // helperText={errors.email && touched.email ? errors.email : ""}
            label="ایمیل"
          >
            <InputGroup
              // intent={
              //   errors.email && touched.email
              //     ? "danger"
              //     : touched.email && "success"
              // }
              disabled
              // onChange={(e) => {
              //   setEmail(toEnglishDigits(e.target.value));
              //   setFieldValue("email", toEnglishDigits(e.target.value));
              // }}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     e.preventDefault();
              //     passElem.current.focus();
              //   }
              // }}
              value={user?.email}
              // onBlur={handleBlur("email")}
              rightElement={<Icon className="icon" icon="envelope" size={20} />}
              type="email"
            />
          </FormGroup>
        </div>
        <div className="profile__birth-date d-flex flex-column w-100 w-sm-75">
          <FormGroup
            // helperText={
            //   errors.birthdayDate && touched.birthdayDate
            //     ? errors.birthdayDate
            //     : ""
            // }
            // labelInfo="*"
            label="تاریخ تولد"
          >
            <BirthdayPicker
              // onChange={(value) => {
              //   setBirthdayDate(value.toDate());
              //   setFieldValue("birthdayDate", value.toDate());
              // }}
              value={new DateObject(user?.birthdayDate)}
              InputComponent={(value, openCalendar) => {
                return (
                  <InputGroup
                    // intent={
                    //   errors.birthdayDate && touched.birthdayDate
                    //     ? "danger"
                    //     : touched.birthdayDate && "success"
                    // }
                    // onFocus={openCalendar}
                    disabled
                    value={value}
                    placeholder="روز / ماه / سال"
                    rightElement={
                      <Icon className="icon" icon="calendar" size={20} />
                    }
                    type="text"
                  />
                );
              }}
            />
          </FormGroup>
        </div>
        <div className="d-flex w-100 w-sm-75 justify-content-between">
          <div className="profile__register-date d-flex flex-column">
            <span>تاریخ عضویت</span>
            <span className="text-center">
              {getPersianDate(user?.registerDate)}
            </span>
          </div>
          <div className="profile__published-posts-count d-flex flex-column">
            <span>پست های منتشر شده</span>
            <span className="text-center">{user?.publishedPosts}</span>
          </div>
        </div>
      </div>
    </Wraper>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <AuthContext>{page}</AuthContext>
    </DashboardLayout>
  );
};

export default Dashboard;

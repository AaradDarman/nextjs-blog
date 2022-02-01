import React, { useRef } from "react";

import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";

import Icon from "../components/shared/Icon";
import { useAuth } from "../context/auth-context";
import GenderPicker from "../components/Singup/GenderPicker";
import BirthdayPicker from "../components/Singup/BirthdayPicker";
import { toEnglishDigits } from "../utils/string-helper";
import { darken } from "polished";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import MainLayout from "../components/layouts/MainLayout";

const Wraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .signup {
    min-width: 300px;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    background-color: ${({ theme }) => theme.primary};
    padding: 15px 25px 25px 25px;
    position: relative;
  }
  h5.title {
    font-size: 1.2rem;
    text-align: center;
    color: ${({ theme }) => theme.text};
    margin-bottom: 1rem;
  }
  .bp3-form-group,
  .bp3-button-group {
    margin-bottom: 1rem;
  }
  & .bp3-form-group:nth-child(7) {
    margin-bottom: 2rem;
  }
  .bp3-button-group {
    border: 1px solid #5c7080;
    border-radius: 3px;
  }
  .bp3-button,
  .bp3-button-group .bp3-button {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
  .bp3-button,
  .bp3-button-group .bp3-button {
    background-image: none;
    box-shadow: none;
  }
  .bp3-input-action {
    height: 100%;
    direction: ltr;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    font-size: 1rem;
  }
  h5 {
    color: #5c7080;
    font-size: 0.8rem;
  }
  h5 .changePageBtn {
    color: ${({ theme }) => theme.text};
    margin-right: 0.3rem;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
  }
  h5 .changePageBtn:hover {
    color: ${({ theme }) => theme.accent};
  }
  .signup-btn {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
    padding: 0.6rem 0;
    box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
    background-image: none;
    transition: all 0.3s ease;
  }
  .cancel-btn {
    background-color: transparent;
    border: 1px solid #606262;
    color: #606262;
    padding: 0.6rem 0;
    box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
    background-image: none;
    transition: all 0.3s ease;
  }
  .signup-btn,
  .cancel-btn {
    flex: 1;
  }
  .signup-btn:hover {
    background-color: ${({ theme }) => darken(0.1, theme.accent)};
  }
  .cancel-btn:hover {
    background-color: transparent;
  }
`;

const Signup = () => {
  const router = useRouter();
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    birthdayDate,
    setBirthdayDate,
    gender,
    setGender,
    password,
    setPassword,
    handleSignUp,
    authLoading,
  } = useAuth();

  const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "نام وارد شده باید بیشتر از 3 حرف باشد")
      .max(50, "نام وارد شده نباید بیشتر از 50 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد")
      .test("alphabets", "نام وارد شده نباید حاوی اعداد باشد", (value) => {
        return !/\d/g.test(value);
      }),
    email: Yup.string()
      .email("فرمت وارد شده صحیح نمی باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    birthdayDate: Yup.date().required("پر کردن این فیلد الزامی می باشد"),
    password: Yup.string()
      .label("Password")
      .required("پر کردن این فیلد الزامی می باشد")
      .min(8, "رمز عبور باید بیشتر از 8 حرف باشد"),
  });

  const emailElem = useRef(null);

  return (
    <Wraper>
      <LoadingSpinner show={authLoading} />
      <Formik
        initialValues={{
          fullName,
          email,
          birthdayDate,
          password,
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSignUp}
      >
        {({
          values,
          handleBlur,
          errors,
          touched,
          setFieldValue,
          handleSubmit,
        }) => (
          <form noValidate className="signup rtl">
            <h5 className="title">ثبت نام</h5>
            <FormGroup
              helperText={
                errors.fullName && touched.fullName ? errors.fullName : ""
              }
              labelInfo="*"
              label="نام و نام خانوادگی"
            >
              <InputGroup
                intent={
                  errors.fullName && touched.fullName
                    ? "danger"
                    : touched.fullName && "success"
                }
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFieldValue("fullName", e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    emailElem.current.focus();
                  }
                }}
                value={values.fullName}
                onBlur={handleBlur("fullName")}
                rightElement={<Icon className="icon" icon="name" size={20} />}
                type="text"
              />
            </FormGroup>
            <FormGroup
              helperText={errors.email && touched.email ? errors.email : ""}
              labelInfo="*"
              label="ایمیل"
            >
              <InputGroup
                intent={
                  errors.email && touched.email
                    ? "danger"
                    : touched.email && "success"
                }
                onChange={(e) => {
                  setEmail(toEnglishDigits(e.target.value));
                  setFieldValue("email", toEnglishDigits(e.target.value));
                }}
                value={values.email}
                onBlur={handleBlur("email")}
                placeholder="ایمیل خود را وارد کنید"
                rightElement={
                  <Icon className="icon" icon="envelope" size={20} />
                }
                type="email"
                inputRef={emailElem}
              />
            </FormGroup>
            <FormGroup
              helperText={
                errors.birthdayDate && touched.birthdayDate
                  ? errors.birthdayDate
                  : ""
              }
              labelInfo="*"
              label="تاریخ تولد"
            >
              <BirthdayPicker
                onChange={(value) => {
                  setBirthdayDate(value.toDate());
                  setFieldValue("birthdayDate", value.toDate());
                }}
                value={values.birthdayDate}
                InputComponent={(value, openCalendar) => {
                  return (
                    <InputGroup
                      intent={
                        errors.birthdayDate && touched.birthdayDate
                          ? "danger"
                          : touched.birthdayDate && "success"
                      }
                      onFocus={openCalendar}
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
            <GenderPicker
              onChange={(value) => {
                setGender(value);
                setFieldValue("gender", value);
              }}
              value={gender}
            />
            <FormGroup
              helperText={
                errors.password && touched.password ? errors.password : ""
              }
              labelFor="register-password"
              labelInfo="*"
              label="رمز عبور"
            >
              <InputGroup
                id="register-password"
                autoComplete="new-password"
                intent={
                  errors.password && touched.password
                    ? "danger"
                    : touched.password && "success"
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldValue("password", e.target.value);
                }}
                value={values.password}
                onBlur={handleBlur("password")}
                placeholder="حداقل 8 کاراکتر"
                rightElement={
                  <Icon className="icon" icon="password" size={20} />
                }
                type="password"
              />
            </FormGroup>
            <div className="d-flex">
              <Button className="signup-btn mr-1" onClick={handleSubmit}>
                ثبت نام
              </Button>
              <Button
                className="cancel-btn ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  router.replace("/");
                }}
              >
                انصراف
              </Button>
            </div>
            <h5 className="mt-3 mb-2">
              قبلا ثبت نام کردی؟
              <Link href="/login">
                <a className="changePageBtn">وارد شو</a>
              </Link>
            </h5>
          </form>
        )}
      </Formik>
    </Wraper>
  );
};

Signup.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Signup;

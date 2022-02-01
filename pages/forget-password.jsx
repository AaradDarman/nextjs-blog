import React, { useContext, useRef, useState } from "react";

import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { darken } from "polished";

import { useAuth } from "../context/auth-context";
import { toEnglishDigits } from "../utils/string-helper";
import Icon from "../components/shared/Icon";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { useRouter } from "next/router";
import MainLayout from "../components/layouts/MainLayout";

const Wraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .forget-password {
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
  .bp3-form-group {
    margin-bottom: 1rem;
  }
  & .bp3-form-group:nth-child(3) {
    margin-bottom: 2rem;
  }
  .bp3-input,
  .bp3-button {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
  .bp3-button,
  .bp3-button {
    background-image: none;
    box-shadow: none;
  }
  .bp3-input {
    padding: 1rem 1.8rem !important;
    border: 1px solid #5c7080;
  }
  .bp3-input::placeholder {
    color: #5c7080;
    font-size: 0.8rem;
  }
  .bp3-form-group label.bp3-label {
    margin-bottom: 10px;
  }
  .bp3-button.bp3-active {
    background-color: ${({ theme }) => theme.darkAccent};
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
  .retrive-btn {
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
  .retrive-btn,
  .cancel-btn {
    flex: 1;
  }
  .retrive-btn:hover {
    background-color: ${({ theme }) => darken(0.1, theme.accent)};
  }
  .cancel-btn:hover {
    background-color: transparent;
  }
`;
const ForgetPassword = () => {
  const router = useRouter();
  const { handleForgetPassword, email, setEmail, authLoading } = useAuth();

  const forgertPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("فرمت وارد شده صحیح نمی باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
  });

  return (
    <Wraper>
      <LoadingSpinner show={authLoading} />
      <Formik
        initialValues={{
          email,
        }}
        validationSchema={forgertPasswordSchema}
        onSubmit={handleForgetPassword}
      >
        {({
          values,
          handleBlur,
          errors,
          touched,
          setFieldValue,
          handleSubmit,
        }) => (
          <form noValidate className="forget-password rtl">
            <h5 className="title">بازیابی رمز عبور</h5>
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
                placeholder="ایمیل خود را وارد کنید"
                value={values.email}
                onBlur={handleBlur("email")}
                rightElement={
                  <Icon className="icon" icon="envelope" size={20} />
                }
                type="email"
              />
            </FormGroup>
            <div className="d-flex">
              <Button className="retrive-btn mr-1" onClick={handleSubmit}>
                بازیابی
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
          </form>
        )}
      </Formik>
    </Wraper>
  );
};

ForgetPassword.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default ForgetPassword;

import React, { useRef, useState } from "react";

import { FormGroup, InputGroup } from "@blueprintjs/core";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";

import Icon from "../components/shared/Icon";
import { useAuth } from "../context/auth-context";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { useRouter } from "next/router";
import MainLayout from "../components/layouts/MainLayout";

const Wraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .change-password {
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
  .save-btn {
    padding: 0.6rem 0;
  }
  .cancel-btn {
    padding: 0.6rem 0;
  }
  .save-btn,
  .cancel-btn {
    flex: 1;
  }
`;
const ChangePassword = () => {
  const router = useRouter();
  const { handleChangePassword, authLoading } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("پر کردن این فیلد الزامی میباشد"),
    newPassword: Yup.string()
      .notOneOf([Yup.ref("oldPassword")], "رمز عبور با رمز فعلی یکسان است")
      .label("newPassword")
      .required("پر کردن این فیلد الزامی میباشد")
      .min(8, "رمز عبور باید بیشتر از 8 حرف باشد"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "رمز عبور مطابقت ندارد")
      .required("پر کردن این فیلد الزامی میباشد"),
  });

  const newPassElem = useRef(null);
  const confirmNewPassElem = useRef(null);

  return (
    <Wraper>
      <LoadingSpinner show={authLoading} />
      <Formik
        initialValues={{
          oldPassword,
          newPassword,
          confirmNewPassword,
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={handleChangePassword}
      >
        {({
          values,
          handleBlur,
          errors,
          touched,
          setFieldValue,
          handleSubmit,
        }) => (
          <form noValidate className="change-password rtl">
            <h5 className="title">تغییر رمز عبور</h5>
            <FormGroup
              helperText={
                errors.oldPassword && touched.oldPassword
                  ? errors.oldPassword
                  : ""
              }
              labelInfo="*"
              label="رمز عبور فعلی"
            >
              <InputGroup
                intent={
                  errors.oldPassword && touched.oldPassword
                    ? "danger"
                    : touched.oldPassword && "success"
                }
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  setFieldValue("oldPassword", e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    newPassElem.current.focus();
                  }
                }}
                value={values.oldPassword}
                onBlur={handleBlur("oldPassword")}
                rightElement={<Icon className="icon" icon="name" size={20} />}
                type="password"
              />
            </FormGroup>
            <FormGroup
              helperText={
                errors.newPassword && touched.newPassword
                  ? errors.newPassword
                  : ""
              }
              labelInfo="*"
              label="رمز عبور جدید"
            >
              <InputGroup
                intent={
                  errors.newPassword && touched.newPassword
                    ? "danger"
                    : touched.newPassword && "success"
                }
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setFieldValue("newPassword", e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    confirmNewPassElem.current.focus();
                  }
                }}
                value={values.newPassword}
                onBlur={handleBlur("newPassword")}
                rightElement={<Icon className="icon" icon="lock" size={20} />}
                type="password"
                inputRef={newPassElem}
              />
            </FormGroup>
            <FormGroup
              helperText={
                errors.confirmNewPassword && touched.confirmNewPassword
                  ? errors.confirmNewPassword
                  : ""
              }
              labelInfo="*"
              label="تایید رمز عبور جدید"
            >
              <InputGroup
                intent={
                  errors.confirmNewPassword && touched.confirmNewPassword
                    ? "danger"
                    : touched.confirmNewPassword && "success"
                }
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  setFieldValue("confirmNewPassword", e.target.value);
                }}
                value={values.confirmNewPassword}
                onBlur={handleBlur("confirmNewPassword")}
                rightElement={<Icon className="icon" icon="lock" size={20} />}
                type="password"
                inputRef={confirmNewPassElem}
              />
            </FormGroup>
            <div className="d-flex">
              <button
                type="button"
                className="m-btn save-btn mr-1"
                onClick={handleSubmit}
              >
                اعمال
              </button>
              <button
                type="button"
                className="m-btn-cancel cancel-btn ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  router.replace("/");
                }}
              >
                انصراف
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Wraper>
  );
};

ChangePassword.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default ChangePassword;

import React, { useState, useEffect } from "react";

import { Button, FormGroup } from "@blueprintjs/core";
import styled from "styled-components";
import ReactInputVerificationCode from "react-input-verification-code";
import { Formik } from "formik";
import * as Yup from "yup";

import { useAuth } from "../context/auth-context";
import CountDownTimer from "./CountDownTimer";
import StyledDialog from "./shared/StyledDialog";
import LoadingSpinner from "./shared/LoadingSpinner";
import { darken } from "polished";

const Wraper = styled.form`
  font-size: 0.8rem;
  position: relative;
  padding: 15px 25px 25px 25px;
  overflow-x: hidden;
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
  .bp3-input,
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
  .verify-btn {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
    padding: 0.6rem 0;
    box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
    background-image: none;
    transition: all 0.3s ease;
  }
  .verify-btn {
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
  .verify-btn,
  .cancel-btn {
    flex: 1;
  }
  .verify-btn:hover {
    background-color: ${({ theme }) => darken(0.1, theme.accent)};
  }
  .cancel-btn:hover {
    background-color: transparent;
  }
  .custom-styles {
    --ReactInputVerificationCode-itemWidth: 2.5rem;
    --ReactInputVerificationCode-itemHeight: 3.5rem;
    direction: ltr;
  }

  .ReactInputVerificationCode__container {
    width: unset;
  }

  .custom-styles .ReactInputVerificationCode__item {
    position: relative;
    color: ${({ theme }) => theme.text};
    font-weight: 500;
  }

  .custom-styles .ReactInputVerificationCode__item,
  .custom-styles .ReactInputVerificationCode__item.is-active {
    box-shadow: none;
  }

  .custom-styles .ReactInputVerificationCode__item:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 2px;
    background-color: #ebebeb;
    transition: background-color 0.2s ease-out;
  }

  .custom-styles .ReactInputVerificationCode__item.is-active:after {
    background-color: ${({ theme }) => theme.accent};
  }
  .timer-container {
    font-size: 2rem;
    min-height: 27.5px;
  }
  .resend-btn {
    background-color: rgba(16, 27, 36, 0.8);
    color: ${({ theme }) => theme.accent};
    border: 1px solid ${({ theme }) => theme.accent};
  }
`;

const VerifyDialog = ({ isOpen, onClose }) => {
  const { handleVerify, handleResendVerificationCode, authLoading } = useAuth();
  const [verificationCode, setVerificationCode] = useState("");

  const VerifySchema = Yup.object().shape({
    verificationCode: Yup.number()
      .required("پر کردن این فیلد الزامی می باشد")
      .typeError("ارقام وارد کنید")
      .test(
        "len",
        "کد فعال سازی باید 6 رقم باشد",
        (val) => val && val.toString().length === 6
      ),
  });

  useEffect(() => {
    setVerificationCode("");
  }, [isOpen]);

  return (
    <StyledDialog
      icon="info-sign"
      onClose={onClose}
      title="فعال سازی حساب کاربری"
      isOpen={isOpen}
    >
      <Formik
        initialValues={{
          verificationCode,
        }}
        validationSchema={VerifySchema}
        onSubmit={handleVerify}
      >
        {({
          values,
          handleBlur,
          errors,
          touched,
          setFieldValue,
          handleSubmit,
        }) => (
          <Wraper noValidate className="verify rtl">
            <LoadingSpinner show={authLoading} />
            <FormGroup
              helperText={
                errors.verificationCode && touched.verificationCode
                  ? errors.verificationCode
                  : ""
              }
              // helperText="وارد کردن قد الزامی می باشد"
              labelInfo="*"
              label="کد فعال سازی"
            >
              <div className="custom-styles">
                <ReactInputVerificationCode
                  length={6}
                  placeholder=""
                  autoFocus
                  onChange={(val) => {
                    setVerificationCode(val);
                    setFieldValue("verificationCode", val);
                  }}
                  value={values.verificationCode}
                  onBlur={handleBlur("verificationCode")}
                />
              </div>
            </FormGroup>
            <CountDownTimer
              handleResendVerificationCode={handleResendVerificationCode}
            />
            <div className="d-flex mt-4">
              <Button className="verify-btn mr-1" onClick={handleSubmit}>
                فعال سازی
              </Button>
              <Button
                className="cancel-btn ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                انصراف
              </Button>
            </div>
          </Wraper>
        )}
      </Formik>
    </StyledDialog>
  );
};

export default VerifyDialog;

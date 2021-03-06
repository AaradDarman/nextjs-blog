import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeader } from "../../adapters/xhr";
import AuthContext from "../../context/AuthContext";
import { logout, setUser } from "../../redux/slices/user";
import { decodeToken } from "../../utils/token-helper";

import Header from "../Header";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken) {
          setHeader(token);
          dispatch(setUser(decodedToken.user));
        } else {
          localStorage.removeItem("token");
          dispatch(logout());
        }
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext>
      <Head>
        <title>Blog Project</title>
        <meta charset="utf-8" />
        <link rel="icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      {/* Header */}
      <Header />
      {children}
    </AuthContext>
  );
};

export default MainLayout;

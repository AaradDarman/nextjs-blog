import React, { useState } from "react";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";

import api from "../adapters/adapter";
import { authContext } from "./auth-context";
import { decodeToken } from "../utils/token-helper";
import { setHeader } from "../adapters/xhr";
import VerifyDialog from "../components/VerifyDialog";
import { setUser, changeProfileImage } from "../redux/slices/user";

const AuthContext = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState();
  const [birthdayDate, setBirthdayDate] = useState("");
  const [gender, setGender] = useState("مرد");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const router = useRouter();
  const background = router.pathname.state && router.pathname.state.background;
  const [uploadProfileLoading, setUploadProfileLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const Baselocation = {
    pathname: "/",
  };

  const handleSignUp = async () => {
    try {
      setAuthLoading(true);
      const { status, data } = await api.signup({
        fullName,
        email,
        birthdayDate,
        gender,
        password,
      });
      if (status === 201) {
        setAuthLoading(false);
        toast.success(data.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
        setUserId(data.userId);
        setShowVerifyModal(true);
      }
    } catch (error) {
      setAuthLoading(false);
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      setAuthLoading(true);
      const { status, data } = await api.resend({ userId: userId });
      if (status === 200) {
        setAuthLoading(false);
        toast.success(data.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
      }
    } catch (error) {
      setAuthLoading(false);
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleVerify = async (verificationCode) => {
    try {
      setAuthLoading(true);
      const { status } = await api.verify(verificationCode);
      if (status === 200) {
        toast.success("اکانت شما با موفقیت فعال شد", {
          position: "bottom-center",
          closeOnClick: true,
        });
        setAuthLoading(false);
        setShowVerifyModal(false);
        router.push("/login");
      }
    } catch (error) {
      setAuthLoading(false);
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleLogin = async (user) => {
    try {
      setAuthLoading(true);
      const { data, status } = await api.login(user);
      if (status === 200) {
        setAuthLoading(false);
        setHeader(data.token);
        console.log(decodeToken(data.token).user);
        localStorage.setItem("token", data.token);
        dispatch(setUser(decodeToken(data.token).user));
        if (decodeToken(data.token).user?.isAdmin) {
          router.replace("/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      setAuthLoading(false);
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleChangePassword = async (inputData) => {
    try {
      setAuthLoading(true);
      inputData.email = user.email;
      const { status } = await api.changePassword(inputData);
      if (status === 200) {
        setAuthLoading(false);
        toast.success("رمز عبور شما با موفقیت تغییر یافت", {
          position: "bottom-center",
          closeOnClick: true,
        });
        router.push(background.pathname);
      }
    } catch (error) {
      setAuthLoading(false);
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleForgetPassword = async (user) => {
    try {
      setAuthLoading(true);
      const { status } = await api.forgetPassword(user);
      if (status === 200) {
        setAuthLoading(false);
        toast.success("رمز عبور جدید برای شما پیامک شد", {
          position: "bottom-center",
          closeOnClick: true,
        });
        router.push("/", { state: { background: Baselocation } });
      }
    } catch (error) {
      setAuthLoading(false);
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleChangeProfileImage = async (imageFile) => {
    setUploadProfileLoading(true);
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const fd = new FormData();
      fd.set("a", compressedFile, `${imageFile.name}`);
      let jpgFormatImg = fd.get("a");
      let formData = new FormData();
      formData.append("profile-image", jpgFormatImg);
      const { data, status } = await api.changeProfileImage(formData);
      if (status === 200) {
        dispatch(changeProfileImage(data.profileImage));
        toast.success("پروفایل با موفقیت تغییر یافت", {
          position: "bottom-center",
          closeOnClick: true,
        });
        setUploadProfileLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
      setUploadProfileLoading(false);
    }
  };

  return (
    <authContext.Provider
      value={{
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
        handleVerify,
        handleLogin,
        handleChangePassword,
        handleForgetPassword,
        handleResendVerificationCode,
        handleChangeProfileImage,
        uploadProfileLoading,
        authLoading,
      }}
    >
      <VerifyDialog
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
      />
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;

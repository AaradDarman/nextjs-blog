import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/user";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    router.replace("/");
    // eslint-disable-next-line
  }, []);
  return null;
};

export default Logout;

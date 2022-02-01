import axios from "axios";
import { toast } from "react-toastify";
import { getToken, decodeToken } from "../../utils/token-helper";

export const setHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axios.defaults.headers.post["Content-Type"] = "application/json";
// try {
//   let tk = getToken();
//   console.log("tk");
//   console.log(tk);
//   if (tk) {
//     console.log("if in xhr");
//     console.log(tk);
//     const decodedToken = decodeToken(tk);
//     if (decodedToken) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${tk}`;
//     } else {
//       console.log("else in xhr");
//       localStorage.removeItem("token");
//     }
//   }
// } catch (error) {
//   console.log(error);
//   console.log("catch in xhr");
//   localStorage.removeItem("token");
// }

axios.interceptors.response.use(null, (error) => {
  const expectetErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectetErrors) {
    toast.error("مشکلی از سمت سرور رخ داده است.", {
      position: "top-right",
      closeOnClick: true,
    });
    return;
  }

  return Promise.reject(error);
});
// eslint-disable-next-line
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

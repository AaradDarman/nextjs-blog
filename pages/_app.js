import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import "bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "react-toastify/dist/ReactToastify.css";

import store from "../redux/store";
import { GlobalStyles } from "../utils/global-stylel";
import { useDarkMode } from "../utils/useDarkMode";
import { lightTheme, darkTheme } from "../utils/themes";

function MyApp({ Component, pageProps }) {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const getLayout = Component.getLayout || ((page) => page);

  if (!componentMounted) {
    return <div />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={themeMode}>
        <ToastContainer theme="dark" />
        <GlobalStyles />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

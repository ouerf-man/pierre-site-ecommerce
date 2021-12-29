import App from "next/app";
import Head from 'next/head'

import Navbar from "../src/components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { initStore } from "../src/state/store";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import "../styles/globals.css";
import "../styles/form.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps, store }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/logo-pierre-3.png" />
      </Head>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
      </Provider>
    </>
  );
}

export default withRedux(initStore)(MyApp);

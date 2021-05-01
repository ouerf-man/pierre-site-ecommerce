import App from "next/app";

import Navbar from '../src/components/Navbar'

import { initStore } from "../src/state/store";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import '../styles/globals.css'
import '../styles/form.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default withRedux(initStore)(MyApp)


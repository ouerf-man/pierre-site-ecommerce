import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { connect } from "react-redux";
import { login } from "../src/state/actions/actionCreator";
import toast from "../src/components/Toast";
import {
  resetPasswordRequest,
  resetPassword,
} from "../src/services/api.account.service";
import WithOutAuth from "../src/components/WithOutAuth";

function Login(props) {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const Router = useRouter();
  const { images, redirectTo, token, id } = Router.query;

  const { isLoggedIn, user, dispatch } = props;
  const [userDetails, setUserDetailsTo] = useState({});
  const [requestPasswordReset, setRequestPasswordReset] = useState(false);
  const handleChange = (e) => {
    const aux = { ...userDetails };
    if (e.target.name == "email") {
      if (e.target.value.split("@").length > 1) {
        aux["email"] = e.target.value;
      } else {
        aux["username"] = e.target.value;
      }
      setUserDetailsTo(aux);
      return;
    }
    aux[e.target.name] = e.target.value;
    setUserDetailsTo(aux);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(userDetails)).then((res) => {
      if (res.success) {
        notify("success", res.message);
        if (redirectTo) {
          Router.replace(redirectTo + "?images=" + images);
        } else {
          Router.replace("reportages");
        }
      } else {
        notify("error", res.message);
      }
    });
  };

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    const res = await resetPasswordRequest(userDetails.email);
    if (res.success) {
      notify("success", res.message);
      Router.replace("/");
    } else {
      notify("error", res.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (userDetails.passwordReset !== userDetails.passwordResetConfirmation) {
      notify("error", "La confirmation de votre mot de passe ne correspond pas !");
      return 
    }
    try {
      const res = await resetPassword({
        userId: id,
        token,
        password: userDetails.passwordReset,
      });
      if (res.success) {
        notify("success", res.message);
        Router.replace("login");
      } else {
        notify("error", res.message);
      }
    } catch (e) {
      notify("error", e.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/logo-pierre-3.png" />
      </Head>
      <main className="row w-100 container-fluid h-100">
        <div className="col-md-4 px-0">
          <div className="left-panel">
            <div className="py-5">
              <h1 className="left-title">
                {token && id
                  ? "Réinitialisez votre mot de passe"
                  : "Authentification"}
              </h1>
            </div>
          </div>
        </div>
        <div className="col-md-8 row align-items-stretch">
          <div className="form-wrapper fadeInDown">
            <div id="formContent">
              <div className="my-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </div>
              <div className="fadeIn first">
                <i className="bi bi-person-circle"></i>
              </div>
              {token && id ? (
                <>
                  <form onSubmit={handlePasswordReset}>
                    <input
                      type="password"
                      id="passwordReset"
                      className="fadeIn third mb-3"
                      name="passwordReset"
                      placeholder="mot de passe"
                      required
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      id="passwordResetConfirmation"
                      className="fadeIn third mb-3"
                      name="passwordResetConfirmation"
                      placeholder="Confirmez votre mot de passe"
                      required
                      onChange={handleChange}
                    />
                    <input
                      type="submit"
                      className="fadeIn fourth"
                      value="Envoyer"
                    />
                  </form>

                  <div id="formFooter"></div>
                </>
              ) : requestPasswordReset ? (
                <>
                  <form onSubmit={handlePasswordResetRequest}>
                    <input
                      type="text"
                      id="login"
                      className="fadeIn second"
                      name="email"
                      placeholder="email"
                      required
                      onChange={handleChange}
                    />
                    <input
                      type="submit"
                      className="fadeIn fourth"
                      value="Envoyer un email"
                    />
                  </form>

                  <div id="formFooter"></div>
                </>
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      id="login"
                      className="fadeIn second"
                      name="email"
                      placeholder="email"
                      required
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      id="password"
                      className="fadeIn third mb-3"
                      name="password"
                      placeholder="mot de passe"
                      required
                      onChange={handleChange}
                    />
                    <input
                      type="submit"
                      className="fadeIn fourth"
                      value="Authentification"
                    />
                  </form>

                  <div id="formFooter">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setRequestPasswordReset(true);
                      }}
                      className="underlineHover forgotPassword"
                      id="forgotPassword"
                      href="#"
                    >
                      Mot de passe oublié?
                    </a>
                    <hr />
                    <Link
                      href={{
                        pathname: "/sign-up",
                        query: redirectTo ? { redirectTo, images } : null,
                      }}
                    >
                      <a
                        className="underlineHover d-inline-block"
                        id="forgotPassword"
                      >
                        Créer un compte
                      </a>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps)(WithOutAuth(Login));

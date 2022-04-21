import Head from "next/head";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { signUp } from "../src/state/actions/actionCreator";
import toast from "../src/components/Toast";
import countriesJson from "countries-code";
import WithOutAuth from "../src/components/WithOutAuth";
function Signup(props) {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const { countries, isLoggedIn, user, dispatch } = props;
  const [userDetails, setUserDetailsTo] = useState({});
  const handleChange = (e) => {
    const aux = { ...userDetails };
    aux[e.target.name] = e.target.value;
    setUserDetailsTo(aux);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkFields(userDetails)) {
      notify("error", "Code TVA sous format AA00000000000");
      return false;
    }
    dispatch(signUp(userDetails)).then((res) => {
      if (res.success) {
        notify("success", res.message);
      } else {
        notify("error", res.message);
      }
    });
  };

  const checkFields = (body) => {
    if (
      !(body.tva && /^[A-Z]{2}[0-9]{11}$/.test(body.tva.trim())) ||
      !countries
        .map((e) => e.alpha2)
        .includes(`${body.tva.trim()[0]}${body.tva.trim()[1]}`)
    ) {
      return false;
    }

    return true;
  };
  return (
    <>
      <Head>
        <title>Créer mon compte</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/logo-pierre-3.png" />
      </Head>
      <main className="row w-100 container-fluid h-100">
        <div className="col-md-4 px-0">
          <div className="left-panel">
            <div className="py-5">
              <h1 className="left-title">Créer mon compte</h1>
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
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  required
                  id="firstName"
                  className="fadeIn first"
                  name="firstName"
                  placeholder="prenom"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  required
                  id="lastName"
                  className="fadeIn first"
                  name="lastName"
                  placeholder="nom"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  required
                  id="company"
                  className="fadeIn first"
                  name="company"
                  placeholder="entreprise"
                  onChange={handleChange}
                />
                <select
                  required
                  name="country"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleChange}
                >
                  <option defaultValue disabled style={{ color: "#ccc" }}>
                    Pays
                  </option>
                  {countries.map((e, i) => {
                    return (
                      <option key={i} value={e.country_name_fr}>
                        {e.country_name_fr}
                      </option>
                    );
                  })}
                </select>
                <input
                  required
                  type="text"
                  id="rue"
                  className="fadeIn second"
                  name="adress"
                  placeholder="numero et nom de rue"
                  onChange={handleChange}
                />
                <input
                  required
                  type="text"
                  id="appartement"
                  className="fadeIn second"
                  name="appartement"
                  placeholder="Appartement, bureau, etc."
                  onChange={handleChange}
                />
                <input
                  required
                  type="text"
                  id="region"
                  className="fadeIn second"
                  name="region"
                  placeholder="Région / Département"
                  onChange={handleChange}
                />
                <input
                  required
                  type="text"
                  id="codePostal"
                  className="fadeIn second"
                  name="zipCode"
                  placeholder="Code postal"
                  onChange={handleChange}
                />
                <input
                  required
                  type="text"
                  id="telephone"
                  className="fadeIn third"
                  name="phone"
                  placeholder="Téléphone"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  id="tva"
                  className="fadeIn third"
                  name="tva"
                  placeholder="Code TVA intracommunautaire de l'entreprise"
                  onChange={handleChange}
                />
                <input
                  required
                  type="text"
                  id="identifiant"
                  className="fadeIn third"
                  name="username"
                  placeholder="Identifiant"
                  onChange={handleChange}
                />
                <input
                  required
                  type="email"
                  id="login"
                  className="fadeIn fourth"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                />
                <input
                  required
                  type="password"
                  id="password"
                  className="fadeIn fourth mb-3"
                  name="password"
                  placeholder="mot de passe"
                  onChange={handleChange}
                />
                <input
                  required
                  type="submit"
                  className="fadeIn fourth"
                  value="M'enregistrer"
                />
              </form>

              <div id="formFooter">
                <Link href="/login">
                  <a
                    className="underlineHover d-inline-block"
                    id="forgotPassword"
                  >
                    connexion
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const temp = countriesJson.allCountriesList();
  return {
    props: {
      countries: temp,
    },
  };
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps)(WithOutAuth(Signup));

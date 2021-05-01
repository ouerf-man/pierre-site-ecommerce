import Head from 'next/head'
import Link from 'next/link'

export default function Signup({ countries }) {
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
                            <h1 className="left-title">Créer mon compte</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 row align-items-stretch">
                    <div className="form-wrapper fadeInDown">
                        <div id="formContent">
                            <div className="my-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </div>
                            <div className="fadeIn first">
                                <i className="bi bi-person-circle"></i>
                            </div>
                            <form>
                                <input type="text" id="prenom" className="fadeIn first" name="prenom" placeholder="prenom" />
                                <input type="text" id="nom" className="fadeIn first" name="nom" placeholder="nom" />
                                <input type="text" id="entreprise" className="fadeIn first" name="entreprise" placeholder="entreprise" />
                                <select class="form-select" aria-label="Default select example">
                                    <option selected disabled style={{ color: '#ccc' }}>Pays</option>
                                    {
                                        countries.map((e, i) => {
                                            return <option key={i} value={e.translations.fr}>{e.translations.fr}</option>
                                        })
                                    }
                                </select>
                                <input type="text" id="rue" className="fadeIn second" name="rue" placeholder="numero et nom de rue" />
                                <input type="text" id="appartement" className="fadeIn second" name="entreprise" placeholder="Appartement, bureau, etc." />
                                <input type="text" id="region" className="fadeIn second" name="entreprise" placeholder="Région / Département" />
                                <input type="text" id="codePostal" className="fadeIn second" name="entreprise" placeholder="Code postal" />
                                <input type="text" id="tva" className="fadeIn third" name="entreprise" placeholder="Téléphone" />
                                <input type="text" id="telephone" className="fadeIn third" name="entreprise" placeholder="Code TVA intracommunautaire de l'entreprise" />
                                <input type="text" id="identifiant" className="fadeIn third" name="entreprise" placeholder="Identifiant" />
                                <input type="text" id="login" className="fadeIn fourth" name="login" placeholder="email" />
                                <input type="text" id="password" className="fadeIn fourth mb-3" name="login" placeholder="mot de passe" />
                                <input type="submit" className="fadeIn fourth" value="M'enregistrer" />
                            </form>

                            <div id="formFooter">
                                <Link href="/login">
                                    <a className="underlineHover d-inline-block" id="forgotPassword">connexion</a>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch("https://restcountries.eu/rest/v2/all")
    const countries = await res.json();
    return {
        props: {
            countries
        }
    }
}

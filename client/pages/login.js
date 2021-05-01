import Head from 'next/head'
import Link from 'next/link'

export default function Login() {
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
                            <h1 className="left-title">Identification</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 row align-items-stretch">
                    <div className="form-wrapper fadeInDown">
                        <div id="formContent">
                            <div className="my-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </div>
                            <div className="fadeIn first">
                                <i className="bi bi-person-circle"></i>
                            </div>
                            <form>
                                <input type="text" id="login" className="fadeIn second" name="login" placeholder="email" />
                                <input type="text" id="password" className="fadeIn third mb-3" name="login" placeholder="mot de passe" />
                                <input type="submit" className="fadeIn fourth" value="Identification" />
                            </form>

                            <div id="formFooter">
                                <a className="underlineHover forgotPassword" id="forgotPassword" href="#">mot de passe oublié?</a>
                                <hr />
                                <Link href="/sign-up">
                                    <a className="underlineHover d-inline-block" id="forgotPassword">Créer un compte</a>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

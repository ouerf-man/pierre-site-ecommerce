import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/EspaceClient.module.css'
import * as api from "../src/services/api.account.service"
import { connect } from "react-redux"

import WithAuth from "../src/components/WithAuth"

import { useEffect, useState } from 'react'
const downloadButtonStyle = {
    width: '100px',
    height: '70px',
    backgroundColor: '#ed1c24',
    color: '#fff',
    borderRadius: "10px",
    padding: 15,
    cursor: 'pointer'
}


function EspaceClient(props) {
    const [transactionsArray, setTransactionsTo] = useState(null)
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);
    useEffect(async () => {
        const transactions = await api.getTransactions(props.user.id)
        setTransactionsTo(transactions.data)
    }, [])

    const download = (url, name) => {
        if (!url) {
            throw new Error("Resource URL not provided! You need to provide one");
        }
        setFetching(true);
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                setFetching(false);
                const blobURL = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobURL;
                a.style = "display: none";

                if (name && name.length) a.download = name;
                document.body.appendChild(a);
                a.click();
            })
            .catch(() => setError(true));
    };

    return (
        <>
            <Head>
                <title>Pierre Gassin | Espace Editeur</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <main className="row w-100 overflow-hidden mx-0">
                <div className="col-md-4 px-0">
                    <div className="left-panel">
                        <div className="py-5">
                            <h1 className="left-title">Espace Editeur</h1>
                        </div>
                    </div>
                </div>
                <div className="col align-items-stretch pr-0 overflow-hidden my-5">
                    <h2>
                        Liste des images
                    </h2>
                    {
                        transactionsArray &&
                        transactionsArray.map(e => <div key={e._id}>
                            <h4 className="mt-5">{e.images[0].reportage.title}</h4>
                            {
                                e.images.map((img, i) => (
                                    <div className="d-flex align-items-center">
                                        <div style={{ width: 250, height: 250, position: 'relative', marginBottom: '25px', display: 'inline-block' }}>
                                            <Image src={img.tagged}
                                                layout='fill'
                                                objectFit='cover'
                                                objectPosition='50% 50%'>
                                            </Image>
                                        </div>
                                        <div className="d-inline-block ml-5 d-flex flex-column align-items-center justify-content-center">
                                            <p className="mt-0">5680x3781</p>
                                            <p>
                                                <a style={downloadButtonStyle} onClick={() => download(img.size1, `${e.images[0].reportage.title}${i}taille1`)}>Télecharger</a>
                                            </p>
                                        </div>
                                        <div className="d-inline-block ml-5 d-flex flex-column align-items-center justify-content-center">
                                            <p className="mt-0">4252x2835</p>
                                            <p>
                                                <a style={downloadButtonStyle} onClick={() => download(img.size2, `${e.images[0].reportage.title}${i}taille2`)}>Télecharger</a>
                                            </p>
                                        </div>
                                        <div className="d-inline-block ml-5 d-flex flex-column align-items-center justify-content-center">
                                            <p className="mt-0">2126x1417</p>
                                            <p>
                                                <a style={downloadButtonStyle} onClick={() => download(img.size3, `${e.images[0].reportage.title}${i}taille3`)}>Télecharger</a>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>)
                    }

                </div>
            </main>
        </>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
});


export default connect(mapStateToProps)(WithAuth(EspaceClient));
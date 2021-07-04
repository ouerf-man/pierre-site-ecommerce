import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/EspaceClient.module.css'
import * as api from "../src/services/api.account.service"
import { connect } from "react-redux"

import WithAuth from "../src/components/WithAuth"

import { useEffect, useState } from 'react'
function EspaceClient(props) {
    const [transactionsArray, setTransactionsTo] = useState(null)
    useEffect(async () => {
        const transactions = await api.getTransactions(props.user.id)
        setTransactionsTo(transactions.data)
    }, [])
    return (
        <>
            <Head>
                <title>Pierre Gassin | Espace Client</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <main className="row w-100 overflow-hidden mx-0">
                <div className="col-md-4 px-0">
                    <div className="left-panel">
                        <div className="py-5">
                            <h1 className="left-title">Espace Client</h1>
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
                                e.images.map(img => (
                                    <div className="d-flex align-items-center">
                                        <div style={{ width: 100, height: 100, position: 'relative', marginBottom: '25px', display: 'inline-block' }}>
                                            <Image src={img.tagged}
                                                layout='fill'
                                                objectFit='cover'
                                                objectPosition='50% 50%'>
                                            </Image>
                                        </div>
                                        <p className="d-inline-block ml-5">
                                            <a href={img.size1}>{img.size1}</a>
                                        </p>
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
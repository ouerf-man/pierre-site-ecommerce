import Head from 'next/head'

export default function EspaceClient() {
    return (
        <>
            <Head>
                <title>Pierre Gassin |</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <main className="row w-100 container-fluid">
                <div className="col-md-4 left-panel px-0">
                    <div className="py-5">
                        <h1 className="left-title">Espace client</h1>
                    </div>
                </div>
                <div className="col-md-8 row align-items-stretch">
                </div>
            </main>
        </>
    )
}

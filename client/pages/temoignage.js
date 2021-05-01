import Head from 'next/head'
import { Carousel, Image } from "react-bootstrap"

const temoignageContainer = {
    height: '100vh',
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: 'column'
}
const temoignageText = {
    color: '#535353',
    fontSize: 14,
    width: '70%',
    textAlign: 'center',
    marginTop: 20
}

const TemoignageTitle = {
    color: '#000',
    fontSize: '1.5rem',
    borderBottom: "1px solid rbga(0,0,0,.5)",
    paddingBottom:5
}
export default function Temoignage() {
    const temoignage = [
        {
            image: '/assets/images/raed.jpg',
            name: "Raed Ouerfelli",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
        },
        {
            image: '/assets/images/raed.jpg',
            name: "Raed Ouerfelli",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
        },
        {
            image: '/assets/images/raed.jpg',
            name: "Raed Ouerfelli",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
        }
    ]
    return (
        <>
            <Head>
                <title>Pierre Gassin | Reportages</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <main className="row w-100 overflow-hidden mx-0">
                <div className="col-md-4 px-0">
                    <div className="left-panel">
                        <div className="py-5">
                            <h1 className="left-title">Témoignages</h1>
                        </div>
                    </div>
                </div>
                <div className="col align-items-stretch pr-0 overflow-hidden">
                    <Carousel>
                        {
                            temoignage.map((e, i) => (
                                <Carousel.Item key={i}>
                                    <div className="w-100 col-12" style={temoignageContainer}>
                                        <Image src={e.image} width={200} roundedCircle />
                                        <p style={temoignageText}>
                                            {e.text}
                                        </p>
                                        <h2 style={TemoignageTitle}>
                                            {e.name}
                                        </h2>
                                    </div>
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </div>
            </main>
        </>
    )
}

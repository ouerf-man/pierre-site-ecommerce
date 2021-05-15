import { useState } from "react";
import Link from 'next/link'

const buttonStyle = {
    "fontSize": "19" + "px",
    "cursor": "pointer",
    "color": "#fff",
    position: 'absolute',
    right: '30px',
    backgroundColor: "#ed1c24",
    borderRadius: '50%',
    zIndex: 100000,
    width: 45,
    height: 45,
    transitionDuration: ".5s",
    tansitionProperty: "all"
}

function Navbar() {
    const [navWidth, setNavWidth] = useState(0)
    const [buttonTop, setButtonTop] = useState(10)
    const openNav = () => {
        setNavWidth(180)
        setButtonTop(-50)
    }

    const closeNav = () => {
        setButtonTop(10)
        setNavWidth(0)
    }


    return (
        <>

            <span style={{...buttonStyle, top: buttonTop}} onMouseOver={openNav} className='d-flex align-items-center justify-content-center'>&#9776;</span>
            <div id="mySidenav" className="sidenav" onMouseLeave={closeNav} style={{ width: navWidth }}>
                {/*<a className="closebtn" onClick={closeNav}>&times;</a>*/}
                <Link href="/">
                    <a>Acceuil</a>
                </Link>
                <Link href="/reportages">
                    <a>Reportages</a>
                </Link>
                <Link href="/login">
                    <a>Espace client</a>
                </Link>
                <Link href="/temoignage">
                    <a>Témoignages</a>
                </Link>
                <Link href="/blog">
                    <a>Blog</a>
                </Link>
                <Link href="/contactez-moi">
                    <a>Contact</a>
                </Link>
            </div>
        </>
    )
}

export default Navbar;
import { useState } from "react";
import Link from 'next/link'
import { deAuthenticateAction } from "../../state/actions/actionCreator"
import { connect } from "react-redux"
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

function Navbar(props) {
    const [navWidth, setNavWidth] = useState(0)
    const [buttonTop, setButtonTop] = useState(10)
    const openNav = () => {
        setNavWidth(150)
        setButtonTop(-50)
    }

    const closeNav = () => {
        setButtonTop(10)
        setNavWidth(0)
    }


    return (
        <>

            <span style={{ ...buttonStyle, top: buttonTop }} onMouseOver={openNav} className='d-flex align-items-center justify-content-center'>&#9776;</span>
            <div id="mySidenav" className="sidenav" onMouseLeave={closeNav} style={{ width: navWidth }}>
                {/*<a className="closebtn" onClick={closeNav}>&times;</a>*/}
                {props.isLoggedIn && <h6 className="text-white text-center">{props.user.last_name} {props.user.first_name}</h6>}
                <Link href="/">
                    <a>Accueil</a>
                </Link>
                <Link href="/reportages">
                    <a>Reportages</a>
                </Link>
                <Link href={props.isLoggedIn ? "espace-client" : "/login"}>
                    <a>Espace éditeur</a>
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
                {
                    props.isLoggedIn &&
                    <div className="d-flex justify-content-center">
                        <button onClick={props.deAuthenticateAction} style={{ backgroundColor: '#fff', marginTop: 20, marginLeft: "auto", marginRight: 'auto' }}
                            className="btn btn-white">
                            Se déconnecter
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
});
const mapDispatchToProps = {
    deAuthenticateAction: deAuthenticateAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
import styles from "../styles/About.module.css"
export default function About() {
    return (
        <main className="d-flex flex-column flex-md-row">
            <div className="col-xs-12 col-md-4 px-0">
                <div className="left-panel" style={{ backgroundImage: "url('/assets/images/pierre.jpg')", backgroundPosition: "center", backgroundSize: "cover" }}>
                    <div className="py-5">
                    </div>
                </div>
            </div>
            <div className={`${styles.right} col`}>
                <form className="text-center">
                    <div className="form-group">
                        <label for="name">Nom complet <small>(Requis)</small></label>
                        <input type="text" className="form-control d-block w-100" id="name" required />
                    </div>
                    <div className="form-group">
                        <label for="email">Email address <small>(Requis)</small></label>
                        <input type="email" className="form-control d-block w-100" id="email" placeholder="nom@exemple.com"  required />
                    </div>
                    <div className="form-group">
                        <label for="sujet">Sujet <small>(Requis)</small></label>
                        <input type="text" className="form-control d-block w-100" id="sujet" required />
                    </div>
                    <div className="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" className="d-block w-100" rows="3"></textarea>
                    </div>
                    <input type="button" value="Envoi" />
                </form>
            </div>
        </main>
    )
}
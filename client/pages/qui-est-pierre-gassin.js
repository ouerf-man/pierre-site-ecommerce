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
            <div className={`${styles.right}`}>
                <h1>
                    Qui est Pierre Gassin?
                </h1>
                <p>
                    Après avoir créé et dirigé 22 ans le Centre de formation professionnel et galerie d’art Iris à Paris, Pierre Gassin, méditerranéen convaincu, décide de s’établir en Tunisie, où il aime retrouver la douceur de vivre méridionale.
                </p>
                <p>
                    De Djerba à Tunis, il a été profondément marqué par ses 8 ans passés à Sfax. Il y a d’ailleurs créé le Palais de la Photographie, dans le cadre de Sfax, capitale de la culture arabe.
                </p>
                <p>
                    Après avoir organisé des expositions collectives avec les jeunes sfaxiens (Architectures de Sfax – Fondouk Haddadine), Sfax d’Hier et d’Aujourd’hui (Maison de France), Gafsa d’Hier et d’Aujourd’hui (Maison de France), Demain (Palais de la Photographie), Vestiges et Traces (Cathédrale de Sfax), voici sa première exposition personnelle tunisienne : Embarquement Sfax.
                </p>
                <p>
                    Aujourd’hui associé à la journaliste Amel Djait pour 1001 Tunisie, ils sont également éditeurs à Sfax (Editions 55).
                </p>
                <h2>
                    Qui est Pierre Gassin?
                </h2>
            </div>
        </main>
    )
}
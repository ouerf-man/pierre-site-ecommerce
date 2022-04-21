import { useState } from "react";
import styles from "../styles/About.module.css";
import { TiTick } from "react-icons/ti";
import { contact } from "../src/services/api.account.service";

export default function About() {
  const [messageDetails, setMessageDetails] = useState();
  const [isSent,setIsSentTo] = useState(false);
  const [erro, setError] = useState(null);
  const handleChange = (e) => {
    const aux = { ...messageDetails };
    aux[e.target.name] = e.target.value;
    setMessageDetails(aux);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await contact(messageDetails)
        if(res.success){
            setIsSentTo(true)
        }
    }catch(e){
        setError(e);
    }
  };

  return (
    <main className="d-flex flex-column flex-md-row">
      <div className="col-xs-12 col-md-4 px-0">
        <div
          className="left-panel"
          style={{
            backgroundImage: "url('/assets/images/pierre.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="py-5"></div>
        </div>
      </div>
      <div className={`${styles.right} col`}>
        {!isSent ? (
          <form className="text-center" onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="name">
                Nom complet <small>(Requis)</small>
              </label>
              <input
                type="text"
                className="form-control d-block w-100"
                id="name"
                name="author"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label for="email">
                Email address <small>(Requis)</small>
              </label>
              <input
                type="email"
                className="form-control d-block w-100"
                id="email"
                name="email"
                placeholder="nom@exemple.com"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label for="sujet">
                Sujet <small>(Requis)</small>
              </label>
              <input
                type="text"
                className="form-control d-block w-100"
                name="subject"
                id="sujet"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                className="d-block w-100"
                name="message"
                rows="3"
                onChange={handleChange}
              ></textarea>
            </div>
            <input type="submit" value="Envoi" />
          </form>
        ) : (
          <div className="d-flex flex-column justify-content-center h-75">
            <p>
              <TiTick color="green" size={30} /> Message envoyé avec succés. Nous vous réponderons dans les plus bref délais.
            </p>
            <p>
                Merci pour votre visite.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

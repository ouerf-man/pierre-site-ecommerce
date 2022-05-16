import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Reportage.module.css";
import { connect } from "react-redux";
import { useState } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { getBySlug } from "../../src/services/api.reportage.service";

const buttonStyle = {
  cursor: "pointer",
  position: "fixed",
  right: "80px",
  color: "#ed1c24",
  backgroundColor: "white",
  borderRadius: "5%",
  fontSize: 12,
  padding: 7,
  zIndex: 100000,
  transitionDuration: ".5s",
  tansitionProperty: "all",
};

function Home(props) {
  const reportage = props.reportage;
  const [selectedImages, setSelectedImages] = useState([]);
  const [finalQuery, setFinalQuery] = useState("");
  const [show, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectUnselect, setSelectUnselect] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (i) => {
    setShow(true);
    setSelectedIndex(i);
  };

  const handleSelect = (selectedIndex, e) => {
    setSelectedIndex(selectedIndex);
  };

  const handleSelectImage = (e, item) => {
    let items = [...selectedImages];
    var ids = items.map((ele) => ele.id);
    if (e.target.checked) {
      items.push(item);
    } else {
      var index = ids.indexOf(item.id);
      items.splice(index, 1);
    }

    setSelectedImages(items);
    setFinalQuery(
      items.reduce((acc, cv) => {
        if (acc == "") {
          return acc + cv._id;
        }
        return acc + "-" + cv._id;
      }, "")
    );
  };

  const handleSelectAll = () => {
    if (!selectUnselect) {
      setSelectedImages(reportage.images);
      setFinalQuery(
        reportage.images.reduce((acc, cv) => {
          if (acc == "") {
            return acc + cv._id;
          }
          return acc + "-" + cv._id;
        }, "")
      );
    } else {
      setSelectedImages([]);
      setFinalQuery("");
    }
    setSelectUnselect(!selectUnselect);
  };
  return (
    <>
      <span
        onClick={handleSelectAll}
        style={{ ...buttonStyle, top: 10 }}
        className="d-flex align-items-center justify-content-center"
      >
        {!selectUnselect ? "Sélectionner toutes les images." : "Désélectionner toutes les images."}
      </span>
      <Head>
        <title>Pierre Gassin | Korba Passementerie</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/logo-pierre-3.png" />
      </Head>
      <main className="row w-100 mx-0 overflow-hidden">
        <div className="col-xs-12 col-md-4 px-0 left-panel-parent">
          <div className="left-panel text-center">
            <div className="py-5">
              <h1 className="left-title">{reportage.title}</h1>
              <div
                className="left-paragraph"
                dangerouslySetInnerHTML={{ __html: reportage.description }}
              ></div>
              {selectedImages.length > 0 && (
                <p className="mt-5 left-paragraph">
                  {selectedImages.length} images selectionnés
                </p>
              )}
              {selectedImages.length > 0 &&
                (props.isLoggedIn ? (
                  <Link
                    href={{
                      pathname: "/payment",
                      query: { images: finalQuery },
                    }}
                  >
                    <button className="btn btn-danger mt-5 text-white">
                      Acquisition de droit
                    </button>
                  </Link>
                ) : (
                  <Link
                    href={{
                      pathname: "/login",
                      query: { images: finalQuery, redirectTo: "/payment" },
                    }}
                  >
                    <button className="btn btn-danger mt-5 text-white">
                      {props.isLoggedIn
                        ? "Acquisition de droit"
                        : "IDENTIFICATION"}
                    </button>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className={`px-md-0 overflow-hidden col ${styles.photos} pl-0`}>
          {reportage.images.map((e, i) => (
            <div className="position-relative" key={i}>
              <img
                onContextMenu={(e) => e.preventDefault()}
                key={i}
                src={e.tagged}
                alt={reportage.title}
                onClick={() => handleShow(i)}
              />
              <input
                type="checkbox"
                checked={selectedImages.map((e) => e._id).includes(e._id)}
                onChange={(evt) => handleSelectImage(evt, e)}
                className={`${styles.checkbox} form-check-input`}
              />
            </div>
          ))}
        </div>
      </main>

      <Modal
        show={show}
        dialogClassName="modal-dialog-reportage"
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Carousel activeIndex={selectedIndex} onSelect={handleSelect}>
            {reportage.images.map((e, i) => (
              <Carousel.Item key={i}>
                <div className="reportage-modal-image-container mx-auto position-relative">
                  <img
                    onContextMenu={(e) => e.preventDefault()}
                    key={i}
                    src={e.tagged}
                    alt={reportage.title}
                    className="d-block h-100"
                  />
                  <input
                    type="checkbox"
                    checked={selectedImages.map((e) => e._id).includes(e._id)}
                    onChange={(evt) => handleSelectImage(evt, e)}
                    className={`${styles.checkbox} form-check-input`}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const result = await getBySlug(slug);
  return {
    props: {
      reportage: result.data,
    }, // will be passed to the page component as props
  };
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Home);

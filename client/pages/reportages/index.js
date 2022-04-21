import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Reportage.module.css";
import {
  getReportages,
  filterReportage,
} from "../../src/services/api.reportage.service";
import { useState } from "react";
export default function Home(props) {
  const reportages = props.reportages;
  const [filterResult, setFilterResultTo] = useState(null);
  const [searchLoading, setSearchLoadtingTo] = useState(false);
  async function filterFunction(e) {
    try {
      setSearchLoadtingTo(true);
      console.log(e.target.value);
      const reps = await filterReportage(e.target.value);
      if (reps) {
        setSearchLoadtingTo(false);
      }
      setFilterResultTo(reps.data);
    } catch (e) {
      setSearchLoadtingTo(false);
      setFilterResultTo(null);
    }
  }

  return (
    <>
      <Head>
        <title>Pierre Gassin | Reportages</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/logo-pierre-3.png" />
      </Head>
      <main className="row w-100 flex-column flex-md-row  overflow-hidden mx-0">
        <div className="col-xs-12 col-md-4 px-0 left-panel-parent">
          <div className="left-panel">
            <div className="py-5">
              <div className={styles.search}>
                <form action="/action_page.php">
                  <div id="myDropdown" class={styles.dropdownContent}>
                    <input
                      type="text"
                      placeholder="Recherche.."
                      id="myInput"
                      className={styles.myInputId}
                      onKeyUp={(e) => filterFunction(e)}
                    />
                    {searchLoading && (
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                    {filterResult &&
                      filterResult.map((e) => (
                        <a className={styles.searchItem} href="#about">
                          {e.title}
                        </a>
                      ))}
                  </div>
                </form>
              </div>
              <h1 className="left-title" style={{ marginTop: 80 }}>
                Reportages
              </h1>
            </div>
          </div>
        </div>
        <div className="col col-xs-12 row justify-content-around align-items-stretch pr-0 overflow-hidden">
          {reportages.map((e, i) => (
            <Link href={`/reportages/${e.slug}`} key={i}>
              <div
                className={`col-xs-5 col-md-4 px-0 ${styles.reportageItem} h-auto`}
              >
                {e.cover && (
                  <Image
                    src={e.cover}
                    alt={e.title}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
                <div className={`${styles.overlay}`}>
                  <h2>{e.title}</h2>
                  <hr />
                  <div
                    dangerouslySetInnerHTML={{ __html: e.description }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const result = await getReportages();
  return {
    props: {
      reportages: result.success ? result.data : [],
    }, // will be passed to the page component as props
  };
}

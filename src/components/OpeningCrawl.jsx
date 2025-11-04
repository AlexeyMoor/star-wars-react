import {base_url} from "../utils/constants.js";
import {useEffect, useState} from "react";


const OpeningCrawl = () => {
  const [openingCrawl, setOpeningCrawl] = useState();
  useEffect(() => {
    const episode = Math.floor(Math.random() * 6) + 1;
    fetch(`${base_url}/v1/films/${episode}`)
      .then(response => response.json())
      .then(data => setOpeningCrawl(data.opening_crawl))
      .catch(() => setOpeningCrawl('Error on fetching opening crawl.'));
    // return () => console.log('component OpeningCrawl unmounted');
  }, []);

  if (openingCrawl) {
    return (
      <p className="far-galaxy fs-2 lh-2">{openingCrawl}</p>
    );
  } else {
    return (
      <p className="far-galaxy fs-2 lh-2">
        <span className={'spinner-border spinner-border-sm'}></span>
        <span className={'spinner-grow spinner-border-sm'}> Loading...</span>
      </p>
    );
  }
};

export default OpeningCrawl;
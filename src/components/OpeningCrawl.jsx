import {base_url} from "../utils/constants.js";
import {useEffect, useState} from "react";
import Text from "./ui/Text.jsx";


const OpeningCrawl = () => {
  const [openingCrawl, setOpeningCrawl] = useState();
  useEffect(() => {
    // sesseionStorage это хранилище, которое очищается при закрытии вкладки браузера или окна браузера.
    const opening_crawl = sessionStorage.getItem("opening_crawl");
    if (opening_crawl) {
      setOpeningCrawl(opening_crawl);
    } else {
      const episode = Math.floor(Math.random() * 6) + 1;
      fetch(`${base_url}/v1/films/${episode}`)
        .then(response => response.json())
        .then(data => {
          setOpeningCrawl(data.opening_crawl);
          sessionStorage.setItem("opening_crawl", data.opening_crawl);
        })
        .catch(() => setOpeningCrawl('Error on fetching opening crawl.'));
    }
  }, []);

  if (openingCrawl) {
    return (
      <Text>{openingCrawl}</Text>
    );
  } else {
    return (
      <p className="text-2xl">
        <span className={'spinner-border spinner-border-sm'}></span>
        <span className={'spinner-grow spinner-border-sm'}> Loading...</span>
      </p>
    );
  }
};

export default OpeningCrawl;
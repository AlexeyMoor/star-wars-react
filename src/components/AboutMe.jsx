import {useEffect, useState} from "react";
import {base_url, period_months} from "../utils/constants.js";
import hero from "../assets/main.jpg";

const AboutMe = () => {
  const [aboutMe, setAboutMe] = useState();

  useEffect(() => {
    const about_me = JSON.parse(localStorage.getItem("about_me"));
    if (about_me && ((Date.now() - about_me.timestamp) < period_months)) {
      setAboutMe(about_me.payload);
    } else {
      fetch(`${base_url}/v1/peoples/1`)
        .then(response => response.json())
        .then(data => {
          setAboutMe(data);
          localStorage.setItem("about_me", JSON.stringify({payload: data, timestamp: Date.now()}));
        })
        .catch(() => setAboutMe('Error on fetching about me!'));
    }
  }, []);

  if (aboutMe) {
    return (
      <div className="card w-50 mx-auto my-4 p-4" style={{backgroundColor: '#eedb00'}}>
        <div className="text-center">
          <h2 className="mb-3">{aboutMe.name}</h2>
          <img src={hero} alt={aboutMe.name} className="w-25 mb-4 rounded-3 shadow" />
        </div>
        <div className="list-group list-group-flush rounded-3">
          <li className="list-group-item">Gender: {aboutMe.gender}</li>
          <li className="list-group-item">Skin color: {aboutMe.skin_color}</li>
          <li className="list-group-item">Hair color: {aboutMe.hair_color}</li>
          <li className="list-group-item">Height: {aboutMe.height} cm</li>
          <li className="list-group-item">Mass: {aboutMe.mass} kg</li>
          <li className="list-group-item">Birth year: {aboutMe.birth_year}</li>
          <li className="list-group-item">Eye color: {aboutMe.eye_color}</li>
          <li className="list-group-item">Homeworld ID: {aboutMe.homeworld}</li>
          <li className="list-group-item">Created: {new Date(aboutMe.created).toLocaleString()}</li>
          <li className="list-group-item">Edited: {new Date(aboutMe.edited).toLocaleString()}</li>
        </div>
      </div>
    );
  } else {
    return (
      <p className="far-galaxy fs-2 lh-2">
        <span className={'spinner-border spinner-border-sm'}></span>
        <span className={'spinner-grow spinner-border-sm'}>Loading...</span>
      </p>
    );
  }
};

export default AboutMe;
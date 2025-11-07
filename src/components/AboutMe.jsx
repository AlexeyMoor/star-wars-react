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
      <div className="max-w-[800px] mx-auto p-6 rounded-xl shadow bg-main text-black">
        <div className="text-center">
          <h2 className="mb-3 text-2xl font-bold">{aboutMe.name}</h2>
          <img src={hero} alt={aboutMe.name} className="w-50 mb-6 mx-auto rounded-lg shadow transition-transform hover:rotate-10deg" />
        </div>
        <div className="divide-y divide-main rounded-lg bg-yellow-50 text-black list-none">
          <li className="px-5 py-3">Gender: {aboutMe.gender}</li>
          <li className="px-5 py-3">Skin color: {aboutMe.skin_color}</li>
          <li className="px-5 py-3">Hair color: {aboutMe.hair_color}</li>
          <li className="px-5 py-3">Height: {aboutMe.height} cm</li>
          <li className="px-5 py-3">Mass: {aboutMe.mass} kg</li>
          <li className="px-5 py-3">Birth year: {aboutMe.birth_year}</li>
          <li className="px-5 py-3">Eye color: {aboutMe.eye_color}</li>
          <li className="px-5 py-3">Homeworld ID: {aboutMe.homeworld}</li>
          <li className="px-5 py-3">Created: {new Date(aboutMe.created).toLocaleString()}</li>
          <li className="px-5 py-3">Edited: {new Date(aboutMe.edited).toLocaleString()}</li>
        </div>
      </div>
    );
  } else {
    return (
      <p className="text-center text-2xl leading-8 my-8">
        <span
          className="inline-block w-6 h-6 mr-2 border-4 border-main border-t-transparent rounded-full animate-spin align-middle"
        ></span>
        Loading...
      </p>
    );
  }
};

export default AboutMe;
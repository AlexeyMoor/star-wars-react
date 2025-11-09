import {useEffect, useState} from "react";
import {base_url, period_months} from "../utils/constants.js";
import Button from "./ui/Button.jsx";

const initialForm = {
  first_name: '',
  last_name: '',
  planet: '',
  message: '',
};

const getPlanets = () => {
  try {
    const planetsData = JSON.parse(localStorage.getItem("planets_list"));
    if (planetsData && Date.now() - planetsData.timestamp < period_months)
      return planetsData.payload;
  } catch {
    console.error("Error parsing planets from local Storage!");
  }
  return [];
};

const Contact = () => {
  const [planets, setPlanets] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const planets = getPlanets();
    if (planets.length) {
      setPlanets(planets);
    } else {
      setLoading(true);
      fetch(`${base_url}/v1/planets`)
        .then(response => response.json())
        .then(data => {
          setPlanets(data.results ?? []);
          localStorage.setItem("planets_list", JSON.stringify({
            payload: data.results ?? [],
            timestamp: Date.now()
          }));
        })
        .catch(() => setPlanets([]))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Form submitted!');
    setForm(initialForm);
  };

  if (loading) {
    return (<p className="text-center text-2xl leading-8 my-8">
        <span
          className="inline-block w-6 h-6 mr-2 border-4 border-main border-t-transparent rounded-full animate-spin align-middle"
        ></span>
        Loading...
      </p>
    );
  }
  return (
    <form
      className="max-w-[800px] mx-auto p-6 rounded-xl shadow bg-main text-black"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-6 text-2xl font-bold text-center">Contact Form</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">First Name</label>
        <input
          className="w-full px-3 py-2 border border-grey rounded-md focus:outline-none focus:ring-1 focus:ring-black bg-yellow-50"
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Last Name</label>
        <input
          className="w-full px-3 py-2 border border-grey rounded-md focus:outline-none focus:ring-1 focus:ring-black bg-yellow-50"
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Planets</label>
        <select
          className="w-full px-3 py-2 border border-grey rounded-md focus:outline-none focus:ring-1 focus:ring-black bg-yellow-50"
          name="planet"
          value={form.planet}
          onChange={handleChange}
        >
          <option value="" disabled>Select a planet</option>
          {planets.map(planet => (
            <option key={planet.name} value={planet.name}>{planet.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium">Message</label>
        <textarea
          className="w-full h-60 px-3 py-2 border border-grey rounded-md focus:outline-none focus:ring-1 focus:ring-black bg-yellow-50"
          name="message"
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center ">
        <Button type="submit" className="text-main w-1/2">Send</Button>
      </div>
    </form>
  );
};

export default Contact;
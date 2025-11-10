import {useEffect, useState} from "react";
import {base_url, period_months} from "../utils/constants.js";
import Button from "./ui/Button.jsx";

const initialForm = {
  first_name: '',
  last_name: '',
  planet: '',
  message: '',
};

const Contact = () => {
  const [planets, setPlanets] = useState(['wait...']);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  async function getPlanets() {
    setLoading(true);
    try {
      const res = await fetch(`${base_url}/v1/planets`);
      if (!res.ok)
        throw new Error(`Error: ${res.status} ${res.statusText}`);

      const data = await res.json(); // Возвращает массив объектов планет
      const planetsArr = data.map(item => item.name); // Преобразуем в массив имен планет
      setPlanets(planetsArr);
      localStorage.setItem('planets', JSON.stringify({
        payload: planetsArr,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.log(e.message);
      setPlanets([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const planetsData = JSON.parse(localStorage.getItem('planets'));
    if (planetsData && ((Date.now() - planetsData.timestamp) < period_months)) {
      setPlanets(planetsData.payload);
    } else {
      getPlanets().then(() => console.log('Planets were loaded'));
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
            <option key={planet} value={planet}>{planet}</option>
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
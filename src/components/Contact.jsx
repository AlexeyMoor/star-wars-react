import {useEffect, useState} from "react";
import {base_url, period_months} from "../utils/constants.js";

const initialForm = {
  first_name: '',
  last_name: '',
  planet: '',
  message: '',
};

const Contact = () => {
  const [planets, setPlanets] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const planetsData = JSON.parse(localStorage.getItem("planets_list"));
    if (planetsData && (Date.now() - planetsData.timestamp < period_months)) {
      setPlanets(planetsData.payload);
    } else {
      setLoading(true);
      fetch(`${base_url}/v1/planets`)
        .then(response => response.json())
        .then(data => {
          const planetsArr = data.results || data;
          setPlanets(planetsArr);
          localStorage.setItem("planets_list", JSON.stringify({
              payload: planetsArr,
              timestamp: Date.now()
            }
          ));
        })
        .catch(() => setPlanets([]))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
    alert('Form submitted!');
    setForm(initialForm);
  };

  if (loading) {
    return <div className="text-center my-5"><span className="spinner-border"></span> Loading...</div>;
  }

  return (
    <form className="card w-50 mx-auto my-4 p-4" style={{backgroundColor: '#eedb00'}} onSubmit={handleSubmit}>
      <h2 className="mb-4 text-center">Contact Form</h2>
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input type="text" className="form-control" name="first_name" value={form.first_name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input type="text" className="form-control" name="last_name" value={form.last_name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Planets</label>
        <select className="form-select" name="planet" value={form.planet} onChange={handleChange}>
          <option value="" disabled>Select a planet</option>
          {planets.map(planet => (
            <option key={planet.name} value={planet.name}>{planet.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="form-label">Message</label>
        <textarea className="form-control" name="message" value={form.message} onChange={handleChange} />
      </div>

      <button type="submit" className="btn btn-danger w-100">Send</button>
    </form>
  );
};

export default Contact;
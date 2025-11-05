import './App.css'
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import {navItems, StarWarsContext} from "./utils/constants.js";
import {useState} from "react";

function App() {
  const [page, setPage] = useState(navItems[0]);

  return (
    <StarWarsContext value={{page, setPage}}>
      <div className={'container-fluid'}>
        <Header />
        <Main page={page} />
        <Footer />
      </div>
    </StarWarsContext>
  )
}

export default App

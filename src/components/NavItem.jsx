import {useContext} from "react";
import {StarWarsContext} from "../utils/constants.js";

const NavItem = ({itemTitle}) => {
  const {setPage} = useContext(StarWarsContext);
  return (
    <li onClick={() => setPage(itemTitle)} className="nav-item btn btn-danger mx-1 border-warning">{itemTitle}</li>
  );
};

export default NavItem;
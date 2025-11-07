import NavItem from "./NavItem.jsx";
import {navItems} from "../utils/constants.js";

const Navigation = () => {
  return (
    <nav className="fixed top-3 left-12 flex gap-4">
      {navItems.map(item => <NavItem itemTitle={item} key={item} />)}
    </nav>
  );
};

export default Navigation;
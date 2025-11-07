import {starWarsInfo} from "../utils/constants.js";
import Text from "./ui/Text.jsx";

const StarWars = () => {
  return (
    <div className="my-3 mx-3">
      <Text>{starWarsInfo}</Text>
    </div>
  );
};

export default StarWars;
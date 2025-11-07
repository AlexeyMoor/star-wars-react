import Friend from "./Friend.jsx";
import {friends} from "../utils/constants.js";

const DreamTeam = () => {
  return (
    <section className="float-right w-1/2 grid grid-cols-3 gap-1.5 border rounded-b-3xl mt-1.5 ml-2">
      <h2 className="text-center col-span-3 text-2xl">Dream team</h2>
      {friends.map((friend, index) => <Friend picture={friend} pos={index + 1} key={index} />)}
    </section>
  );
};

export default DreamTeam;
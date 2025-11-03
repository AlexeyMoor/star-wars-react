import hero from "../assets/main.jpg";
import { friends, mainText } from "../utils/constants.js";
import FriendsList from "./FriendsList.jsx";
import MainTextList from "./MainTextList.jsx";

const Main = () => {
  return (
    <main className="clearfix">
      <section className="float-start w-25 me-3">
        <img className="w-100" src={hero} alt="Luke Skywalker" />
      </section>

      <section className="float-end w-50 row border border-warning rounded-bottom-5 ms-2 me-0">
        <h2 className="text-center">Dream Team</h2>
        <FriendsList friends={friends} />
      </section>

      <div className="far-galaxy fs-2 lh-2">
        <MainTextList mainText={mainText} />
      </div>

    </main>
  );
};

export default Main;
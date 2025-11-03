import FriendImage from "./FriendImage.jsx";

const FriendsList = ({ friends }) => (
  <>
    {friends.map((friend, index) => <FriendImage key={index} {...friend} />)}
  </>
);

export default FriendsList;
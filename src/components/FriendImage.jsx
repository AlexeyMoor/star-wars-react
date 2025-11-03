import friend1 from '../assets/friend1.jpg';
import friend2 from '../assets/friend2.jpg';
import friend3 from '../assets/friend3.jpg';
import friend4 from '../assets/friend4.jpg';
import friend5 from '../assets/friend5.jpg';
import friend6 from '../assets/friend6.jpg';
import friend7 from '../assets/friend7.jpg';
import friend8 from '../assets/friend8.jpg';
import friend9 from '../assets/friend9.jpg';

const images = {
  'friend1.jpg': friend1,
  'friend2.jpg': friend2,
  'friend3.jpg': friend3,
  'friend4.jpg': friend4,
  'friend5.jpg': friend5,
  'friend6.jpg': friend6,
  'friend7.jpg': friend7,
  'friend8.jpg': friend8,
  'friend9.jpg': friend9,
};

const FriendImage = ({ src, alt, className }) => (
  <img className={`col-sm-4 p-1 ${className}`} src={images[src]} alt={alt} />
);

export default FriendImage;
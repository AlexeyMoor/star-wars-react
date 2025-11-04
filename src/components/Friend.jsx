const Friend = ({picture, pos}) => {
  let styles = "col-sm-4 p-1";
  if (pos === 7) {
    styles += " rounded-bottom-left";
  }
  if (pos === 9) {
    styles += " rounded-bottom-right";
  }

  return (
    <img className={styles} src={picture} alt="Friend" />
  );
};

export default Friend;
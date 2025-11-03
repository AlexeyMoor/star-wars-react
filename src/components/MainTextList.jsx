const MainTextList = ({ mainText }) => (
  <>
    {mainText.map((text, index) => <p key={index}>{text}</p>)}
  </>
);

export default MainTextList;
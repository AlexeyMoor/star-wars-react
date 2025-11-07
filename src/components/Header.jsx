import Navigation from "./Navigation.jsx";

const Header = () => {
  return (
    <header className="rounded-t-3xl bg-grey">
      <Navigation />
      <h1 className="text-center py-6 text-4xl">Luke Skywalker</h1>
    </header>
  );
};

export default Header;
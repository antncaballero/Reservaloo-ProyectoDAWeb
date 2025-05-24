const Header = ({title}) => {
  return (
    <header className="mt-24">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
        {title}
      </h1>
    </header>
  );
};

export default Header;
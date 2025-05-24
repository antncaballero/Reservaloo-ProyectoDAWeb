const HeaderHome = ({user}) => {
  const currentDate = new Date();
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const month = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-0 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
        ¡Hola, {user?.nombre}!
      </h1>
      <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg">
        <p className="text-white font-medium">
          {day} de {month}, {year}
        </p>
      </div>
    </header>
  );
}

export default HeaderHome;
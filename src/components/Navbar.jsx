
const Navbar = () => {

    return (
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Flapp</h1>
        <ul className="flex gap-4">
          <li><a href="/" className="hover:underline">Productos</a></li>
          <li><a href="/cart" className="hover:underline" >Carrito</a></li>
          <li><a href="#" className="hover:underline">Contacto</a></li>
        </ul>
      </nav>
    );
  };

  export default Navbar
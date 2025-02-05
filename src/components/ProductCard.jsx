import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import ModalConfirm from "./ModalConfirm";


const ProductCard = ({ product }) => {

  const { cart, dispatch } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    setShowModal(true); // 🔥 Mostrar el modal
    console.log(cart)
  };

    return (
      <div className="bg-white p-4 shadow-md rounded-lg">
        <img src={product.images[0]} alt={product.title} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
        <button className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700" onClick={()=>handleAddToCart(product)}>Agregar al carrito</button>
        {showModal ? <ModalConfirm message="Producto agregado al carrito" onClose={() => setShowModal(false)}></ModalConfirm>: ''}
      </div>
    );
  };

  export default ProductCard
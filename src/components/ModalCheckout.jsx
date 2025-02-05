import { useContext, useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import CartContext from "../context/CartContext";


const ModalCheckout = ({cart, checkOutStatus, onClose }) => {

  const [confirmed, setConfirmed] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(0)
  const {dispatch} = useContext(CartContext)

  useEffect(()=>{
    const total = cart.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setPrecioTotal(total)
    setConfirmed(false)
  }, [])


  const handleConfirm = () => {
    setConfirmed(true);
    dispatch({type:'CLEAR_CART'})
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 text-center">
        {checkOutStatus.checkOutStatus ? (
          <>
          <h2 className="text-xl font-semibold mb-4"> Precio total productos {precioTotal}
          </h2>
            <h2 className="text-xl font-semibold mb-4">Envío Flapp ⚡️ - $3.670</h2>
            {confirmed ? (
              <div className="flex flex-col items-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 animate-bounce" />
                <p className="mt-2 text-green-600">¡Confirmado!</p>
              </div>
            ) : (<div>
              <button 
                onClick={handleConfirm} 
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
                Confirmar Envío
              </button>
              </div>
            )}
          </>
        ) : (
          <h2 className="text-xl font-semibold mb-4 text-red-600">No hay envíos disponibles :(</h2>
        )}
        {!confirmed && (
          <button 
            onClick={onClose} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">
            OK
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalCheckout;
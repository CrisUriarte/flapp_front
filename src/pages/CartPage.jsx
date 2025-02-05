import Navbar from '../components/Navbar'
import { useContext, useState } from 'react'
import CartContext from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import {fetchCotizacion} from '../services/productServices'
import ModalCheckout from '../components/ModalCheckout'


const CartPage =()=>{

    const navigate = useNavigate();

    const {cart, dispatch} = useContext(CartContext)
    const [checkoutModal, setcheckoutModal] = useState(false)
    const [checkOutStatus, setCheckoutStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(false);


    const handleCleanCart = ()=>{
        dispatch({ type: "CLEAR_CART" })
        navigate('/')
    }

    const handleCotizacion= async ()=>{

        setIsLoading(true);
        const coti = await fetchCotizacion(cart)
        setCheckoutStatus(coti)
        setIsLoading(false);
        setcheckoutModal(true)
    }

    return(
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">🛒 Carrito de Compras</h2>
            {cart.length === 0 ? (
            <p className="text-center text-gray-500">Tu carrito está vacío.</p>
            ) : (
            <div className="flex flex-col items-center space-y-4">
                {cart.map((product) => (
                <div key={product.id} className="w-full max-w-2xl bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
                    <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-gray-600">${product.price}</p>
                    </div>
                    <div>Cantidad {product.quantity}</div>
                    <button 
                    onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: product })} 
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
                    Eliminar
                    </button>
                </div>
                ))}
            </div>
            )}
            <button 
            onClick={() => handleCleanCart()} 
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 m-4">
            Limpiar Carrito    
            </button>
            <button 
            onClick={() => handleCotizacion()} 
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 m-4">
          {isLoading ? "Cargando..." : "Cotizar"}
          </button>

            <button 
            onClick={() => navigate('/')} 
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 m-4">
            Volver
            </button>
        </div>
        {checkoutModal ? <ModalCheckout cart={{cart}} checkOutStatus ={{checkOutStatus}} onClose={() => setcheckoutModal(false)}></ModalCheckout> : ''}
        </div>
    )
}

export default CartPage
import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useNavigate } from 'react-router-dom'
import {fetchProducts, fetchRandomCart} from '../services/productServices'
import CartContext from "../context/CartContext";


const Home =()=> {

  const {dispatch} = useContext(CartContext)

  const navigate = useNavigate();
  const [products, setProducts] = useState([])

  useEffect(()=>{
    const getProducts = async ()=>{
      const data = await fetchProducts()
      setProducts(data)
    }
    getProducts()
  }, [])

  const handleRandom= async ()=>{
    const random = await fetchRandomCart()
    console.log(random)
    dispatch({type:"SET_CART", payload:random.body})
  }

    return (
      <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Productos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
        <div className="m-4 flex justify-between">
          <button
            onClick={() => navigate('/cart')} 
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Finalizar Compra
          </button>
          <button
            onClick={() => handleRandom()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Carrito aleatorio
          </button>       

        </div>
        </div>
    </div>
    );
  }
  
  export default Home;
  
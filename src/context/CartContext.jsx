import { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();


const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const existingProductIndex = state.findIndex(item => item.id === action.payload.id);

      if (existingProductIndex !== -1) {
        return state.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
      case "REMOVE_FROM_CART":
      console.log(state, action.payload)
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0);

      case "CLEAR_CART":
        return []; 
      case "SET_CART":
        console.log(action.payload)
        return action.payload.map(product => ({
          ...product,
          quantity: 1}))
      default:
        return state;
    }
  };

const getCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

export const CartProvider =({children})=>{
    const [cart, dispatch] = useReducer(cartReducer, [], getCartFromLocalStorage);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);

    return(
        <CartContext.Provider value={{cart,dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;

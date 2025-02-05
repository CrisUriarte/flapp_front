const API_URL = import.meta.env.VITE_API_URL || "https://flapp-back.onrender.com/api/cart/";

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ page: 1 })
    });
    console.log(API_URL)
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }
    const res = await response.json();
    return res.body
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Retorna un array vacío en caso de error
  }
};


export const fetchCotizacion = async (cart)=>{

    try {
        const formattedCart = cart.map((item) => ({
            productId: item.id.toString(), // Convertir id a string
            price: item.price,
            quantity: item.quantity || 1,
            discount: item.discountPercentage || 0,
          }));

        const response = await fetch(API_URL+'buy/',{
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(formattedCart)
        });
        console.log(API_URL)
        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }
        const res = await response.json();
        return res.body
      } catch (error) {
        console.error("Error fetching products:", error);
        return []; // Retorna un array vacío en caso de error
      }
}

export const fetchRandomCart = async()=>{
  try {
    const response = await fetch(API_URL+'random/',{
      method: "GET"
    });
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }
    const res = await response.json();
    return res

  } catch (error) {
    
  }
}
import {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product) => {

    setCartItems((prevItems) => {

      const existing = prevItems.find(
        (item) => item._id === product._id
      );

      // PRODUCT ALREADY EXISTS
      if (existing) {

        return prevItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );

      }

      // NEW PRODUCT
      return [
        ...prevItems,
        {
          ...product,
          qty: 1,
        },
      ];

    });

  };

  // =========================
  // INCREASE QTY
  // =========================

  const increaseQty = (id) => {

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );

  };

  // =========================
  // DECREASE QTY
  // =========================

  const decreaseQty = (id) => {

    setCartItems((prevItems) => {

      const updated = prevItems
        .map((item) =>
          item._id === id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0);

      return updated;

    });

  };

  // =========================
  // REMOVE FULL ITEM
  // =========================

  const removeItem = (id) => {

    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item._id !== id
      )
    );

  };

  // =========================
  // TOTAL ITEMS COUNT
  // =========================

  const totalItems = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  // =========================
  // TOTAL PRICE
  // =========================

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.qty,
    0
  );

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        totalItems,
        totalPrice,
      }}
    >

      {children}

    </CartContext.Provider>

  );

};

export const useCart = () =>
  useContext(CartContext);
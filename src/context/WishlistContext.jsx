import {
  createContext,
  useContext,
  useState,
} from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({
  children,
}) => {

  const [wishlistItems, setWishlistItems] =
    useState([]);

  // =========================
  // TOGGLE WISHLIST
  // =========================

  const toggleWishlist = (product) => {

    const exists = wishlistItems.find(
      (item) => item._id === product._id
    );

    if (exists) {

      setWishlistItems(
        wishlistItems.filter(
          (item) => item._id !== product._id
        )
      );

    } else {

      setWishlistItems([
        ...wishlistItems,
        product,
      ]);

    }

  };

  // =========================
  // CHECK PRODUCT
  // =========================

  const isInWishlist = (id) => {

    return wishlistItems.some(
      (item) => item._id === id
    );

  };

  return (

    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

};

export const useWishlist = () =>
  useContext(WishlistContext);
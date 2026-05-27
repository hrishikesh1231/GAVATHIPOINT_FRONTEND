import React from "react";

import { Link } from "react-router-dom";

import { Heart } from "lucide-react";

import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {

  const { wishlistItems } =
    useWishlist();

  return (

    <section className="
      min-h-screen
      bg-gradient-to-br
      from-[#fefce8]
      via-[#dcfce7]
      to-[#bbf7d0]
      pt-28
      px-4
      pb-16
    ">

      <div className="max-w-6xl mx-auto">

        <div className="
          flex
          items-center
          gap-3
          mb-10
        ">

          <Heart
            className="text-red-500 fill-red-500"
            size={32}
          />

          <h1 className="
            text-4xl
            font-black
            text-[#14532d]
          ">

            Wishlist

          </h1>

        </div>

        {
          wishlistItems.length === 0 ? (

            <div className="
              bg-white
              rounded-3xl
              p-16
              text-center
              shadow-xl
            ">

              <h2 className="
                text-2xl
                font-bold
                text-gray-500
              ">

                Wishlist is Empty

              </h2>

            </div>

          ) : (

            <div className="
              grid
              grid-cols-2
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-6
            ">

              {
                wishlistItems.map((product) => (

                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                  >

                    <div className="
                      bg-white
                      rounded-3xl
                      overflow-hidden
                      shadow-xl
                      hover:scale-105
                      transition-all
                      duration-300
                    ">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          w-full
                          h-56
                          object-cover
                        "
                      />

                      <div className="p-5">

                        <h2 className="
                          text-2xl
                          font-bold
                          text-[#14532d]
                        ">

                          {product.name}

                        </h2>

                        <p className="
                          mt-2
                          text-orange-500
                          text-xl
                          font-bold
                        ">

                          ₹{product.price}

                        </p>

                      </div>

                    </div>

                  </Link>

                ))
              }

            </div>

          )
        }

      </div>

    </section>

  );

};

export default Wishlist;
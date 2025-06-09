import React, { useEffect, useState } from "react";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import { BsCartXFill } from "react-icons/bs";

import axiosInstance from "../Auth/axiosInstance";
import { useAuth } from "../Auth/AuthContex";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { p } from "framer-motion/client";

function Sidebar() {
  const {
    cart,
    setCart,
    cartId,
    amount,
    setAmount,
    showCartSidebar,
    closeCartSidebar,
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState({});
  const [deletingItemId, setDeletingItemId] = useState(null);
  const navigate = useNavigate();
  const [cartLoading, setCartLoading] = useState(false);

  const fetchCartItems = async () => {
    if (!cartId || !showCartSidebar) return;

    setCartLoading(false);
    try {
      const response = await axiosInstance.get(
        `/cart/getCartItemsVyCartId/${cartId}`
      );
      setCart(response.data.dtoList || []);
      setCartLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCart([]);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartId, showCartSidebar]);

  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.products.discountAmount * item.quantity,
      0
    );
    setAmount(total);
  }, [cart]);

  const deleteCartItem = async (cartItemId, includeAll = false) => {
    setDeletingItemId(cartItemId);
    try {
      const url = `/cart/removeItemFromCart/${cartItemId}${
        includeAll ? "?all=true" : ""
      }`;
      await axiosInstance.delete(url);
      await fetchCartItems();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    } finally {
      setDeletingItemId(null);
    }
  };

  const addOneMoreQuantityToCart = async (cartItemId) => {
    setUpdatingItems((prev) => ({ ...prev, [cartItemId]: true }));
    try {
      await axiosInstance.put(
        `/cart/increaseQuantityByCartItemId/${cartItemId}`
      );
      await fetchCartItems();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  const [loadingDe, setLoadingDe] = useState(false);
  const [deId, setDeId] = useState(null);

  const decreaseQuantityFromCart = async (
    cartItemId,
    includeAllQuery = false
  ) => {
    console.log(cartItemId);
    setDeId(cartItemId);
    setLoadingDe(true);
    try {
      const url = `/cart/removeItemFromCart/${cartItemId}${
        includeAllQuery ? "?all=false" : ""
      }`;
      const response = await axiosInstance.delete(url);
      await fetchCartItems();
      setLoadingDe(false);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    } finally {
      setLoadingDe(false);
    }
  };

  return (
    <PrimeSidebar
      visible={showCartSidebar}
      position="right"
      onHide={closeCartSidebar}
      className="w-full "
     >
      <div className="py-4 px-1 h-full flex flex-col">
        <h2 className="text-xl font-bold mb-6">Shopping cart</h2>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <BsCartXFill size={24} />
            <p className="text-gray-500 py-4">Your cart is empty</p>
            <button
              onClick={() => {
                closeCartSidebar();
                navigate("/shop");
              }}
              className="bg-black text-white px-6 py-2 rounded-md cursor-pointer"
            >
              Return to shop
            </button>
          </div>
        ) : (
          <>
            {cartLoading ? (
              <div className="text-center py-4">Loading cart...</div>
            ) : cart.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Your cart is empty.
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center mb-4 pb-4 border-b border-gray-200 "
                  >
                    <img
                      src={
                        item.products?.imageUrls?.[1] ||
                        "https://via.placeholder.com/64"
                      }
                      alt={item.products?.name}
                      className="w-16 h-16 object-contain mr-4 border p-2 rounded-md border-gray-200"
                    />
                    <div className="flex-grow ">
                      <h3 className="font-medium">{item.products?.name.slice(0,25)}</h3>
                      <div className="flex justify-between items-start">
                        <span className="text-green-600 font-semibold">
                          $
                          {(
                            item.products.discountAmount * item.quantity
                          ).toFixed(2)}
                        </span>
                        <div className="flex justify-between  items-center ml-1">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                decreaseQuantityFromCart(
                                  item.id,
                                  item.quantity,
                                  false
                                )
                              }
                              disabled={updatingItems[item.id]}
                              className="bg-gray-200 px-2 rounded-l cursor-pointer disabled:opacity-50 text-lg"
                            >
                              -
                            </button>
                            <span className="bg-gray-100 px-2 h-[28px] w-[30px] flex justify-center items-center text-lg">
                              {updatingItems[item.id] ||
                              (loadingDe && deId === item.id) ? (
                                <span className="loading loading-spinner loading-xs p-1" />
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <button
                              onClick={() => addOneMoreQuantityToCart(item.id)}
                              disabled={updatingItems[item.id]}
                              className="bg-gray-200 px-2 rounded-r cursor-pointer disabled:opacity-50 text-lg"
                            >
                              +
                            </button>
                          </div>

                          <div>
                            <button
                              onClick={() => deleteCartItem(item.id, true)}
                              disabled={deletingItemId === item.id}
                              className="text-gray-500 hover:text-red-500 ml-4 disabled:opacity-50 cursor-pointer w-6 h-6 flex items-center justify-center"
                            >
                              {deletingItemId === item.id ? (
                                <span className="loading loading-spinner loading-xs" />
                              ) : (
                                <MdDelete size={20} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        ${item.products?.discountAmount.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!cartLoading && cart.length > 0 && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">
                    $
                    {cart
                      .reduce(
                        (sum, item) =>
                          sum + item.products.discountAmount * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    closeCartSidebar();
                    navigate("/pay");
                  }}
                  className="w-full ml-2 cursor-pointer relative inline-flex items-center justify-center p-4 px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 rounded-md shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#a9cdb2] group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-gray-900 transition-all duration-300 transform group-hover:translate-x-full ease">
                    PLACE ORDER
                  </span>
                  <span className="relative invisible">PLACE ORDER</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PrimeSidebar>
  );
}

export default Sidebar;

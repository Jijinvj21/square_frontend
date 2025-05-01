import React, { useEffect, useState } from "react";
import {
  deleteCartItemAPI,
  getCartItemsAPI,
  updateCartItemCountAPI,
} from "../service/service";
import { products } from "../utils/productData";
import { createImageMap } from "../utils/loadImages";
import toast from "react-hot-toast";
import OrderSummary from "../components/orderSummary/OrderSummary";
import CartItem from "../components/cartItem/CartItem";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const imageModules = import.meta.glob("../assets/image/product/*.jpg", {
  eager: true,
});
const imageMap = createImageMap(imageModules);

function CartPage() {
  const navigate = useNavigate();

  const { refreshCartCount } = useCart();

  const notifyErr = (message, id) => toast.error(message, { id: id });
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };
  useEffect(() => {
    getCartItemsAPI()
      .then((response) => {
        const items = response.data;
        const enrichedItems = items.map((item) => ({
          ...item,
          ...products.find((p) => p.id === item.id),
        }));
        setCartItems(enrichedItems);
        calculateSubtotal(enrichedItems);
      })
      .catch(console.error);
  }, []);

  const calculateSubtotal = (items) => {
    setSubtotal(
      items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
  };

  const handleQuantityChange = (itemId, colorName, newQuantity) => {
    updateCartItemCountAPI({ id: itemId, colorName, newCount: newQuantity })
      .then(() => {
        const updatedItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        calculateSubtotal(updatedItems);
      })
      .catch((err) => {
        notifyErr(err.message, "cartUpdateError");
        console.error(err);
      });
  };

  const handleRemoveItem = (itemId) => {
    deleteCartItemAPI(itemId)
      .then(() => {
        refreshCartCount()
          .then((res) => {
            const updatedItems = cartItems.filter((item) => item.id !== itemId);
            setCartItems(updatedItems);
            calculateSubtotal(updatedItems);
          })
          .catch((err) => {
            notifyErr(err.message, "GetCartError");
            console.error(err);
          });
      })
      .catch((err) => {
        notifyErr(err.message, "cartUpdateError");
        console.error(err);
      });
  };

  return (
    <div className="cart-page container mx-auto p-4 min-h-screen w-full">
      <div className="w-full mx-auto"> {/* Added container constraint */}
        <h1 className="text-2xl font-bold mb-1">Your Cart</h1>
        <button
          onClick={goBack}
          className="flex items-center gap-2 mb-6 hover:text-gray-600 transition-colors"
        >
          <FaArrowLeft />
          Back
        </button>
        
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Cart Items Section */}
          <div className="flex-1 "> {/* Added max-width */}
            <div className="cart-items mb-8">
              {/* Header remains the same */}

              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    imageMap={imageMap}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveItem={handleRemoveItem}
                  />
                ))
              )}
            </div>
          </div>

          {/* Order Summary - Added responsive width */}
          <div className="lg:w-96 w-full"> 
            <OrderSummary
              subtotal={subtotal}
              setCartItems={setCartItems}
              setSubtotal={setSubtotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

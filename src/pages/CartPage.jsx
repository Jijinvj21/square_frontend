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

const imageModules = import.meta.glob("../assets/image/product/*.jpg", {
  eager: true,
});
const imageMap = createImageMap(imageModules);

function CartPage() {
  const { refreshCartCount } = useCart();

  const notifyErr = (message, id) => toast.error(message, { id: id });
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

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
        refreshCartCount();
        const updatedItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedItems);
        calculateSubtotal(updatedItems);
      })
      .catch((err) => {
        notifyErr(err.message, "cartUpdateError");
        console.error(err);
      });
  };

  return (
    <div className="cart-page container mx-auto p-4 max-w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="flex flex-col screen1152:flex-row lg:flex-col gap-8">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="cart-items mb-8">
            <div className="hidden md:grid grid-cols-12 gap-4 font-medium border-b border-black pb-2 mb-4">
              <div className="col-span-6">Product</div>
              <div className="col-span-4 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

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

        {/* Order Summary */}
        <OrderSummary
          subtotal={subtotal}
          setCartItems={setCartItems}
          setSubtotal={setSubtotal}
        />
      </div>
    </div>
  );
}

export default CartPage;

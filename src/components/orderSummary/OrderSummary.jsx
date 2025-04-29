// components/orderSummary/OrderSummary.jsx

import toast from "react-hot-toast";
import { clearCartStorage } from "../../service/service";

const OrderSummary = ({ subtotal, setCartItems,setSubtotal }) => {
  const notifyRes = (message, id) => toast.success(message, { id: id });
  const notifyErr = (message, id) => toast.error(message, { id: id });

  const handleCheckout = () => {
    clearCartStorage()
      .then((res) => {
        console.log(res);
        setCartItems([]); 
        setSubtotal(0);
        notifyRes("Order placed successfully! You'll receive a confirmation email shortly.", "checkoutSuccess");
      })
      .catch((err) => {
        console.log(err);
        notifyErr("Failed to complete checkout. Please try again.", "checkoutError");
      });
  }
return(
 
  
    <div className="w-full screen1152:w-80 xl:w-80">
      <div className="p-6 rounded-lg border border-black h-fit sticky top-4">
        <div className="pb-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>FREE</span>
          </div>
        </div>
  
        <div className="mb-4">
          <textarea
            className="w-full border border-black rounded p-3 text-sm h-24 focus:ring-2 focus:ring-black focus:outline-none bg-transparent placeholder-black"
            placeholder="Order note"
          />
        </div>
  
        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
  
        <button onClick={handleCheckout} className="w-full bg-[#323232] rounded-full text-white py-4 hover:bg-gray-800 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  )};
  
  export default OrderSummary;
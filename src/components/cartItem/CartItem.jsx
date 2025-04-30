import ProductImageGrid from "../productImageGrid/ProductImageGrid";
import QuantitySelector from "../quantitySelector/QuantitySelector";

const CartItem = ({ 
  item, 
  imageMap, 
  handleQuantityChange, 
  handleRemoveItem 
}) => (
  <div className="flex flex-col sm:grid sm:grid-cols-10 gap-4 border-b border-black py-4">
    {/* Product Image and Info */}
    <div className="sm:col-span-5 lg:col-span-6 flex items-center gap-2 sm:gap-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-28 flex-shrink-0">
        <ProductImageGrid
          images={[item?.images[0]]}
          imageMap={imageMap}
          aspectRatio="square"
        />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm sm:text-base md:text-lg line-clamp-2">
          {item?.title}
        </div>
        <div className="text-sm sm:text-base md:text-lg">${item?.price}</div>
        <div className="text-xs sm:text-sm text-gray-600">
          Color: {item?.color?.name}
        </div>
      </div>
    </div>

    {/* Quantity Selector */}
    <div className="sm:col-span-3 lg:col-span-2 flex items-center justify-between sm:justify-start">
      <span className="sm:hidden text-sm font-medium">Qty:</span>
      <QuantitySelector
        quantity={item.quantity}
        onQuantityChange={(newQty) =>
          handleQuantityChange(item.id, item.color.name, newQty)
        }
        className="scale-90 sm:scale-100"
      />
    </div>

    {/* Price and Remove Button */}
    <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-4">
      <div className="text-base sm:text-lg md:text-xl font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button
        onClick={() => handleRemoveItem(item.id)}
        className="text-gray-500 hover:text-red-600 text-xl sm:text-2xl font-light"
        aria-label="Remove item"
      >
        ×
      </button>
    </div>
  </div>
);

export default CartItem;
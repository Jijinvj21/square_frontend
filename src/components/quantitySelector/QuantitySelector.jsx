function QuantitySelector({ quantity, onQuantityChange }) {
  const handleIncrement = () => onQuantityChange(quantity + 1);
  const handleDecrement = () => onQuantityChange(Math.max(1, quantity - 1));

  return (
    <div className="flex items-center border border-black w-24 sm:w-28 md:w-32 lg:w-36 rounded-full text-sm sm:text-base justify-between">
      <button
        onClick={handleDecrement}
        className="px-2 sm:px-3 py-1 sm:py-2 text-lg sm:text-xl"
      >
        -
      </button>
      <span className="px-2 sm:px-4">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="px-2 sm:px-3 py-1 sm:py-2 text-lg sm:text-xl"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;

import React, { useEffect, useState } from "react";
import ColorSelector from "../colorSelector/ColorSelector";
import QuantitySelector from "../quantitySelector/QuantitySelector";
import AccordionSection from "../accordionSection/AccordionSection";
import { productAddAPI } from "../../service/service";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import ProductImageGrid from "../productImageGrid/ProductImageGrid";
import { products } from "../../utils/productData";
import { createImageMap } from "../../utils/loadImages";
import ActionButtons from "../actionButtons/ActionButtons";
import FadeIn from "../fadeIn/FadeIn";
const imageModules = import.meta.glob("../../assets/image/product/*.jpg", {
  eager: true,
});
const imageMap = createImageMap(imageModules);

function ProductDetails() {
  const { refreshCartCount } = useCart();
  const notifyErr = (message, id) => toast.error(message, { id: id });
  const notifyRes = (message, id) => toast.success(message, { id: id });
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSections, setOpenSections] = useState({
    productInfo: false,
    returnPolicy: false,
    shippingInfo: false,
  });
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const productIds = products.map(p => p.id);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex(prev => (prev + 1) % productIds.length);
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setQuantity(1);
    const id = productIds[currentProductIndex];
    const foundProduct = products.find((item) => item.id === id);
    setProduct(foundProduct || null);
    if (foundProduct?.colors) {
      setSelectedColor(foundProduct.colors[0]);
    }
  }, [currentProductIndex]); // Update when index changes

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      color: selectedColor,
    };

    productAddAPI(cartItem)
      .then((res) => {
        notifyRes(res.message, "addToCart");
        refreshCartCount();
        setQuantity(1);
      })
      .catch((err) => {
        notifyErr(err.message, "addToCartError");
      });
  };

  if (!product) return null;

  return (
    <FadeIn key={currentProductIndex} duration={1}>

    <div className="flex flex-col lg:flex-row gap-8">
      <ProductImageGrid images={product.images} imageMap={imageMap} />

      <div className="lg:w-[40%] xl:w-[30%] space-y-6 sticky top-8 h-fit">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {product.title}
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600 text-base md:text-lg">
          {product.description}
        </p>

        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
          />

        <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
        <ActionButtons handleAddToCart={handleAddToCart} />

        <div className="space-y-4 pt-6">
          <AccordionSection
            title="Product Info"
            isOpen={openSections.productInfo}
            onToggle={() => toggleSection("productInfo")}
            key="productInfo"
            >
            <p className="text-gray-600">{product.productInfo}</p>
          </AccordionSection>

          <AccordionSection
            title="Return & Refund Policy"
            isOpen={openSections.returnPolicy}
            onToggle={() => toggleSection("returnPolicy")}
            key="returnPolicy"
          >
            <p className="text-gray-600">{product.returnPolicy}</p>
          </AccordionSection>

          <AccordionSection
            title="Shipping Info"
            isOpen={openSections.shippingInfo}
            onToggle={() => toggleSection("shippingInfo")}
            key="shippingInfo"
            >
            <p className="text-gray-600">{product.shippingInfo}</p>
          </AccordionSection>
        </div>
      </div>
    </div>
              </FadeIn>
  );
}

export default ProductDetails;

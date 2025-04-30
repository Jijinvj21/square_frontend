import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../utils/productData";
import { createImageMap } from "../utils/loadImages";
import ProductImageGrid from "../components/productImageGrid/ProductImageGrid";
import ColorSelector from "../components/colorSelector/ColorSelector";
import ActionButtons from "../components/actionButtons/ActionButtons";
import AccordionSection from "../components/accordionSection/AccordionSection";
import ProductCarousel from "../components/productCarousel/ProductCarousel";
import { productAddAPI } from "../service/service";
import toast from "react-hot-toast";
import QuantitySelector from "../components/quantitySelector/QuantitySelector";
import { useCart } from "../context/CartContext";
import { FaArrowLeft } from "react-icons/fa6";

const imageModules = import.meta.glob("../assets/image/product/*.jpg", {
  eager: true,
});
const imageMap = createImageMap(imageModules);

function ProductDetailsPage() {
  const navigate = useNavigate();

  const { refreshCartCount } = useCart();

  const notifyErr = (message, id) => toast.error(message, { id: id });
  const notifyRes = (message, id) => toast.success(message, { id: id });
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [openSections, setOpenSections] = useState({
    productInfo: true,
    returnPolicy: false,
    shippingInfo: false,
  });

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };
  useEffect(() => {
    setQuantity(1);
    const id = Number(productId);
    const foundProduct = products.find((item) => item.id === id);
    setProduct(foundProduct || null);
    if (foundProduct?.colors) {
      setSelectedColor(foundProduct.colors[0]);
    }
  }, [productId]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!product) return <div className="p-8">Product not found</div>;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      color: selectedColor,
    };

    productAddAPI(cartItem)
      .then((res) => {
        console.log("Added to cart:", res.message);
        notifyRes(res.message, "addToCart");
        refreshCartCount(); // Refresh the cart count
        setQuantity(1);
      })
      .catch((err) => {
        console.log("Error:", err);
        notifyErr(err.message, "addToCartError");
      });
  };

  return (
    <div className="min-h-screen font-inter">
      <button
        onClick={goBack}
        className="flex items-center gap-2 mt-6 ml-10
          "
      >
        <FaArrowLeft />
        Back
      </button>
      <div className="max-w-full mx-auto px-4 md:px-8 py-8">
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

            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
            <ActionButtons handleAddToCart={handleAddToCart} />

            <div className="space-y-4 pt-6">
              <AccordionSection
                title="Product Info"
                isOpen={openSections.productInfo}
                onToggle={() => toggleSection("productInfo")}
              >
                <p className="text-gray-600">{product.productInfo}</p>
              </AccordionSection>

              <AccordionSection
                title="Return & Refund Policy"
                isOpen={openSections.returnPolicy}
                onToggle={() => toggleSection("returnPolicy")}
              >
                <p className="text-gray-600">{product.returnPolicy}</p>
              </AccordionSection>

              <AccordionSection
                title="Shipping Info"
                isOpen={openSections.shippingInfo}
                onToggle={() => toggleSection("shippingInfo")}
              >
                <p className="text-gray-600">{product.shippingInfo}</p>
              </AccordionSection>
            </div>
          </div>
        </div>
        <ProductCarousel
          products={products}
          imageMap={imageMap}
          interval={2000} // Default 1000
          displayCount={4} // Default 4
        />
      </div>
    </div>
  );
}

export default ProductDetailsPage;

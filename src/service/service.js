export const productAddAPI = async (data) => {
  try {
    const existingCart =
      (await JSON.parse(localStorage.getItem("cartItems"))) || [];

    // Check if product with same id and same color name exists
    const productIndex = await existingCart.findIndex(
      (item) => item.id === data.id && item.color?.name === data.color?.name // compare by value, not object
    );

    if (productIndex !== -1) {
      // If exists, show already added message
      return {
        success: false,
        message: "Product already added to cart",
        data,
      };
    } else {
      // If not, add as new item
      existingCart.push(data);
      localStorage.setItem("cartItems", JSON.stringify(existingCart));

      return {
        success: true,
        message: "Product added to cart successfully",
        data,
      };
    }
  } catch (error) {
    throw {
      success: false,
      message: "Failed to add product to cart",
      error,
    };
  }
};

export const getCartItemsAPI = async () => {
  try {
    const cartItems =
      (await JSON.parse(localStorage.getItem("cartItems"))) || [];

    return {
      success: true,
      message: "Cart items fetched successfully",
      data: cartItems,
    };
  } catch (error) {
    throw {
      success: false,
      message: "Failed to fetch cart items",
      error,
    };
  }
};

export const updateCartItemCountAPI = async (data) => {
  try {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const productIndex = existingCart.findIndex(
      (item) => item.id === data.id && item.color?.name === data.colorName
    );

    if (productIndex === -1) {
      return {
        success: false,
        message: "Product not found in cart",
      };
    }

    existingCart[productIndex].quantity = data.newCount;

    localStorage.setItem("cartItems", JSON.stringify(existingCart));

    return {
      success: true,
      message: "Product count updated successfully",
      data: existingCart[productIndex],
    };
  } catch (error) {
    throw {
      success: false,
      message: "Failed to update product count",
      error,
    };
  }
};

export const deleteCartItemAPI = async (id) => {
  try {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Filter out all products with the given ID
    const updatedCart = existingCart.filter((item) => item.id !== id);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    return {
      success: true,
      message: "Product(s) removed from cart successfully",
      data: updatedCart,
    };
  } catch (error) {
    throw {
      success: false,
      message: "Failed to delete product from cart",
      error,
    };
  }
};

export const clearCartStorage = async () => {
  try {
    localStorage.clear();

    return {
      success: true,
      message: "All data cleared from local storage",
    };
  } catch (error) {
    throw {
      success: false,
      message: "Failed to clear local storage",
      error,
    };
  }
};

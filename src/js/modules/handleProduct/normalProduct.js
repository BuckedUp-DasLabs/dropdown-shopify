import { createButton, createVariantsWrapper, handleButtonDropImg } from "./domElements.js";

const checkIfLastVariantHasStock = (variant, button, wrapper) => {
  if (!variant.availableForSale) {
    button.toggleAttribute("disabled")
    wrapper.classList.add("no-stock-filter")
    lastVariantElements.forEach(id => {
      document.querySelector(id).classList.add("no-stock-filter")
    })
  }
}

const normalProduct = (product) => {
  const currentRow = row[product.id]
  const hasImg = currentRow.classList.contains("has-img") || currentRow.classList.contains("has-img-desktop")
  const [variantsWrapper, dropdownMobile, dropdownImg] = createVariantsWrapper(currentRow, product.variants, hasImg)
  product.variants.forEach((variant) => {
    const [wrapper, button] = createButton({productId: product.id, variantId: variant.id, text: variant.title, hasImg: hasImg, src: variant.image?.src, variantPrice: variant.price.amount})

    if (currentRow.classList.contains("move-last-variant") && variant["last-variant"]) {
      document.querySelector(`.last-variant.prod-${product.id}`).appendChild(wrapper)
      checkIfLastVariantHasStock(variant, button, wrapper)
    } else
      variantsWrapper.appendChild(wrapper)

    handleButtonDropImg(variant,button,dropdownMobile,hasImg,dropdownImg)
    
  });
  if (!currentRow.hasAttribute("dropdown-text"))
    variantsWrapper.querySelector("input").checked = true
  return true;
};

export default normalProduct;

import fetchProduct from "./modules/handleProduct/fetchProduct.js";
import normalProduct from "./modules/handleProduct/normalProduct.js";
import multipleOptionsProduct from "./modules/handleProduct/multipleOptionsProduct.js";
import toggleLoading from "./modules/toggleLoading.js";
import buy from "./modules/buy.js";
import optionalProduct from "./modules/handleProduct/optionalProduct.js";
import { dataLayerStart } from "./modules/dataLayer.js";

const setQuantity = (id) => {
  const isString = typeof (id) === "string"
  const button = document.querySelector(isString ? id : id.id)
  if (!isString){
    button.setAttribute("quantity", id.quantity)
    button.setAttribute("discountCode", id.discountCode)
  }
  return button
}

buyButtonsIds.forEach((ids) => {
  let buttons = [];
  if (!isKit) {
    ids.forEach((id) => {
      buttons.push(setQuantity(id));
    });
    buyButton.push(buttons);
  }
  else {
    buyButton.push(setQuantity(ids))
  }
});

productsID.forEach((id) => {
  row[id] = document.querySelector(`.products-list.prod-${id}`);
});

const main = async () => {
  toggleLoading();
  const data = await fetchProduct({ ids: productsID, isHidden: false });
  const hiddenProductsData = await fetchProduct({ ids: hiddenProducts, isHidden: true })
  data.push(...hiddenProductsData)
  dataLayerStart(data);
  let optionalData = [];
  let selectedOptionalData;
  if (optionalProducts.length > 0) {
    optionalData = await fetchProduct({ ids: optionalProducts, isHidden: false })
    selectedOptionalData = { selected: undefined };
  }
  const noStock = (el) =>{
    const isOutOfStock = !el.availableForSale;
    if(isOutOfStock){
      console.log("Out of stock: ",el.id,el.title)
    }
    return isOutOfStock
  } 
  if (data.some(noStock) || optionalData.some(noStock)) {
    alert("Product not found.");
    window.location.href = "https://buckedup.com";
    return;
  }
  if (optionalProducts.length > 0) {
    optionalProduct(optionalData, selectedOptionalData);
  }
  data.filter(product => !product.isHidden).forEach((product, i) => {
    if (product.options.length > 1) {
      multipleOptionsProduct(product, i);
      return;
    }
    normalProduct(product);
  });
  if (!isKit)
    buyButton.forEach((btnArray) => {
      btnArray.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!btn.hasAttribute("disabled"))
            buy(data[buyButton.indexOf(btnArray)]);
        });
      });
    });
  else
    buyButton.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!btn.hasAttribute("disabled")) {
          if (selectedOptionalData && selectedOptionalData.selected)
            data.push(selectedOptionalData.selected)
          buy(btn, data);
        }
      });
    });
  toggleLoading();
}

main();

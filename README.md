# Scripts for handling shopify api calls on upcells with dropdowns

## How to put into instapage
### 1. Place this code into html/css head
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/Custom-Select@latest/style.css" />
<script src="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/Custom-Select@latest/custom-select.js" defer></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/dropdown-shopify@latest/src/scss/style.css" />
```
### 2. Place this code into a html block, where you want the product to be (one for each product) (change the 999 for the product id)
```
<div class="products-list prod-999">

</div>
```
### 3. Place this code and change as necessary into html/css footer
```
<script>
  const urlParams = new URLSearchParams(window.location.search);
  const origin = window.location.pathname.replace("/", "").replace("/", "");
  document.cookie =
    "offer_id=" + origin + "; path=/; domain=.buckedup.com;max-age=3600";
  localStorage.setItem("first_page", origin);

  //CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.

  urlParams.set("utm_source", "");

  // const country = "ca";

  const productsID = [999,999]; //ID of each the product
  const isKit = true;
  //if isKit false, array of arrays.
  const buyButtonsIds = ["#element-35"]; //IDs of each button of each product(in the order put in productID).
  const discountCode = ""

  //DONT CHANGE
  const buyButton = [];

  buyButtonsIds.forEach((ids) => {
    let buttons = [];
    if(!isKit){
      ids.forEach((id) => {
        buttons.push(document.querySelector(id));
      });
      buyButton.push(buttons);
    }
    else
      buyButton.push(document.querySelector(ids))
  });

  const row = {};
  productsID.forEach((id) => {
    row[id] = document.querySelector(`.products-list.prod-${id}`);
  });
  //CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.

  //CHANGE ONLY WHAT IS SAID TO CHANGE.
  const setDataLayer = (event, action, value, currency = undefined) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      step_count: "", //lp, us1, us2, us3, ds1, ty
      page_id: "", //OG-LP-OMO, pegar pelo query da url, passar pra frente.
      version_id: "", //v1-control, v2-dropdown, v2-modal
      event: event,
      action: action,
      value: value,
      currency: currency,
      transaction_id: undefined,
    });
  };

  const dataLayerStart = () => {
    setDataLayer((event = "pageview"), (action = "load"), (value = 0));
  };

  const dataLayerRedirect = () => {
    setDataLayer((event = "offerview"), (action = "viewaction"), (value = 0));
  };
</script>
```

### 4. Place this after the previous code:
```
<script src="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/dropdown-shopify@latest/src/js/scripts.js" type="module"></script>
```

## How to compile scss

### either install the compiler from the sass website, or install the vscode extension live sass compiler.
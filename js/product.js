const urlParams = new URLSearchParams(window.location.search);

const productId = urlParams.get("id");

const urlProduct = `https://kea-alt-del.dk/t7/api/products/${productId}`;

let newprice;

//fetch the data
fetch(urlProduct)
  .then((res) => res.json())
  .then((data) => showProduct(data));

//populate the page
function showProduct(product) {
  console.log(product);

  if (product.soldout) {
    document.querySelector("form button").textContent = "SOLD OUT";
  }

  document.querySelectorAll(".brand").forEach((item) => {
    item.textContent = product.brandname;
  });
  document.querySelectorAll(".productname").forEach((item) => {
    item.textContent = product.productdisplayname;
  });

  document.querySelector(
    ".breadcrumbs li:nth-child(3) a"
  ).href = `productlist.html?brand=${product.brandname}`;

  document.querySelector(
    "img.productimg"
  ).src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
  document.querySelector("img.productimg").alt = product.productdisplayname;
  document.querySelector(".price").textContent = `${product.price} DKK`;

  newprice = product.price * (1 - product.discount / 100);

  if (product.discount) {
    document.querySelector(".price").classList.add("cross");
    document.querySelector(
      ".newPrice"
    ).textContent = `${newprice.toFixed()} DKK`;
  }

  document.querySelector(".category").textContent = product.category;
  document.querySelector(".subcategory").textContent = product.subcategory;
  document.querySelector(".baseColour").textContent = product.basecolour;
  document.querySelector(".idNo").textContent = product.id;
  document.querySelector(".brandbio").textContent = product.brandbio;
}

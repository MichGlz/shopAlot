const urlParams = new URLSearchParams(window.location.search);

const brandId = urlParams.get("brand");

const urlBrand = `https://kea-alt-del.dk/t7/api/products?brandname=${brandId}&limit=12`;

const url = "http://kea-alt-del.dk/t7/api/products";

document.querySelector("main h2").textContent = brandId;

fetch(urlBrand)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  //console.log(data);
  data.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);
  //grab the template
  const template = document.querySelector("#smallProductTemplate").content;
  //clone it
  const copy = template.cloneNode(true);
  //change content
  copy.querySelector(
    ".subtle"
  ).textContent = `${product.articletype} | ${product.brandname}`;
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  copy.querySelector("img").alt = `
    ${product.brandname} ${product.productdisplayname}`;

  copy.querySelector(".price:not(span)").textContent = `DKK ${product.price},-`;

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }

  if (product.discount) {
    copy.querySelector("article").classList.add("onSale");
    let newPrice = product.price * (1 - product.discount / 100);
    copy.querySelector(
      ".discounted p"
    ).textContent = `Now DKK ${newPrice.toFixed()},-`;
    copy.querySelector(
      ".discounted p:nth-child(2)"
    ).textContent = `- ${product.discount}%`;
    copy.querySelector(".price").textContent = `Prev. DKK ${product.price},-`;
  }

  copy.querySelector("a").href = `product.html?id=${product.id}`;

  //grab parent
  const parent = document.querySelector("main");
  //append
  parent.appendChild(copy);
}

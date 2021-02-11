//-----------------------------------------------------
//casillas de letras
const abecedario = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
abecedario.forEach(creatSec);

function creatSec(letter) {
  console.log(letter);
  //grab the template
  const template = document.querySelector("#letter").content;
  //clone it
  const copy = template.cloneNode(true);
  //change content
  copy.querySelector("section").id = `letter_${letter}`;
  copy.querySelector("h2").textContent = letter.toUpperCase();

  //grab parent
  const parent = document.querySelector(".brandList");
  //append
  parent.appendChild(copy);
}

//casilla Num

const template = document.querySelector("#letter").content;
//clone it
const copy = template.cloneNode(true);
//change content
copy.querySelector("section").id = `Num`;
copy.querySelector("h2").textContent = "No.";

//grab parent
const parent = document.querySelector(".brandList");
//append
parent.appendChild(copy);
//----------------------------------------------------

//-------------------------------------------------
//Menu letters

abecedario.forEach(creatLi);

function creatLi(letter) {
  console.log(letter);
  //grab the template
  const template2 = document.querySelector("#liLetters").content;
  //clone it
  const copy = template2.cloneNode(true);
  //change content
  copy.querySelector("a").href = `#letter_${letter}`;
  copy.querySelector("a").textContent = letter.toUpperCase();

  //grab parent
  const parent = document.querySelector(".letterLinks ul");
  //append
  parent.appendChild(copy);
}

//menu Num

const template2 = document.querySelector("#liLetters").content;
//clone it
const copy2 = template2.cloneNode(true);
//change content
copy2.querySelector("a").href = `#Num`;
copy2.querySelector("a").textContent = "No.";

//grab parent
const parent2 = document.querySelector(".letterLinks ul");
//append
parent2.appendChild(copy2);
//--------------------------------------------

//------------------------------------------------
//links to brands

const url = "http://kea-alt-del.dk/t7/api/brands";

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

let i;
let n = 0;

function handleProductList(data) {
  //console.log(data);
  i = data.length;

  console.log(i);
  data.forEach(takeBrand);
}

function takeBrand(brand) {
  console.log(n);
  //grab the template
  const template2 = document.querySelector("#liBrand").content;
  //clone it
  const copy = template2.cloneNode(true);
  //change content
  copy.querySelector("li a").textContent = brand.brandname;
  copy.querySelector("li a").href = `productlist.html?brand=${brand.brandname}`;
  //grab parent

  let brandName = brand.brandname.toString();
  let firstLeter = brandName.charAt(0);
  let brandLower;
  let parentBrand;
  if (isNaN(firstLeter)) {
    brandLower = brandName.toLowerCase();
    console.log(brandLower);
    parentBrand = `#letter_${brandLower.charAt(0)} ol`;
  } else {
    brandLower = brandName.toString();
    parentBrand = `#Num ol`;
    console.log(brandLower);
  }
  const parent = document.querySelector(parentBrand);
  //append
  parent.appendChild(copy);
  n = n + 1;
  if (n == i) {
    removeOl();
  }
}

function removeOl() {
  console.log("removeOL()");
  document.querySelectorAll("section ol").forEach(removeP);
  function removeP(item) {
    if (item.childElementCount < 1) {
      // item.classList.add("empty");

      item.parentElement.remove();
    }
  }
}

// add produt in this array to show on the web page
const products = [
  {
    id: 0,
    name: "Cubelelo Drift 3M Pro",
    image: "image/Cubelelo Drift 3m pro 1.jpg",
    price: 899,
    discription: "discription of the products goes here",
  },
  {
    id: 1,
    name: "X-man tornado V2 M",
    image: "image/X-man tornado V2 M 1.jpg",
    price: 1899,
    discription: "discription of the products goes here",
  },
  {
    id: 2,
    name: "Gan 11 M Pro",
    image: "image/gan11mpro1.jpg",
    price: 3999,
    discription: "discription of the products goes here",
  },
  {
    id: 3,
    name: "Moyu RS3m 2020",
    image: "image/Moyu re3m 2020.jpg",
    price: 1100,
    discription: "discription of the products goes here",
  },
  {
    id: 4,
    name: "Yuxin Little Magic V2 M",
    image: "image/Yuxin Little Magic V2 M 1.jpg",
    price: 699,
    discription: "discription of the products goes here",
  },
  {
    id: 5,
    name: "GAN Mirror M",
    image: "image/GAN Mirror M.jpg",
    price: 2100,
    discription: "discription of the products goes here",
  },
];

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");

// display item into page
function displayProduct(productShow) {
  productContainer.innerHTML = "";

  productShow.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className =
      "d-inline-block col-12 col-sm-6 col-md-4 col-lg-3 p-0";
    productElement.innerHTML = `<div class="border border-dark rounded-2 d-flex flex-column m-2 p-2">
        <img src="${product.image}" alt="" class="" style='height:250px;'>
        <h3>${product.name}</h3>
        <div><b>price : ${product.price}₹</b></div>
        <div class="btn-group btn-group-sm m-1 w-25">
            <button class="cartbutton btn btn-primary " type="button" href="#" >-</button>
            <input inputmode="numeric" class="bg-light py-0 border-0 text-center" value="1" style="width: 75px;" min="1" size="3" disabled>
            <button class="cartbutton btn btn-primary " type="button" href="#" >+</button>
         </div>
        <button class="btn btn-danger my-1" type="button" >add to cart</button>
        <button class="btn btn-success my-1" type="button" >buy now</button>
    </div>`;
    productContainer.appendChild(productElement);
  });
}

// filter product in the page
function searchProduct() {
  const searchTerm = searchInput.value.toLowerCase();

  const filterSearchProcuct = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const productDiscription = product.discription.toLowerCase();

    return (
      productName.includes(searchTerm) ||
      productDiscription.includes(searchTerm)
    );
  });
  displayProduct(filterSearchProcuct);
}

searchInput.addEventListener("input", searchProduct);
displayProduct(products);

// for get search bar on click [shift]
const searchMessage = document.getElementById("search-message");
document.addEventListener("keypress", (pressedKey) => {
  const keys = pressedKey.key.toLowerCase();
  const isInputFocus = document.activeElement;
  if (
    searchInput.value === "" &&
    /[a-z]/i.test(keys.key) &&
    isInputFocus !== searchInput
  ) {
    searchMessage.style.display = "block";
    setTimeout(() => {
      searchMessage.style.display = "none";
    }, 3000);
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchInput.blur();
  }
  if (e.key === "Shift") {
    searchInput.focus();
  }
});

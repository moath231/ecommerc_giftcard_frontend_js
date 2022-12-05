//
//
//
//
//
//get items from json file START
function getitemfromjson() {
  let itemrequst = new XMLHttpRequest();
  itemrequst.withCredentials = true;
  itemrequst.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let itemsobj = JSON.parse(this.responseText);
      displayitem(itemsobj);
    }
  };

  //

  let item = " ";
  function displayitem(itemsobj) {
    //
    //  edit priceafter in json file START
    priceafterinjson(itemsobj);
    function priceafterinjson(itemsobj) {
      for (let i = 0; i < itemsobj.length; i++) {
        let pricefromtext = itemsobj[i].price;
        let priceremovesympol = pricefromtext.replace(/\D/g, "");
        itemsobj[i].priceafter = Math.ceil(
          priceremovesympol * (1 - itemsobj[i].discount * 0.01)
        );
      }
    }
    //edit priceafter in json file END

    let shopcard = document.querySelector(".shopcard");
    for (let i = 0; i < itemsobj.length; i++) {
      item += `
          <div
            class="all ${itemsobj[i].class} card col-lg-6"
            data-sale="${itemsobj[i].discount}"
            data-Priceafter="${itemsobj[i].priceafter}"
            >
            <img
              class="card-img-top"
              src="${itemsobj[i].imgURL}"
              alt="Card image"
              draggable="false"
            />
            <div class="card-body">
              <h4 class="card-title">${itemsobj[i].name}</h4>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span style="color: #007185">${itemsobj[i].numreviw}</span>
              <p class="card-text" data-width="">${itemsobj[i].price}</p>
              <a class="btn btn-primary btn-addtocart" ${"onclick=window.location.reload()"}>Add to cart</a>
            </div>
          </div>
    `;

      shopcard.innerHTML = item;
    }

    // price with sale Start
    // let cardpri = document.querySelectorAll(".shopcard .card");
    // let cardtexP = document.querySelector(".card-text");
    // cardpri.forEach((card) => {
    //   let beforeP = card.children[1].children[7].innerHTML;
    //   let afterP = beforeP.replace(/\D/g, "");
    //   if (afterP == null || afterP == 0) {
    //     let as = "";
    //     // cardtexP.style.display = "none";
    //     cardtexP.innerHTML = "<br>";
    //   } else {
    //     card.dataset.priceafter = Math.ceil(afterP * (1 - card.dataset.sale * 0.01));
    //   }
    // });
    // price with sale END

    //
    //
    //
    //fillter card START
    let limenu = document.querySelectorAll(".list-items a");
    let carddisplay = document.querySelectorAll(".card");

    limenu.forEach((a) => {
      a.addEventListener("click", displaycard);
    });

    function displaycard() {
      carddisplay.forEach((div) => {
        div.style.display = "none";
      });
      // console.log(document.querySelectorAll(this.dataset.catg));
      document.querySelectorAll(this.dataset.catg).forEach((card) => {
        card.style.display = "block";
      });
    }
    //
    // fillter card END
    //
    //
    //

    //
    //
    //
    // add to cart START
    fullcard = document.querySelectorAll(".card");
    btn = document.querySelectorAll(".card .btn");
    numberOfOrder = document.querySelector(".float span");

    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", () => {
        cartnumber(itemsobj[i]);
        totalcheckout(itemsobj[i]);
      });
    }

    function onloadcartnumber() {
      let productnumber = localStorage.getItem("cartnumber");
      if (productnumber) {
        document.querySelector(".float span").textContent = productnumber;
      }
    }

    function cartnumber(itemsobj) {
      let productnumber = localStorage.getItem("cartnumber");
      productnumber = parseInt(productnumber);

      if (productnumber) {
        localStorage.setItem("cartnumber", productnumber + 1);
        document.querySelector(".float span").textContent = productnumber + 1;
      } else {
        localStorage.setItem("cartnumber", 1);
        document.querySelector(".float span").textcontent = 1;
      }

      setitems(itemsobj);
    }

    function setitems(itemsobj) {
      let cartitem = localStorage.getItem("productInCart");
      cartitem = JSON.parse(cartitem);
      // console.log(cartitem);

      // console.log("obj cartitem", cartitem);
      // console.log("obj itemsobj", cartitem);

      if (cartitem != null) {
        if (cartitem[itemsobj.tag] == undefined) {
          cartitem = {
            ...cartitem,
            [itemsobj.tag]: itemsobj,
          };
        }
        cartitem[itemsobj.tag].incart += 1;
      } else {
        itemsobj.incart = 1;
        cartitem = {
          [itemsobj.tag]: itemsobj,
        };
      }

      localStorage.setItem("productInCart", JSON.stringify(cartitem));
    }

    function totalcheckout(itemsobj) {
      let totalcost = localStorage.getItem("totalcost");
      if (totalcost != null) {
        totalcost = parseInt(totalcost);
        localStorage.setItem("totalcost", totalcost + itemsobj.priceafter);
      } else {
        localStorage.setItem("totalcost", itemsobj.priceafter);
      }
    }

    function displaycart() {
      let cartitems = localStorage.getItem("productInCart");
      let costcheckout = localStorage.getItem("totalcost");

      cartitems = JSON.parse(cartitems);
      let cartALL = document.querySelector(".cartALL");
      let totalcheckout = document.querySelector(".totalcheckout");
      totalcheckout.innerHTML = costcheckout;

      if (cartitems && cartALL) {
        cartALL.innerHTML = ` `;
        Object.values(cartitems).map((items) => {
          cartALL.innerHTML += `
          <li class="cartproduct">
            <div class="cd-cart__image">
              <a href="#0"
                ><img
                  src="${items.imgURL}"
                  alt="${items.name}"
              /></a>
            </div>
            <h3 class="truncate"><a href="#0">${items.name}</a></h3>
            <div class="cd-cart__price">$${
              items.priceafter * items.incart
            }</div>
            <div class="cd-cart__actions">
              <span Hidden style="cursor: pointer;" id="cart__delete" class="cd-cart__delete-item">Delete</span>
              <div class="cd-cart__quantity">
                <label for="cd-product-'+ productId +'">Qty</label
                ><span class="cd-cart__select"
                  ><select class="reset" id="cd-product-" name="quantity">
                    <option value="${items.incart}">${items.incart}</option>
                  </select>
                </span>
              </div>
            </div>
          </li>
          `;
        });
      }

    }

    onloadcartnumber();
    displaycart();

    // window.location.reload();
    //add to cart END
    //
    //
    //
  }

  //
  itemrequst.open("GET", "./assets/js/product.json", true);

  itemrequst.send();
}

getitemfromjson();


//get items from json file END
//
//
//
//
//
//

document.querySelector("#clearall").onclick = function(){
  localStorage.removeItem("productInCart");
  localStorage.removeItem("cartnumber");
  localStorage.removeItem("totalcost");
  window.location.reload();

}

//
//
// cart shop START
let my_float = document.querySelector(".float");
let popupdark = document.querySelector(".popupcart");

let popupcart = document.querySelector(".popup");
let checkout = document.querySelector(".cd-cart__checkout");
my_float.onclick = function () {
  popupdark.style.display = "block";
  popupcart.style.display = "block";
  checkout.style.display = "block";
};
window.onclick = function (event) {
  if (event.target == popupdark) {
    popupdark.style.display = "none";
    popupcart.style.display = "none";
    checkout.style.display = "none";
  }
};
// cart shop END
//
//
//



//
//
//
//
// checkout

let numofcart = localStorage.getItem("cartnumber");
if (numofcart > 0) {
  document.querySelector(".cd-cart__checkout").href = "checkout.html";
}
else {
  document.querySelector(".cd-cart__checkout").removeAttribute("href");
}

//














// const data = null;

// const xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === this.DONE) {
//     console.log(this.responseText);
//   }
// });

// xhr.open(
//   "GET",
//   "https://bitcoin-address-generator1.p.rapidapi.com/gen_bitcoin"
// );
// xhr.setRequestHeader(
//   "X-RapidAPI-Key",
//   "7d62566b59msh375d04d8f8ca907p1073f3jsnd05c598c5e26"
// );
// xhr.setRequestHeader(
//   "X-RapidAPI-Host",
//   "bitcoin-address-generator1.p.rapidapi.com"
// );

// xhr.send(data);

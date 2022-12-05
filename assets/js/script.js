$(document).ready(function () {
  $(".logo-carousel").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
});

//
//
//
//END

//
//
//
//
// BTC api START
//
function btc() {
  var xmlhttp = new XMLHttpRequest();
  var url = "https://api.coindesk.com/v1/bpi/currentprice.json";

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      parseJson(json);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  function parseJson(json) {
    var time = "<b>Last Updated : " + json["time"]["updated"] + "</b>";
    var usdValue = json["bpi"]["USD"]["rate"];
    var gbpValue = "1 BTC equals to &pound;" + json["bpi"]["GBP"]["rate"];
    var euroValue = "1 BTC equals to &euro;" + json["bpi"]["EUR"]["rate"];

    let databtc = document.getElementById("data");
    databtc.innerHTML = "1 BTC = $" + usdValue;
  }
}
btc();
//  BTC api END
//
//
//

// hide fillter sidbar strat

  let filtter = document.querySelector(".wrapper");
  let target = document.querySelector(".footer");
  let fa = document.querySelector(".X");
  window.onscroll = function () {
    if (window.scrollY >= target.offsetTop - 650) {
      filtter.style.display = "none";
    } else {
      filtter.style.display = "block";
    }
  };
// hide fillter sidbar end

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
// sidebar toggle submenu START
//
//
$("#sidebar li a").click(function () {
  $(this).parent().toggleClass("active");
});
// sidebar toggle submenu END
//
//

//
//
//
// step by step proccess START
  var currentTab = 0; // Current tab is set to be the first tab (0)
  showTab(currentTab); // Display the current tab

  function showTab(n) {
    // This function will display the specified tab of the form...
    let x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    //... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == x.length - 1) {
      document.getElementById("nextBtn").style.display = "inline";
    } else {
      document.getElementById("nextBtn").innerHTML = "Next";
    }
    if (n > 3) {
      document.getElementById("nextBtn").style.display = "none";
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("nextBtn").style.display = "inline";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n);
  }

  function nextPrev(n) {
    // This function will figure out which tab to display
    let x = document.getElementsByClassName("tab");

    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
      // ... the form gets submitted:
      document.getElementById("regForm").submit();

      return false;
    }
    // Otherwise, display the correct tab:

    showTab(currentTab);
    radriopayment(n);
  }

  function validateForm() {
    // This function deals with validation of the form fields
    let x,
      y,
      i,
      valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");

    req1 = /^[a-zA-Z ]+$/;
    const reqemail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";

        y[i].placeholder = "You can't leave it blank";
        // and set the current valid status to false
        valid = false;
      }
    }

    if (valid) {
      for (j = 0; j < y.length; j++) {
        if (y[j].name == "datemin") {
          break;
        }
        if (y[j].name == "fav_language") {
          break;
        }

        if (!req1.test(y[0].value)) {
          y[0].className += " invalid";
          y[0].value = "It should only be a name";
          valid = false;
        }
        if (!reqemail.test(y[1].value)) {
          y[1].className += " invalid";
          y[1].value = "It must be an email";
          valid = false;
        }
      }
    }

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className +=
        " finish";
    }
    return valid; // return the valid status
  }

  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    let i,
      x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    // x[n].className += " active";
  }
  displaycheckoutinfo();
//
//
//
//
//END

//
//
//
//
//
// info card on checkout page

function displaycheckoutinfo() {
  let cartitems = localStorage.getItem("productInCart");
  let costcheckout = localStorage.getItem("totalcost");
  let cartunm = localStorage.getItem("cartnumber");

  cartitems = JSON.parse(cartitems);

  let col_25 = document.querySelector(".col-25");

  col_25.innerHTML = `
      <div class="container">
          <h4>
            Cart
            <span class="price" style="color: black"
              ><i class="fa fa-shopping-cart"></i> <b>${cartunm}</b></span
            >
          </h4>
          <div class="productandprice">
          </div>
          <hr/>
          <p>
            Total <span class="price" style="color: black"><b>$${costcheckout}</b></span>
          </p>
          <p id="cryptototalP">
            Total <span class="price" style="color: black"><b style="color: orange;" id="cryptototal"></b></span>
          </p>
        </div>
      </div>
      `;

  let productandprice = document.querySelector(".productandprice");
  productandprice.innerHTML = " ";
  Object.values(cartitems).map((items) => {
    productandprice.innerHTML += `
          <p><a>${items.tag} Qty(${items.incart})</a> <span class="price">$${
      items.priceafter * items.incart
    }</span></p>
          `;
  });
}
//
//
//
//
//
// END

// get value from radeo button and creat qr code
//
//
//
//
let selectedSize;
let counter = 0;
function radriopayment(n) {
  const btn = document.querySelector("#nextBtn");
  const radioButtons = document.querySelectorAll('input[name="fav_language"]');
  const qrimg =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
  if (n == 1 && counter < 2) {
    counter += 1;
  } else {
    btn.addEventListener("click", () => {
      let selectedSize;
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          selectedSize = radioButton.value;
          selectedname = radioButton.id;
          priceprice(selectedname);
          break;
        }
      }

      document.querySelector(".addresscryprto").innerHTML = `${selectedSize}`;
      document.querySelector(".QR img").src = qrimg + `${selectedSize}`;

      // timer
      var fiveMinutes = 60 * 15,
        display = document.querySelector("#timer");
      startTimer(fiveMinutes, display);

      //
    });
  }
}
//
//
//
//
//END

//
//
//
//
//
// Start timer
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

//
//
//
//
//
//
//
//
//start

// (function () {
//   const second = 1000,
//     minute = second * 60,
//     hour = minute * 60,
//     day = hour * 24;

//   //I'm adding this section so I don't have to keep updating this pen every year :-)
//   //remove this if you don't need it
//   let today = new Date();
//   let dayB = 8, monthB = 5;
//   let daysaleend = dayB + "/" + monthB + "/";


//   let dd = String(today.getDate()).padStart(2, "0"),
//     mm = String(today.getMonth() + 1).padStart(2, "0"),
//     yyyy = today.getFullYear(),
//     nextYear = yyyy + 1,
//     dayMonth = daysaleend,
//     birthday = dayMonth + yyyy;

//   today = mm + "/" + dd + "/" + yyyy;

//   if (today > birthday) {
//     // birthday = dayMonth + nextYear;
//     dayB +=1;

//   }
//   //end

//   const countDown = new Date(birthday).getTime(),
//     x = setInterval(function () {
//       const now = new Date().getTime(),
//         distance = countDown - now;

//       (document.getElementById("days").innerText = Math.floor(distance / day)),
//         (document.getElementById("hours").innerText = Math.floor(
//           (distance % day) / hour
//         )),
//         (document.getElementById("minutes").innerText = Math.floor(
//           (distance % hour) / minute
//         )),
//         (document.getElementById("seconds").innerText = Math.floor(
//           (distance % minute) / second
//         ));

//       //do something later when date is reached
//       if (distance < 0) {
//         dayB +=1;
//         // document.getElementById("headline").innerText = "It's my birthday!";
//         // document.getElementById("countdown").style.display = "none";
//         // document.getElementById("content").style.display = "block";
//         // clearInterval(x);

//       }
//       //seconds
//     }, 0);
// })();


//end
//
//
//END

//
//
//
//
// auto copy crypto address
function autocopy() {
  let copyText = document.querySelector(".addresscryprto");
  copyText.innerHTML;
  navigator.clipboard.writeText(copyText.innerHTML);

  document.querySelector(".autocopy").innerHTML = "Copied to clipboard";
  setTimeout(function () {
    document.querySelector(".autocopy").innerHTML = " ";
  }, 1000);
}
//
//
//
// END

//
//
//
//
//
//  function to local storage crypto price and print on total
  let cryptototalP = document.querySelector("#cryptototalP");
  cryptototalP.style.display = "none";
  function priceprice(selectedSize) {
    let cryptototal = document.querySelector("#cryptototal");

    if (selectedSize == "BTC") {
      cryptototalP.style.display = "block";
      cryptototal.innerHTML =
        "BTC: " +
        (
          localStorage.getItem("totalcost") / localStorage.getItem("btcprice")
        ).toFixed(4);
      cryptototal.style.color = "orange";
    } else if (selectedSize == "XMR") {
      cryptototalP.style.display = "block";
      cryptototal.innerHTML =
        "XMR: " +
        (
          localStorage.getItem("totalcost") / localStorage.getItem("XMRprice")
        ).toFixed(4);
      cryptototal.style.color = "#f60";
    } else if (selectedSize == "USDT") {
      cryptototalP.style.display = "block";
      cryptototal.innerHTML =
        "USDT: " +
        (
          localStorage.getItem("totalcost") / localStorage.getItem("USDTprice")
        ).toFixed(4);
      cryptototal.style.color = "#26a17b";
    } else if (selectedSize == "ETH") {
      cryptototalP.style.display = "block";
      cryptototal.innerHTML =
        "ETH: " +
        (
          localStorage.getItem("totalcost") / localStorage.getItem("ETHprice")
        ).toFixed(4);
      cryptototal.style.color = "#444971";
    } else if (selectedSize == "BUST") {
      cryptototalP.style.display = "block";
      cryptototal.innerHTML =
        "BUST: " +
        (
          localStorage.getItem("totalcost") / localStorage.getItem("BUSTprice")
        ).toFixed(4);
      cryptototal.style.color = "#f3ba2f";
    } else if (selectedSize == "DOGE") {
      cryptototalP.style.display = "block";
      cryptototal.innerHTML =
        "DOGE: " +
        (
          localStorage.getItem("totalcost") / localStorage.getItem("DOGEprice")
        ).toFixed(4);
      cryptototal.style.color = "#dec270";
    } else if (selectedSize == "ltc") {
      //ltcprice;
      cryptototalP.style.display = "block";
      cryptototal.innerHTML =
        "ltc: " +
        (
          localStorage.getItem("totalcost") / localStorage.getItem("ltcprice")
        ).toFixed(4);
        cryptototal.style.color = "#00aeff";
    } else if (selectedSize == "BCH") {
      //ltcprice;
      cryptototalP.style.display = "block";
      cryptototal.innerHTML =
        "BCH: " +
        (
          localStorage.getItem("totalcost") / localStorage.getItem("bchprice")
        ).toFixed(4);
        cryptototal.style.color = "#8dc351";
    }
  }
//
//
//
//
//
//
//
//
//
//
//
//END

//
//
//
//
//
// price all crypto START
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    let btc = JSON.parse(this.responseText);

    // console.log(btc["data"]["coins"][0]["price"]);
    // console.log(btc["data"]["coins"]);
    localStorage.setItem("btcprice", btc["data"]["coins"][0]["price"]);
    localStorage.setItem("XMRprice", btc["data"]["coins"][29]["price"]);
    localStorage.setItem("USDTprice", btc["data"]["coins"][2]["price"]);
    localStorage.setItem("ETHprice", btc["data"]["coins"][1]["price"]);
    localStorage.setItem("BUSTprice", btc["data"]["coins"][4]["price"]);
    localStorage.setItem("DOGEprice", btc["data"]["coins"][10]["price"]);
    localStorage.setItem("ltcprice", btc["data"]["coins"][25]["price"]);
    localStorage.setItem("bchprice", btc["data"]["coins"][32]["price"]);
  }
});

xhr.open(
  "GET",
  "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0"
);
xhr.setRequestHeader(
  "X-RapidAPI-Key",
  "7d62566b59msh375d04d8f8ca907p1073f3jsnd05c598c5e26"
);
xhr.setRequestHeader("X-RapidAPI-Host", "coinranking1.p.rapidapi.com");

xhr.send(data);
// price all crypto END
//
//
//
//

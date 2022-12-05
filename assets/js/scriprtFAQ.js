var mycompan = "giftvipcard";

// puplic
//
//
//
//
let FAQQ = [
  "How quickly do I get my gift card or recharge?",
  "How do I buy Bitcoin and cryptos?",
  "What if my Bitcoin wallet doesn’t support a payment?",
  "What countries does giftvipcard work in?",
  "What operators does giftvipcard support for mobile top ups?",
  "I don’t find the operator I am looking for.",
  "Which gift cards can I buy at giftvipcard?",
  "I don’t find the product / gift card I am looking for.",
  "What to do if my payment is expired?",
  "How long does it take for giftvipcard to process a refund?",
  "How long does it take to receive my gift card to be emailed to me?",
  "What is your refund policy? ",
  "I have made the payment but I haven’t received the product / the product didn’t arrrive. What can I do?",
  "What information does giftvipcard need from me to do a Bitcoin payment?",
  "I sent Bitcoin or crypto to the wrong address. What can I do?",
  "I bought a gift card for the wrong country. What can I do?",
  "How do I use giftvipcard?",
  "What cryptocrrncy wallets supports giftvipcard?",
  "What forms of payment do you accept in giftvipcard?",
  "Why is there a 15-minute countdown timer on the order?",
  "How can I buy Steam Gift Cards at giftvipcard?",
  "How can I buy a Gift Card at giftvipcard?",
  "Which cryptocurrencies do you accept?",
  "I love your giftvipcard. Can I help promote it?",
  "Do gift cards work internationally?",
];

let FAQA = [
  "As soon as your transaction reaches sufficient confirmations on the network, the code/pin of the gift card will be sent to the email address. Although this happens almost instantly once the transaction is confirmed in most of the time, there could be delays up to an hour in receiving your product. Please also check your spam folder in your email. If you haven’t received the product, please contact us at >contact us.",
  "There’s many ways to buy Bitcoin and cryptos with different payment methods which can change from country to country. We suggest you to make yourself familiar with buying Bitcoin, Bitcoin wallets, and how to keep them secure. It’s easy to find where to buy Bitcoins online but not so easy to learn the best way to buy Bitcoins in your country. Check this website https://99bitcoins.com/buy-bitcoin/ to find out how you can buy Bitcoin and this one  https://www.buybitcoinworldwide.com/ for your country.",
  "You can think about paying with Bitcoin similar to sending an email. The difference is that instead of sending a text to an email address, you’re sending a digital currency to a Bitcoin address. So every Bitcoin wallet should support making a payment and giftvipcard works with all Bitcoin wallets. Be sure that you have sufficient amount in your wallet before making a payment.",
  "giftvipcard works globally,The card will be sent to you automatically according to your IP.",
  "giftvipcard supports over 600 mobile operators worldwide. The chances are we support the mobile operator you ask for.",
  "Please let us know the brand name and the country at 'Contact Us' and we will add it in.",
  "We offer hundreds of gift cards and vouchers to spend your Bitcoin and crypto for some of the most popular brands around the world including Amazon, Steam, Google Play, iTunes, Hotels.com, Mastercard and Visa prepaid cards and more. You can browse all our products at giftvipcard.com and discover ways to use their crypto on real-world goods and services.",
  "Please let us know the brand name and the country at 'Contact Us' and we will add it in.",
  "Because of the floating exchange rates of BTC and crypto prices, we give you a price in Bitcoin or other crypto which is valid for 15 minutes to make your payment. If these 15 minutes passed before you start your payment, please don’t send any Bitcoin or crypto. You can always start your payment over again.",
  "We will process the refund once when we receive an amount lower than the actual price or the product is not delivered to you. If you believe these might be the case, please send an email to 'Contact Us' and we will proceed with the refund for the amount you’ve sent to us within 1 workday. If these are not the cases, you might then have sent the Bitcoin and crypto amount to the wrong receiving address or entered a wrong email or phone number. Unfortunately, we cannot reverse or refund transactions in these cases.",
  "As soon as your transaction reaches sufficient confirmations on the network, the code/pin of the product will be sent to the email address. Although this happens almost instantly most of the time once the transaction is confirmed, there could be delays up to an hour in receiving your product. Please also check your spam folder in your email.",
  "We refund if we receive an amount lower than the actual price of the product or the product is not delivered to you although you sent the correct amount. Unfortunately, we can’t refund if you sent the Bitcoin and crypto amount to the wrong receiving address or entered a wrong email or phone number for the top up products.",
  "Although very rare, there could be delays up to an hour in receiving your product. If you haven’t received the product after an hour, we apology if this is the case and for any inconvinience this might have caused. Please contact us. Please also check your spam folder in your email.",
  "Your privacy is our first priority in giftvipcard. The only information need is an email address that we send your order details, product code/pin and the instructions to use it  if you are buying top ups.",
  "Unfortunately, we cannot reverse or refund transactions if you have sent your Bitcoin and crypto to an address other than the one displayed on the payment page.",
  "Do not worry,giftvipcard works globally,The card will be sent to you automatically according to your IP.",
  "Check out our page here: https://giftvipcard.com/howitwork.html.If you would like to know how to use giftvipcard for buying specific products such as Google Play, iTunes, Steam or Amazon Gift Cards.",
  "giftvipcard works with all cryptocrrncy wallets.",
  "giftvipcard currently accepts Bitcoin, monero and ethereum. We work hard to add other cryptocurrencies in our system as well. Once we add new cryptocurrencies as a form of payment you will see them in your order page. We will be also sharing the availability of new cryptocurrencies on our social media channels.",
  "Because of the floating exchange rates of BTC and crypto prices, we give you a price in Bitcoin or crypto for 15 minutes. If 15 minutes passed you can always start your payment over again and if BTC or crypto price is the same, you will always pay the same price to buy with the same BTC or crypto amount.",
  "You can buy Steam Gift Card Codes and Wallet Codes from giftvipcard and use them to add money into Steam Wallets and spend that balance to buy variety of games and great content on Steam.",
  "1. Choose a gift card: giftvipcard supports thousands of Gift Cards.   2. Add to card: giftvipcard offers the most competitive prices. 3. Pay with crypto: You can pay with Bitcoin or other cryptocurrencies.",
  "We currently support Bitcoin, monero and ethereum. Please let us know at 'Contact Us' for the cryptocurrency you would like to see at giftvipcard next.",
  "Absolutely. We love you too! Please use our social media channels and let people know about us: Twitter – Please follow us and tweet about us Facebook – Please like and share our page",
  "Some gift cards will work globally.",
];
//
//
//
//end


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

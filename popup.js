// Future JavaScript will go here

onload = setTimeout(init, 1000);

var productIdInput, headerPara, responseBlock, discountedPrice, mrpPrice, percentageOff, getPriceButton, backToHome, goToProductPage, productNameLabel;
function init () {
    productIdInput = document.getElementById("productIdInput");
    headerPara = document.getElementById("headerPara");
    responseBlock = document.getElementById("responesBlock");
    discountedPrice = responseBlock.getElementsByTagName("strong")[0];
    mrpPrice = responseBlock.getElementsByTagName("s")[0];
    percentageOff = responseBlock.getElementsByTagName("span")[0];
    getPriceButton = document.getElementById("getPriceButton");
    backToHome = document.getElementById("backToHome");
    goToProductPage = document.getElementById("goToProductPage");
    productNameLabel= document.getElementById("productNameLabel");


    getPriceButton.addEventListener("click", goButton);
    // productIdInput.value = "2471425";
    backToHome.addEventListener("click", navigateHome);
    productIdInput.addEventListener("click", productIdInputClicked);
}

function goButton () {

    // headerPara.innerHTML ="JS RUNNING";
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        // var url = "https://www.myntra.com/2471425";
        var url = "https://www.myntra.com/" + productIdInput.value;
        xhr.open("GET", url, true);
    } else {
        // CORS not supported.
        xhr = null;
    }

    if (!xhr) {
        headerPara.innerHTML ="CORS ERROR";
        return;
    }

    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            try {
                onSearchRespone(xhr);
            } catch(e) {
                productIdInput.value = "Invalid Product ID";
            }
        }
    }
    // setInterval(goButton, 5000);
}

function onSearchRespone(xhr){

    var result = xhr.responseText;
    // headerPara.innerHTML =result;
    result = result.split("window.__myx =");
    result = result[1].split("</script>");
    result = JSON.parse(result[0]);

    var price = result.pdpData.price;
    productNameLabel.innerText =  result.pdpData.name;
    discountedPrice.innerText = "Rs. "+ price.discounted;
    mrpPrice.innerText = "Rs. "+ price.mrp;
    percentageOff.innerText = price.discount.label;


    // headerPara.style.display = "none";
    responseBlock.style.display = "block";
    goToProductPage.href = xhr.responseURL;
}

function navigateHome() {
    responseBlock.style.display = "none";
    headerPara.style.display = "block";
}

function productIdInputClicked() {
    if(productIdInput.value ===  "Invalid Product ID"){
        productIdInput.value = "";
    }

}


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log(message);
}
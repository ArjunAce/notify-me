var xhr = new XMLHttpRequest();
var currentVal = -1;

function goButton () {
    if ("withCredentials" in xhr) {
        var url = "https://www.myntra.com/2471425";
        xhr.open("GET", url, true);
    } else {
        xhr = null;
    }

    if (!xhr) {
        console.log("CORS ERROR");
        return;
    }
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            try {
                onSearchRespone(xhr);
            } catch(e) {
                console.log("Invalid Product ID");
            }
        }
    }
}

function onSearchRespone(xhr){
    var result = xhr.responseText;
    result = result.split("window.__myx =");
    result = result[1].split("</script>");
    result = JSON.parse(result[0]);
    var price = result.pdpData.price;
    console.log(price.discounted);
    if(currentVal === price.discounted) {
        return;
    }
    currentVal =  price.discounted;
    var notiMessage = "Current Price: " + price.discounted +"\nMRP: " + price.mrp + "\nDiscount: " +  price.discount.label;
    var noti ={
        type: "basic",
        iconUrl: "icon.png",
        title: result.pdpData.name,
        message: notiMessage
    };
    chrome.notifications.create("notiId", noti);
}
setTimeout(goButton, 3000);
setInterval(goButton, 30 * 60 * 1000);

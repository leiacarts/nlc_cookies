console.log(document.cookie)

// let size = 100;

let cookieelement = document.getElementById('cookieImg');

console.log(getCookie("cookie_size")); //string

// let size = getCookie("cookie_size"); //wont always accept string as part of equation
//can let size = 0 then size=parse (no let)
let size = parseInt(getCookie("cookie_size")); //turns string into integer

//ONE WAY
// let size;
// if checkCookie("cookie_size"){
//     size = parseInt(getCookie("cookie_size"));
// } else {
//     size = 100;
// }

//ANOTHER WAY
// let size = parseInt(getCookie("cookie_size")) || 100;

cookieImg.addEventListener("mousedown", function () {
    size++;
    this.style.width = size + "px";
    this.style.height = size + "px";

    setCookie("cookie_size", size, 999)

    console.log(size)
})

const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
console.log(document.cookie);
let cookieElement = document.getElementById("cookieImg");

// // ONE WAY
// let size;

// if (checkCookie("cookie_size")){
//     size = parseInt(getCookie("cookie_size"));
// } else {
//     size = 100;
// }

let size = parseInt(getCookie("cookie_size")) || 100;

cookieImg.style.width = size + "px";
cookieImg.style.height = size + "px";

cookieImg.addEventListener("mousedown", function () {
	size++;
	this.style.width = size + "px";
	this.style.height = size + "px";

	setCookie("cookie_size", size, 999);
});

const deleteAllCookies = () => {
	const cookies = document.cookie.split(";");

	for (const cookie of cookies) {
		const eqPos = cookie.indexOf("=");
		const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
};

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie(cname) {
	if (!getCookie(cname) === undefined) {
		return true;
	} else {
		return false;
	}
}

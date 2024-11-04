function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	};
	return "";
};

function checkLoginStatus() {
	if (getCookie("username") == "") {
        window.location.href = "https://tsasofficial.github.io/login";
    }
}

function sessionNotStartedCheck() {
	if (getCookie("iniframe") !== "true") {
        window.location.href = "https://tsasofficial.github.io/startsession";
    }	
}

if (getCookie("iniframe") == "true") {
	if (window.self == window.top) {
		window.location.href = "https://tsasofficial.github.io/members/logout";
	}
}
if (window.self !== window.top) {
	sessionNotStartedCheck();
} else {
	checkLoginStatus();
};

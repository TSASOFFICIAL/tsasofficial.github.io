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

if (getCookie("username") == "") {
	window.location.href = "https://tsasofficial.github.io/login";
};

var a_element = document.getElementById("logout_a");

   if (a_element) { // Check if a_element is not null
       if (getCookie("usingmicrosoftaccount") == "true") {
           a_element.setAttribute("href", "microsoftlogout");
       }
   };

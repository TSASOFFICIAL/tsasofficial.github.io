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
	}
	return "";
}
if (getCookie("username") == "") {
	window.location.href = "https://tsasofficial.github.io/login";
}

let logout_element = document.querySelector('logout_a');
var a_element = document.getElementById('logout_a');

if (getCookie("usingmicrosoftaccount") == "true") {

            if (logout_element) {
                a_element.setAttribute("href", "microsoftlogout");
            }
          
        }

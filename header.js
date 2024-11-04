document.addEventListener("DOMContentLoaded", function() {
    // Insert elements into the header with ID 'header'
    const header = document.getElementById('header');

    // Check if the header element exists
    if (!header) {
        console.error("Header element with ID 'header' not found.");
        return;
    }

    // Create the logo div
    const logoDiv = document.createElement('div');
    logoDiv.className = 'logo';

    const img = document.createElement('img');
    img.src = 'https://tsasofficial.github.io/images/header.png';
    img.height = 30;

    logoDiv.appendChild(img);
    header.appendChild(logoDiv);

    // Create the navigation menu
    const nav = document.createElement('nav');

    const ul = document.createElement('ul');
    ul.className = 'nav-links';

    // Define menu items
    const menuItems = [
        { text: 'Home', href: 'https://tsasofficial.github.io/', target: '_self' },
        { text: 'Shows', href: 'https://tsasofficial.github.io/theshow', target: '_self' },
        { text: 'Settings', href: 'https://tsasofficial.github.io/login', target: '_self' }
    ];

    // Populate the menu
    menuItems.forEach(item => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.href;
        link.target = item.target

        const div = document.createElement('div');
        div.className = 'normal_font';
        div.textContent = item.text;

        if (item.href) {
            link.appendChild(div);
            li.appendChild(link);
        } else {
            li.appendChild(div); // For 'Home' as a non-link item
        }

        ul.appendChild(li);
    });

    nav.appendChild(ul);
    header.appendChild(nav);

    // Create the logout button
    const loginLink = document.createElement('a');
    loginLink.id = 'login_a';
    loginLink.href = 'https://tsasofficial.github.io/login';

    const button = document.createElement('button');
    button.className = 'butt';

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'normal_font';

    const loginFont = document.createElement('font');
    loginFont.id = 'login_font';
    loginFont.size = 4;
    loginFont.textContent = 'Login';

    buttonDiv.appendChild(loginFont);
    button.appendChild(buttonDiv);
    loginLink.appendChild(button);
    header.appendChild(loginLink);
});

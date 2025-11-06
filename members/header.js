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
    
    // Create the anchor element
    const logoLink = document.createElement('a');
    logoLink.href = 'https://tsasofficial.github.io/members';
    
    // Create the image element
    const img = document.createElement('img');
    img.src = 'https://tsasofficial.github.io/images/header.png';
    img.height = 30;
    
    // Append the image to the anchor, then anchor to the logo div
    logoLink.appendChild(img);
    logoDiv.appendChild(logoLink);
    
    // Finally, append the logo div to the header
    header.appendChild(logoDiv);
    
    // Create the navigation menu
    const nav = document.createElement('nav');

    const ul = document.createElement('ul');
    ul.className = 'nav-links';

    // Define menu items
    const menuItems = [
        { text: 'Home', href: 'https://tsasofficial.github.io/members', target: '_self' },
        { text: 'Shows', href: 'https://tsasofficial.github.io/members/theshow', target: '_self' },
        { text: 'YT Channel', href: 'https://www.youtube.com/@TSASOfficial69', target: '_blank' },
        { text: 'Settings', href: 'https://tsasofficial.github.io/members/settings', target: '_self' }
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
    const logoutLink = document.createElement('a');
    logoutLink.id = 'logout_a';
    logoutLink.href = 'https://tsasofficial.github.io/members/logout';

    const button = document.createElement('button');
    button.className = 'butt';

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'normal_font';

    const logoutFont = document.createElement('font');
    logoutFont.id = 'logout_font';
    logoutFont.size = 4;
    logoutFont.textContent = 'Logout';

    buttonDiv.appendChild(logoutFont);
    button.appendChild(buttonDiv);
    logoutLink.appendChild(button);
    header.appendChild(logoutLink);

    /*
    
    // Modify logout link based on cookies
    if (getCookie('usingmicrosoftaccount') === 'true') {
        logoutLink.href = 'https://tsasofficial.github.io/members/microsoftlogout';
    } else if (getCookie('iniframe') === 'true') {
        logoutFont.textContent = 'End Session';
    }

    */
});

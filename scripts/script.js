document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');

    menuIcon.addEventListener('click', function() {
        nav.classList.toggle('responsive');
        if (nav.classList.contains('responsive')) {
            // Add a class to the body to prevent scrolling when the menu is open
            document.body.classList.add('menu-open');
        } else {
            // Remove the class when the menu is closed
            document.body.classList.remove('menu-open');
        }
    });
});

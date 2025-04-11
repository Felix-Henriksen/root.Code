document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const backdrop = document.querySelector('.menu-backdrop');
    let isMenuOpen = false;
    
    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            this.classList.toggle('active');
            navbar.classList.toggle('active');
            backdrop.classList.toggle('active');
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });
    }
    
    // Close menu when backdrop is clicked
    if (backdrop) {
        backdrop.addEventListener('click', function() {
            if (isMenuOpen) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                backdrop.classList.remove('active');
                
                // Also close any open submenus
                document.querySelectorAll('.dropdown-content.show').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
                
                isMenuOpen = false;
                document.body.style.overflow = '';
            }
        });
    }
    
    // Handle dropdown menus in mobile view
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const backArrow = dropdown.querySelector('.dropdown-back-arrow');
        
        if (dropdownLink && dropdownContent) {
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdownContent.classList.add('show');
                }
            });
        }
        
        if (backArrow) {
            backArrow.addEventListener('click', function(e) {
                e.preventDefault(); // Add this to prevent default action
                dropdownContent.classList.remove('show');
            });
        }
    });
    
    // Reset menu state on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (navbar) navbar.classList.remove('active');
            if (backdrop) backdrop.classList.remove('active');
            
            // Hide all mobile dropdowns
            document.querySelectorAll('.dropdown-content.show').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
            
            isMenuOpen = false;
            document.body.style.overflow = '';
        }
    });

    if (window.location.hash) {
        // Get the element with that ID
        const element = document.querySelector(window.location.hash);
        
        // If it's a details element, open it
        if (element && element.tagName === 'DETAILS') {
            element.setAttribute('open', '');
        }
    }
});
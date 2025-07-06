/**
 * Shared navigation component for multiple pages
 */
function createNavigation(currentPage = '') {
  return `
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-8">
            <div class="flex-shrink-0">
              <h1 class="text-xl font-bold text-gray-900">Yield Search Demo</h1>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a href="index.html" class="nav-link ${currentPage === 'home' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}">
                  Home
                </a>
                <a href="products.html" class="nav-link ${currentPage === 'products' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}">
                  Products
                </a>
                <a href="groceries.html" class="nav-link ${currentPage === 'groceries' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}">
                  Groceries
                </a>
                <a href="search-box.html" class="nav-link ${currentPage === 'search-box' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}">
                  Search Box
                </a>
                <a href="demo1.html" class="nav-link ${currentPage === 'demo1' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}">
                  Demo 1
                </a>
              </div>
            </div>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button type="button" class="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile menu -->
        <div class="mobile-menu hidden md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <a href="index.html" class="nav-link block px-3 py-2 text-base font-medium ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}">
              Home
            </a>
            <a href="products.html" class="nav-link block px-3 py-2 text-base font-medium ${currentPage === 'products' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}">
              Products
            </a>
            <a href="groceries.html" class="nav-link block px-3 py-2 text-base font-medium ${currentPage === 'groceries' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}">
              Groceries
            </a>
            <a href="search-box.html" class="nav-link block px-3 py-2 text-base font-medium ${currentPage === 'search-box' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}">
              Search Box
            </a>
            <a href="demo1.html" class="nav-link block px-3 py-2 text-base font-medium ${currentPage === 'demo1' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}">
              Demo 1
            </a>
          </div>
        </div>
      </div>
    </nav>
  `;
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

/**
 * Add navigation to a page
 */
function addNavigationToPage(currentPage = '') {
  // Insert navigation after the body tag or at the beginning of the body
  const body = document.body;
  const nav = document.createElement('div');
  nav.innerHTML = createNavigation(currentPage);
  
  // Insert at the beginning of body
  body.insertBefore(nav.firstElementChild, body.firstChild);
  
  // Initialize mobile menu
  initializeMobileMenu();
  
  // Add navigation styles
  const style = document.createElement('style');
  style.textContent = `
    .nav-link {
      transition: color 0.2s ease;
      text-decoration: none;
    }
    .nav-link:hover {
      text-decoration: none;
    }
  `;
  document.head.appendChild(style);
}

// Auto-detect current page and add navigation
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  let currentPage = '';
  
  if (currentPath.includes('products.html') || currentPath.endsWith('/products')) {
    currentPage = 'products';
  } else if (currentPath.includes('groceries.html') || currentPath.endsWith('/groceries')) {
    currentPage = 'groceries';
  } else if (currentPath.includes('search-box.html')) {
    currentPage = 'search-box';
  } else if (currentPath.includes('demo1.html')) {
    currentPage = 'demo1';
  } else {
    currentPage = 'home';
  }
  
  addNavigationToPage(currentPage);
});

// Export for manual use
window.addNavigationToPage = addNavigationToPage;

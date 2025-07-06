const initProductSearch = () => {
  const search = document.createElement("yield-search");

  /**
   * Product card template for search results
   * @param {Object} item - Product item from search results
   * @param {Function} html - Tagged template function
   * @param {Object} components - Search components for highlighting
   * @returns {string} HTML template for product card
   */
  const productTemplate = (item, html, components) => {
    // Calculate discounted price
    const originalPrice = item.price;
    const discountedPrice = item.discount_percentage 
      ? (originalPrice * (1 - item.discount_percentage / 100)).toFixed(2)
      : originalPrice;
    
    // Generate star rating
    const rating = item.rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    const stars = html`
      ${Array(fullStars).fill(0).map(() => html`
        <svg class="w-4 h-4 text-warning fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      `)}
      ${hasHalfStar ? html`
        <svg class="w-4 h-4 text-warning fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-star">
              <stop offset="50%" stop-color="currentColor"/>
              <stop offset="50%" stop-color="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-star)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      ` : ''}
      ${Array(emptyStars).fill(0).map(() => html`
        <svg class="w-4 h-4 text-base-content/20 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      `)}
    `;

    const stockStatus = item.availabilityStatus === 'In Stock' 
      ? html`<span class="custom-badge-success">In Stock</span>`
      : html`<span class="custom-badge-warning">${item.availability_status}</span>`;

    const discountBadge = item.discount_percentage 
      ? html`
        <div class="custom-product-badge">
          -${item.discount_percentage.toFixed(0)}%
        </div>`
      : '';

    return html`
      <div class="custom-product-card">
        <figure class="custom-image-container">
          ${discountBadge}
          <img
            src="${item.thumbnail || item.images?.[0] || 'https://via.placeholder.com/180x160?text=No+Image'}"
            alt="${item.title}"
            class="custom-product-image"
            onerror="this.src='https://via.placeholder.com/180x160?text=No+Image'"
          />
        </figure>
        
        <div class="custom-content">
          <div class="custom-content-top">
            <h3 class="custom-title">
              ${components.highlight("title", item)}
            </h3>
            
            <!-- Brand - only show if exists to avoid whitespace -->
            ${item.brand ? html`
              <div class="custom-brand">${components.highlight("brand", item)}</div>
            ` : ''}
            
            <!-- Key Features (like Currys product specs) -->
            ${item.features && item.features.length > 0 ? html`
              <ul class="custom-features">
                ${item.features.slice(0, 4).map(feature => html`
                  <li>${feature}</li>
                `)}
              </ul>
            ` : item.description ? html`
              <ul class="custom-features">
                <li>${item.description.slice(0, 60)}${item.description.length > 60 ? '...' : ''}</li>
              </ul>
            ` : ''}
            
            <!-- Rating (minimal) -->
            ${rating > 0 ? html`
              <div class="custom-rating">
                <div class="custom-stars">
                  ${Array(fullStars).fill(0).map(() => html`
                    <svg class="custom-star" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  `)}
                  ${Array(emptyStars).fill(0).map(() => html`
                    <svg class="custom-star custom-star-empty" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  `)}
                </div>
                <span class="custom-rating-text">(${rating.toFixed(1)})</span>
              </div>
            ` : ''}
          </div>
          
          <div class="custom-price-section">
            <!-- Savings message -->
            <div class="custom-savings">
              ${item.discountPercentage ? `Save £${(originalPrice - discountedPrice).toFixed(2)}` : ''}
            </div>
            
            <!-- Price -->
            <div class="custom-price">
              £${discountedPrice}
              ${item.discountPercentage ? html`
                <span class="custom-original-price">£${originalPrice.toFixed(2)}</span>
              ` : ''}
            </div>
            
            <!-- Stock Status -->
            <div class="custom-stock-status ${item.availabilityStatus !== 'In Stock' ? 'out-of-stock' : ''}">
              ${item.availabilityStatus === 'In Stock' ? 'FREE in-store collection in as little as 1 hour' : item.availabilityStatus}
            </div>
            
            <!-- Action Buttons -->
            <div class="custom-actions">
              <button class="custom-btn-outline" onclick="viewProduct('${item.id}')">
                View product
              </button>
              <button class="custom-btn-primary" onclick="addToCart('${item.id}')">
                Add to basket
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  /**
   * Collapsible filter template
   * @param {Object} facet - Facet configuration
   * @param {Function} html - Tagged template function
   * @returns {string} HTML template for filter
   */
  const collapsibleFilter = (facet, html) => {
    // Handle undefined facet or missing properties
    if (!facet) {
      console.warn('Facet is undefined in collapsibleFilter');
      return html`<div class="filter-section">Filter data not available</div>`;
    }
    
    const { field, values = [], title = 'Filter' } = facet;
    
    if (!values || !Array.isArray(values) || values.length === 0) {
      console.warn('No values in collapsibleFilter:', values);
      return html`<div class="filter-section">No ${title.toLowerCase()} options available</div>`;
    }
    
    const filterItems = values.map((item) => {
      const { value, count, label } = item;
      
      return html`
        <div class="filter-item">
          <label class="filter-checkbox">
            <input
              type="checkbox"
              class="filter-input"
              .checked="${search.isFilterActive(item)}"
              @click=${() => search.updateFilter(field, item)}
            />
            <span class="filter-label">${label || value}</span>
            <span class="filter-count">(${count})</span>
          </label>
        </div>
      `;
    });
    
    return html`
      <div class="filter-section collapsed">
        <button class="filter-header" onclick="toggleFilter(this)">
          <span class="filter-title">${title}</span>
          <svg class="filter-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
        <div class="filter-content">
          <div class="filter-options">
            ${filterItems}
          </div>
        </div>
      </div>
    `;
  };

  /**
   * Price range filter template - Currys style
   * @param {Object} facet - Facet configuration
   * @param {Function} html - Tagged template function
   * @returns {string} HTML template for price filter
   */
  const priceRangeFilter = (facet, html) => {
    const { field, values, title } = facet;
    
    const priceRanges = values.map((range) => {
      const { value, count, label } = range;
      
      return html`
        <div class="filter-item">
          <label class="filter-checkbox">
            <input
              type="checkbox"
              class="filter-input"
              .checked="${search.isFilterActive(range)}"
              @click=${() => search.updateFilter(field, range)}
            />
            <span class="filter-label">${label || value}</span>
            <span class="filter-count">(${count})</span>
          </label>
        </div>
      `;
    });

    return html`
      <div class="filter-section collapsed">
        <button class="filter-header" onclick="toggleFilter(this)">
          <span class="filter-title">${title}</span>
          <svg class="filter-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
        <div class="filter-content">
          <div class="filter-options">
            ${priceRanges}
          </div>
        </div>
      </div>
    `;
  };

  /**
   * Category filter template - Currys style with search
   * @param {Object} facet - Facet configuration  
   * @param {Function} html - Tagged template function
   * @returns {string} HTML template for category filter
   */
  const categoryFilter = (facet, html) => {
    const { field, values = [], title = 'Category' } = facet;
    
    // Add search functionality for brand filters
    const hasSearch = values.length > 6;
    
    const categoryItems = values.map((item) => {
      const { value, count, label } = item;
      
      return html`
        <div class="filter-item">
          <label class="filter-checkbox">
            <input
              type="checkbox"
              class="filter-input"
              .checked="${search.isFilterActive(item)}"
              @click=${() => search.updateFilter(field, item)}
            />
            <span class="filter-label">${label || value}</span>
            <span class="filter-count">(${count})</span>
          </label>
        </div>
      `;
    });

    return html`
      <div class="filter-section collapsed">
        <button class="filter-header" onclick="toggleFilter(this)">
          <span class="filter-title">${title}</span>
          <svg class="filter-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
        <div class="filter-content">
          ${hasSearch ? html`
            <div class="filter-search-container">
              <input 
                type="text" 
                placeholder="Search by ${title.toLowerCase()}"
                class="filter-search-input"
                oninput="filterBrands(this.value, this.closest('.filter-section'))"
              />
            </div>
          ` : ''}
          <div class="filter-options ${hasSearch ? 'with-search' : ''}">
            ${categoryItems}
          </div>
        </div>
      </div>
    `;
  };

  // Initialize search component
  search.init({
    collectionId: import.meta.env.VITE_SEARCH_COLLECTION_ID_SKU,
    apiKey: import.meta.env.VITE_SEARCH_KEY_SKU,
    baseUrl: import.meta.env.VITE_SEARCH_URL,
    enableQueryString: true,
    fields: ["*"], // Request all fields to ensure we get the facet data
    
    clearOptions: {
      label: "Clear All Filters",
      onClearClicked: () => {
        console.log("Filters cleared");
      },
    },
    
    searchResultOptions: {
      emptyResultTemplate: (html) =>
        html`
          <div class="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p class="text-gray-500 max-w-md">
              We couldn't find any products matching your search criteria. 
              Try adjusting your filters or search terms.
            </p>
          </div>
        `,
      resultTemplate: productTemplate,
      onSearchRequest: (state) => {
        const loaderElement = document.getElementById("loader");

        if (state === "loading") {
          loaderElement?.classList.remove("hidden");
          return;
        }

        if (state === "loaded") {
          loaderElement?.classList.add("hidden");
        }
      },
    },
    
    searchBoxOptions: {
      itemSelected: (suggestion) => {
        console.log("Product selected:", suggestion);
      },
      placeholder: "Search for products...",
      buttonLabel: "Search",
      enableAutoComplete: true,
    },
    
    filterOptions: {
      templates: [
        {
          field: "price",
          template: priceRangeFilter,
        },
        {
          field: "category", 
          template: categoryFilter,
        },
        {
          field: "brand",
          template: categoryFilter,
        },
        {
          field: "availabilityStatus",
          template: categoryFilter,
        },
      ],
      defaultTemplate: collapsibleFilter,
      filterSelected: (value, selectedFilters) => {
        console.log("Filter selected:", value, selectedFilters);
      },
    },
  });

  // Add search component to DOM - hidden but functional
  search.style.display = 'none';
  document.body.appendChild(search);

  // Duplicate filters for mobile
  const filtersContainer = document.getElementById("filters-container");
  const mobileFiltersContainer = document.getElementById("mobile-filters-container");
  
  if (filtersContainer && mobileFiltersContainer) {
    // Clone filters to mobile drawer
    const observer = new MutationObserver(() => {
      mobileFiltersContainer.innerHTML = filtersContainer.innerHTML;
    });
    
    observer.observe(filtersContainer, { childList: true, subtree: true });
  }
};

// Global filter toggle function
window.toggleFilter = (element) => {
  const filterSection = element.closest('.filter-section');
  if (filterSection) {
    filterSection.classList.toggle('collapsed');
  }
};

// Global brand filter search function
window.filterBrands = (searchTerm, filterSection) => {
  const filterItems = filterSection.querySelectorAll('.filter-item');
  const searchTermLower = searchTerm.toLowerCase();
  
  filterItems.forEach(item => {
    const label = item.querySelector('.filter-label');
    if (label) {
      const brandName = label.textContent.toLowerCase();
      if (brandName.includes(searchTermLower)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    }
  });
};

// Global functions for product interactions
window.viewProduct = (productId) => {
  console.log("Viewing product:", productId);
  // Implement product detail view logic
  alert(`Viewing product ${productId}`);
};

window.addToCart = (productId) => {
  console.log("Adding to cart:", productId);
  // Implement add to cart logic
  alert(`Added product ${productId} to cart`);
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initProductSearch();
});

// Handle responsive filter synchronization
window.addEventListener('resize', () => {
  const filtersContainer = document.getElementById("filters-container");
  const mobileFiltersContainer = document.getElementById("mobile-filters-container");
  
  if (window.innerWidth >= 1024) {
    // Desktop view - ensure mobile drawer is closed
    const mobileDrawer = document.getElementById("mobile-filter-drawer");
    if (mobileDrawer) {
      mobileDrawer.checked = false;
    }
  }
});

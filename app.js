const initSearch = () => {
  const search = document.createElement("yield-search");

/**
 * Generates HTML content for a given item using a template.
 *
 * @param {Object} item - The item object containing details to be displayed.
 * @param {Function} html - A tagged template function to generate HTML.
 * @returns {string} The generated HTML content.
 */
  const templateContent = (item, html, components) => {
    const promoted = item.promoted ? "border-blue-500" : "border-base-200";

    return html`
      <div class="card card-bordered shadow-xl ${promoted}">
        <figure>
          <img
            alt="${item.title}"
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80"
          />
        </figure>
        <div class="card-body p-4">
          <h2 class="card-title text-lg font-semibold">${components.highlight("title", item)}</h2>
          <p class="text-sm">${components.highlight("description", item)}</p>
          <div class="card-actions justify-between items-end mt-2">
            <div class="text-xl text-primary font-bold">£${item.price}</div>
            <button type="button" class="btn btn-outline">Buy Now</button>
          </div>
        </div>
      </div>
    `;
  };

  const collapsibleFilter = (facet, html) => {
    return html`
      <div
        class="collapse bg-base-100 rounded-none border-b border-base-100 collapse-arrow"
      >
        <input type="checkbox" name="filter-accordion-${facet.field}" />
        <div class="collapse-title text-lg bg-base-200">${facet.title}</div>
        <div class="collapse-content px-0 pb-0 collapse-open:pb-0">
          <div class="pt-2">
            <yield-facet
              facet-field="${facet.field}"
              header-enabled="false"
            ></yield-facet>
          </div>
        </div>
      </div>
    `;
  };

  const collapsibleFilter2 = (facet, html) => {
    const open = facet.field === "price" ? "collapse-open" : "collapse-arrow";
    const { field, values, title } = facet;

    const colours = {
      Black: "bg-black",
      Red: "bg-red-500",
      Blue: "bg-blue-500",
      Green: "bg-green-500",
      White: "bg-white",
      Silver: "bg-gray-500",
      Grey: "bg-gray-500",
      Yellow: "bg-yellow-500",
      Orange: "bg-orange-500",
      Purple: "bg-purple-500",
      Brown: "bg-orange-950",
      Gold: "bg-[#FFD700]",
    };

    const facetValues = values.map((o) => {
      const { value, count, label } = o;

      return html`
        <div class="yield-filter-body">
          <input
            id="${field}-${value}"
            .checked="${search.isFilterActive(o)}"
            type="checkbox"
            class="checkbox"
            @click=${() => search.updateFilter(field, o)}
          />
          <div class="flex flex-1 items-center">
            <div
              class="w-1/12 pb-1/12 ${colours[
                value
              ]} border border-base-300 ml-2"
            ></div>
            <label for="${field}-${value}" class="yield-filter-body-label">
              ${label || value}
            </label>
          </div>
          <span class="yield-filter-body-label-count">(${count})</span>
        </div>
      `;
    });

    return html`
      <div
        class="collapse bg-base-100 rounded-none border-b border-base-100 ${open}"
      >
        <input type="checkbox" name="filter-accordion-${field}" />
        <div class="collapse-title text-lg bg-base-200">${title}</div>
        <div class="collapse-content px-0 pb-0 collapse-open:pb-0">
          <div class="pt-2">${facetValues}</div>
        </div>
      </div>
    `;
  };

  search.init({
    collectionId: import.meta.env.VITE_SEARCH_COLLECTION_ID,
    apiKey: import.meta.env.VITE_SEARCH_KEY,
    baseUrl: "https://api.yieldsearchpro.io/api/client/search",
    enableQueryString: true,
    limit: 12,
    fields: [],
    highlight_fields: ["title", "description"],
    clearOptions: {
      label: "Clear",
      onClearClicked: () => {},
    },
    searchResultOptions: {
      emptyResultTemplate: (html) =>
        html`<div class="empty-result flex justify-center w-full">
          <div class="text-lg">No results found</div>
        </div>`,
      resultTemplate: templateContent,
      onSearchRequest: (state) => {
        const loaderElement = document.getElementById("loader");

        if (state === "loading") {
          loaderElement.classList.remove("hidden");

          return;
        }

        if (state === "loaded") {
          loaderElement.classList.add("hidden");
        }
      },
    },
    searchBoxOptions: {
      itemSelected: (suggestion) => console.table(suggestion),
      placeholder: "Search for cars...",
      buttonLabel: "Find Cars",
      enableAutoComplete: true,
    },
    filterOptions: {
      templates: [
        {
          field: "colour",
          template: collapsibleFilter2,
        },
      ],
      defaultTemplate: collapsibleFilter,
      filterSelected: (value, selectedFilters) => {},
    },
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initSearch();
});

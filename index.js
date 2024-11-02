const templateContent1 = (item) => {
  const promoted = item.promoted ? "promoted" : "";

  return `
    <div class="card bg-base-100 shadow-lg ${promoted}">
        <figure class="coming-soon h-48">
            <img class="w-full" src="https://placehold.co/360x196?text=Coming Soon&font=montserrat">
        </figure>
        <div class="card-body p-4">
            <h2 class="card-title text-lg text-primary">
                ${item.title}
            </h2>
            <p class="text-sm">${item.displayDescription}</p>
            <p class="text-sm">Location: ${item.dealerFriendlyName}</p>
            <div class="card-actions justify-start mt-2">
                <div class="text-xl text-primary font-bold">£${item.price}</div>
            </div>
        </div>
    </div>
    `;
};

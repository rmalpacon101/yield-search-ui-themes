const templateContent1 = (item) => {
  const promoted = item.promoted ? "promoted" : "";

  return `
    <div class="card card-bordered shadow-lg ${promoted}">
        <figure>
            <img
                alt="${item.title}"
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80">
        </figure>
        <div class="card-body p-4">
            <h2 class="card-title text-lg">
                ${item.title}
            </h2>
            <p class="text-sm">${item.displayDescription}</p>
            <p class="text-sm">Location: ${item.dealerFriendlyName}</p>
            <div class="card-actions justify-between items-end mt-2">
                <div class="text-xl text-primary font-bold">£${item.price}</div>
                <button type="button" class="btn">Buy Now</button>
            </div>
        </div>
    </div>
    `;
};

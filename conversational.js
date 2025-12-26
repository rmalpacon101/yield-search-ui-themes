// Get search mode from URL parameter
const getSearchMode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('mode') || 'vehicles';
};

// Get search configuration based on mode
const getSearchConfig = (mode) => {
  if (mode === 'products') {
    return {
      collectionId: import.meta.env.VITE_SEARCH_COLLECTION_ID_SKU,
      apiKey: import.meta.env.VITE_SEARCH_KEY_SKU,
      placeholder: 'Ask me anything about our products...'
    };
  } else {
    return {
      collectionId: import.meta.env.VITE_SEARCH_COLLECTION_ID,
      apiKey: import.meta.env.VITE_SEARCH_KEY,
      placeholder: 'Ask me anything about our vehicles...'
    };
  }
};

const initConversationalSearch = () => {
  const search = document.createElement("yield-search");
  const mode = getSearchMode();
  const config = getSearchConfig(mode);

  search.init({
    collectionId: config.collectionId,
    apiKey: config.apiKey,
    baseUrl: import.meta.env.VITE_SEARCH_URL,
    enableQueryString: true,

    // Conversational search configuration
    conversationalOptions: {
      placeholder: config.placeholder,
      contextSize: 25,      // Number of search results to use as context
      messageSize: 25,      // Number of previous messages to include
      timeout: 30,          // Request timeout in seconds

      // Callback when AI responds
      onResponseReceived: (response) => {
        console.log('AI responded:', response.answer);
        console.log('Memory ID:', response.memoryId);
      },

      // Callback when an error occurs
      onError: (error) => {
        console.error('Conversational search error:', error);
        alert('Sorry, there was an error processing your request. Please try again.');
      }
    }
  });

  console.log(`Initialized conversational search in ${mode} mode`);
};

document.addEventListener("DOMContentLoaded", () => {
  initConversationalSearch();
});

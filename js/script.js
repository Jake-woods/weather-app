// Function to reduce amount of typing needed to select elements
const elementSelector = (ele) => document.querySelector(ele);

// Remove loading screen after 5 seconds (5000)
const removeLoader = () => {
   const loadingScreen = elementSelector('.loading-container');
   loadingScreen.classList.add('loading-container_close');
}
setTimeout(removeLoader, 5000);
async function fetchData() {
    try {
      const response = await fetch('https://stimes.onrender.com/api/news');
      const data = await response.json();
      const id = window.location.search.split('/').pop();
  
      // Finding the specific data by ID
      const newsItem = data.find(item => item._id === id);
  
      // Assign values or set defaults
      const title = newsItem ? newsItem.title : "Default Title"; 
      const content = newsItem ? newsItem.content : "Default Description"; 
      const image = newsItem ? newsItem.image : "%PUBLIC_URL%/channels4_profile.png"; 
  
      // Update the title and meta description in the DOM
      document.title = title; // Set dynamic title
      document.querySelector("meta[name='description']").setAttribute("content", content); 
      document.querySelector("link[rel='icon']").setAttribute('href', image);
      document.querySelector("link[rel='apple-touch-icon']").setAttribute('href', image);
  
  
    } catch (error) {
      console.error("Error fetching data:", error);
      
      // Fallback values
      document.title = "Default Title"; 
      document.querySelector("meta[name='description']").setAttribute("content", "Default Description");
      document.querySelector("link[rel='icon']").setAttribute('href', "default-image.jpg");
      document.querySelector("link[rel='apple-touch-icon']").setAttribute('href', "%PUBLIC_URL%/channels4_profile.png");
  

    }
  }
  
  // Call the function to fetch data when the page loads
  fetchData();
  
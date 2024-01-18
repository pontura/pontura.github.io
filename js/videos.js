// Function to filter gallery items based on the selected tag
function filterGallery(tag) {
   window.location.href = "?tag=" + tag; 
}
function filterGallery_OLD(tag) {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    const itemTags = item.getAttribute('data-tags').split(' ');

    if (itemTags.includes(tag)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}



// Add event listeners to the filter buttons
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tag = button.getAttribute('data-filter');
    filterGallery(tag);
  });
});


fetch('data/videos.json')
.then(response => response.json())
.then(data => {
	
	// Parse the URL to get the selected tag from the query parameters
	const urlParams = new URLSearchParams(window.location.search);
	const selectedTag = urlParams.get('tag');
	
	if(selectedTag == "" || selectedTag == null) 
		selectedTag = "home";
	
	const gallery = document.getElementById('gallery');
  
	data.forEach(item => {	  
	const itemTags = item.tags.split(' ');	
    if (itemTags.includes(selectedTag)) {	
	
		const galleryItem = document.createElement('div');
		galleryItem.setAttribute('data-tags', item.tags);
		
		galleryItem.className = 'gallery-item';

		const youtubeEmbed = document.createElement('iframe');
		youtubeEmbed.src = `https://www.youtube.com/embed/${item.youtube_id}`;
		youtubeEmbed.allowfullscreen = true;

		const name = document.createElement('p');
		name.innerText = item.name;

		//const description = document.createElement('p');
		//description.innerText = item.description;
		

		// Append elements to the gallery item
		galleryItem.appendChild(youtubeEmbed);
		galleryItem.appendChild(name);
		//galleryItem.appendChild(description);

		// Append the gallery item to the gallery container
		gallery.appendChild(galleryItem);
	}
	
  });
  
  
})
.catch(error => console.error(error));





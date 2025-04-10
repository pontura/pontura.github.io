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

  function openVideo(videoId) {
    const overlay = document.getElementById('videoOverlay');
    const frame = document.getElementById('videoFrame');
    frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    overlay.style.display = 'flex';
  }

  function closeVideo() {
    const overlay = document.getElementById('videoOverlay');
    const frame = document.getElementById('videoFrame');
    frame.src = "";
    overlay.style.display = 'none';
  }

// Add event listeners to the filter buttons
const filterButtons = document.querySelectorAll('.filter-button');
var selectedTag = urlParams.get('tag');
filterButtons.forEach(button => {
	var buttonTag = button.getAttribute('data-filter');
	if(selectedTag ==buttonTag )
		button.className  = "filter-button-active";
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
	var selectedTag = urlParams.get('tag');
	
	if(selectedTag == "" || selectedTag == null) 
		selectedTag = "home";
	
	const gallery = document.getElementById('gallery');
  
	data.forEach(item => {	  
	const itemTags = item.tags.split(' ');	
    if (itemTags.includes(selectedTag)) {
	
	
		const galleryItem = document.createElement('div');
		galleryItem.setAttribute('data-tags', item.tags);
		
		galleryItem.className = 'thumbnail-container';

		const youtubeEmbed = document.createElement('img');
		youtubeEmbed.src = `https://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`;

		const name = document.createElement('p');
		name.innerText = item.name;
		
		galleryItem.appendChild(youtubeEmbed);
		galleryItem.appendChild(name);
		galleryItem.addEventListener("click", () => openVideo(item.youtube_id));
		
		
		const playBtn = document.createElement('div');
		playBtn.className = 'play-button';
		galleryItem.appendChild(playBtn);
		
		gallery.appendChild(galleryItem);
		
	}
	
  });
  
  
})
.catch(error => console.error(error));








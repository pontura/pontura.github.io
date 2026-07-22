const urlParams = new URLSearchParams(window.location.search);

var selectedTag = "home";

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
  

if(urlParams != null)	
	selectedTag = urlParams.get('tag');

var jsonName = "home";
if(selectedTag == null || selectedTag == "")
{
	jsonName = 'home';
	selectedTag = "home";
} else{	
	jsonName = selectedTag;
}

function updatePageMeta(data) {
	const first = data.find(item => item.title || item.description);
	if (!first) return;

	if (first.title) {
		document.title = `${first.title} — Agustín Pontura`;
	}
	if (first.description) {
		const plain = first.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
		const summary = plain.length > 160 ? plain.slice(0, 157) + '...' : plain;
		const metaDesc = document.querySelector('meta[name="description"]');
		if (metaDesc && summary) metaDesc.setAttribute('content', summary);
	}
}

function buildLinks(container, links) {
	links.forEach(obj => {
		const a = document.createElement('a');
		const _text = obj["url_text"];
		const _url = obj["url"];
		a.appendChild(document.createTextNode(_text));
		a.title = _text;
		a.href = _url;
		if (/^https?:\/\//i.test(_url)) {
			a.target = "_blank";
			a.rel = "noopener noreferrer";
		}
		container.appendChild(a);
	});
}

fetch("data/" + jsonName + '.json')
.then(response => response.json())
.then(data => {
	const home = document.getElementById('content');

	updatePageMeta(data);

  data.forEach(item => {
	
	const itemData = document.createElement('div');	
	itemData.className = 'content-item';

	if(item.title != null)
	{
		const title = document.createElement('h1'); title.innerText = item.title;
		itemData.appendChild(title);
		itemData.className = "contentTitle";	
	}
	if(item.description != null)
	{
		const description = document.createElement('h2'); description.innerHTML  = item.description;
		itemData.appendChild(description);
		itemData.className = "contentDesc";	
	}
	if(item.image != null)
	{
		const imageData = document.createElement('img'); imageData.src = `${item.image}`;
		imageData.alt = item.alt || item.title || '';
		imageData.loading = "lazy";
		itemData.appendChild(imageData);
		itemData.className = "contentImages";
	}
	if(item.video != null)
	{
		  const videoId = item.video; // tu ID de video
		  const iframe = document.createElement("iframe");

			iframe.className = "contentVideos";

		  iframe.width = "100%";
		  iframe.height = "315";
		  iframe.src = `https://www.youtube.com/embed/${videoId}`;
		  iframe.title = "YouTube video player";
		  iframe.frameBorder = "0";
		  iframe.loading = "lazy";
		  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
		  iframe.allowFullscreen = true;
			itemData.appendChild(iframe);
	}
	if(item.links != null)
	{
		const links = document.createElement('div');
		links.className = "links";
		itemData.appendChild(links);
		buildLinks(links, item.links);
		Array.from(links.children).forEach(a => a.classList.add("contentLinks"));
	}
	
	home.appendChild(itemData);
	
	const c = document.createElement('p'); c.innerText = ".....";
	c.className = "separation";	
	home.appendChild(c);
  });
  
})
.catch(error => console.error(error));





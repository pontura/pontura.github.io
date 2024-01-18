const urlParams = new URLSearchParams(window.location.search);
const selectedTag = urlParams.get('tag');
var jsonName = "home"
if(selectedTag == null || selectedTag == "" || selectedTag == "all")
{
	jsonName = 'home';
} else{	
	jsonName = selectedTag;
}
fetch(jsonName + '.json')
.then(response => response.json())
.then(data => {
	const home = document.getElementById('home');
  
  data.forEach(item => {  
	
	const itemData = document.createElement('div');	
	itemData.className = 'home-item';

	const title = document.createElement('h1'); title.innerText = item.title;
	const description = document.createElement('h2'); description.innerText = item.description;
	const imageData = document.createElement('img'); imageData.src = `${item.image}`;

	itemData.appendChild(title);
	itemData.appendChild(description);
	itemData.appendChild(imageData);
	
	home.appendChild(itemData);
	
  });
  
})
.catch(error => console.error(error));





const urlParams = new URLSearchParams(window.location.search);
const selectedTag = urlParams.get('tag');
var jsonName = "home"
if(selectedTag == null || selectedTag == "" || selectedTag == "all")
{
	jsonName = 'home';
} else{	
	jsonName = selectedTag;
}
fetch("data/" + jsonName + '.json')
.then(response => response.json())
.then(data => {
	const home = document.getElementById('home');
  
  data.forEach(item => {  
	
	const itemData = document.createElement('div');	
	itemData.className = 'home-item';

	if(item.title != null)
	{
		const title = document.createElement('h1'); title.innerText = item.title;
		itemData.appendChild(title);
		itemData.className = "contentTitle";	
	}
	if(item.description != null)
	{
		const description = document.createElement('h2'); description.innerText = item.description;
		itemData.appendChild(description);
		itemData.className = "contentDesc";	
	}
	if(item.image != null)
	{
		const imageData = document.createElement('img'); imageData.src = `${item.image}`;
		itemData.appendChild(imageData);
		itemData.className = "contentImages";	
	}
	if(item.links != null)
	{	
        for (var i = 0; i < item.links.length; i++){
			var obj = item.links[i];			
			var a = document.createElement('a');
			var _text = obj["url_text"];
			var _url = obj["url"];
			var linkText = document.createTextNode(_text);
			a.appendChild(linkText);
			a.title = _text;
			a.href = _url;
			itemData.appendChild(a);
			itemData.className = "contentLinks";			
		}
	}
	
	home.appendChild(itemData);
	
	
  });
  
})
.catch(error => console.error(error));




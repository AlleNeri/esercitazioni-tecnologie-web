const baseUri="http://localhost:3000",
	libriUri="/libri",
	ordiniUri="/ordini";

const bestSeller="bestSeller"

const divContainer=document.getElementById("container");
const divBooking=document.getElementById("booking");

let bookList=[];

function insertSearchBar() {
	const searchBarId="searchBar";
	const searchBar=document.createElement("input");
	searchBar.setAttribute("type", "text");
	searchBar.setAttribute("id", searchBarId);
	const button=document.createElement("input");
	button.setAttribute("type", "submit");
	button.setAttribute("value", "cerca")
	button.addEventListener("click", ()=> {
		const searchBar=document.getElementById(searchBarId);
		fetch(baseUri+libriUri+"?tag="+searchBar.value)
			.then(res=> {
				if(res.ok) return res.json();
				throw new Error("Http request error");
			})
			.then(json=> {
				if(json.length==0) alert("Non ci sono file con questo tag");
				for(i in json) divContainer.append(createCard(json[i]));
			})
			.catch(err=> console.log(err));
	});
	divContainer.append(searchBar, button);
}

function createCard(libro) {
	const autore=document.createElement("p");
	autore.append(document.createTextNode(libro.autore));
	const titolo=document.createElement("h2");
	titolo.append(document.createTextNode(libro.titolo));
	const copertina=document.createElement("img");
	copertina.setAttribute("alt", libro.copertina);
	const spazio=document.createElement("br");
	const name="check"+libro.id;
	const check=document.createElement("input");
	check.setAttribute("type", "checkbox");
	check.setAttribute("id", libro.id);
	check.setAttribute("name", name);
	check.addEventListener("click", ()=> {
		let i=bookList.indexOf(libro);
		if(i<=-1) bookList.push(libro);
		else bookList.splice(i, 1);
		printOrder();
	});
	const label=document.createElement("label");
	label.setAttribute("for", name);
	label.append(document.createTextNode("ordina"));
	if(libro.copie==0) {
		check.disabled=true;
		label.setAttribute("style", "text-decoration: line-through");
	}
	const card=document.createElement("div");
	if(libro.tag==bestSeller) card.setAttribute("style", "background-color: gold")
	card.append(titolo, autore, copertina, spazio, check, label);
	card.setAttribute("id", "div"+libro.id);
	return card;
}

function insertBooking() {
	const roadId="road", nameId="yourName";
	const button=document.createElement("button");
	button.append(document.createTextNode("ordina"))
	button.addEventListener("click", ()=> {
		const bookIds=bookList.reduce((ids, actual)=> {
			ids.push(actual.id);
			return ids;
		}, []);
		const name=document.getElementById(nameId).value;
		const via=document.getElementById(roadId).value;
		if(!name || !via) {
			alert("Via e nome sono richiesti");
			return;
		}
		const data={
			"name": name,
			"roue": via,
			"books": bookIds
		};
		fetch(baseUri+ordiniUri,
			{
				"method": "POST",
				"headers": {
					"Content-Type": "application/json"
				},
				"body": JSON.stringify(data)
			});
		let date=new Date();
		date.setMonth(date.getMonth()+1);
		alert("L'ordine verrà consegnato: "+date);
		printOrder();
	});
	const roadInput=document.createElement("input");
	roadInput.setAttribute("type", "text");
	roadInput.setAttribute("id", roadId);
	roadInput.setAttribute("placeholder", "via");
	const nameInput=document.createElement("input");
	nameInput.setAttribute("type", "text");
	nameInput.setAttribute("id", nameId);
	nameInput.setAttribute("placeholder", "nome");
	const space=document.createElement("br");
	divBooking.append(roadInput, nameInput, space, button);
}

function printOrder() {
	divBooking.innerHTML="";
	if(bookList.length!=0) {
		const allTitles=bookList.reduce((titles, actual)=> {
			titles.push(actual.titolo);
			return titles;
		}, []);
		const listOfTitles=allTitles.join(", ");
		const p=document.createElement("p").innerHTML=listOfTitles;
		const space=document.createElement("br");
		divBooking.append(p, space);
	}
	insertBooking();
}

function init() {
	insertSearchBar();
	printOrder();
	fetch(baseUri+libriUri+"?tag="+bestSeller)
		.then(res=> {
			if(res.ok) return res.json();
			throw new Error("Http request error");
		})
		.then(json=> {
			for(i in json) divContainer.append(createCard(json[i]));
		})
		.catch(err=> console.log(err));
}

init();

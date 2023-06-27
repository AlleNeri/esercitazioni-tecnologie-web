const baseLink="opentranslator.org";
const langLink="languages";
const translateLink="translate";

let langs;

function fillSelects() {
	let from=document.getElementById("from"), to=document.getElementById("to");
	Object.keys(langs).forEach(key => {
		if(from) from.innerHTML+=`<option id="${key}" value="${key}">${langs[key]}</option>`;
		if(to) to.innerHTML+=`<option id="${key}" value="${key}">${langs[key]}</option>`;
	});
}

function init() {
	/*
	fetch(`${baseLink}/${languages}`, { "method": "GET" })
		.then(res => {
			if(!res.ok) throw new Error(`Http request error`);
			return res.json();
		})
		.then(json => {
			langs=json;
			fillSelects();
		})
		.catch(err => {
			throw new Error(err);
		});
	*/
	langs={
		"ita": "Italian",
		"eng": "English"
	};
	fillSelects();
	//per aggiungere l'evento al bottone
	document.getElementById("submit").addEventListener("click", translate, false);
}

function translate() {
	let from=document.getElementById("from"), to=document.getElementById("to");
	let source_text=document.getElementById("source_text"), target_text=document.getElementById("target_text");
	const data={
		"text": source_text.value,
		"source_language": from.value,
		"target_language": to.value
	}
	/*
	fetch(`${baseLink}/${translateLink}`,
		{
			"method": "POST",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": JSON.stringify(data)
		}
	)
		.then(res => {
			if(!res.ok) throw new Error(`Http request error`);
			return res.json();
		})
		.then(json => target_text=json.text)
		.catch(err => {
			throw new Error(err);
		});
	*/
	console.log(data);
	target_text.value="traduzione";
}

init();

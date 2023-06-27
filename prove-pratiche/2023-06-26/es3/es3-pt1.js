const baseLink="opentranslator.org"
const langLink="languages"

let langs;

function fillSelects() {
	let from=document.getElementById("from"), to=document.getElementById("to");
	Object.keys(langs).forEach(key => {
		if(from) from.innerHTML+=`<option id="${key}" value="${key}">${langs[key]}</option>`;
		if(to) to.innerHTML+=`<option id="${key}" value="${key}">${langs[key]}</option>`;
	});
}

function init() {
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
	/*
	langs={
		"ita": "Italian",
		"eng": "English"
	};
	fillSelects();
	*/
}

init();

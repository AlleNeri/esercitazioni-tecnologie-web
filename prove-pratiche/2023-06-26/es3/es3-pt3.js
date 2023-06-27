const baseLink="opentranslator.org";
const langLink="languages";
const translateLink="translate";
const detect="detect-language", detectOne=`${detect}/first`;

let langs;

function fillSelects() {
	let from=document.getElementById("from"), to=document.getElementById("to");
	Object.keys(langs).forEach(key => {
		if(from) from.innerHTML+=`<option id="${key}" value="${key}">${langs[key]}</option>`;
		if(to) to.innerHTML+=`<option id="${key}" value="${key}">${langs[key]}</option>`;
	});
}

function reset() {
	let from=document.getElementById("from");
	let target_text=document.getElementById("target_text");
	from.disabled=false;
	target_text.value="";
}

function translate() {
	reset();
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

function recognize() {
	reset();
	//disabling from
	let from=document.getElementById("from");
	let source_text=document.getElementById("source_text"), target_text=document.getElementById("target_text");
	if(source_text.value.length<10) alert("Insert more letters!");
	else if(source_text.value.length<=25) {
		const data={ "text": source_text.value };
		/*
		fetch(`${baseLink}/${detect}`,
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
			.then(json => {
				for(let i=0; i<3; i++)
					target_text.value+=`${langs[json.detected_languages[i].language]} (confidence score: ${json.detected_languages[i].confidence_score})\n`;
			})
			.catch(err => {
				throw new Error(err);
			});
		*/
		target_text.value+=`${langs["ita"]} (cs: 0.85)\n`;
		target_text.value+=`${langs["eng"]} (cs: 0.5)`;
		console.log(data);
	}
	else {
		/*
		fetch(`${baseLink}/${detectOne}`,
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
			.then(json => {
				from.value=json.language;
				translate();
				target_text.value+=`${langs[json.language]}`;
			})
			.catch(err => {
				throw new Error(err);
			});
		*/
		from.value="ita";
		translate();
		target_text.value+=`\nLanguage: ${langs["ita"]} (confidence score: 0.85)`;
	}
	from.disabled=true;
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
	//per aggiungere gli eventi ai bottoni
	document.getElementById("submit").addEventListener("click", translate, false);
	document.getElementById("recognize").addEventListener("click", recognize, false);
}

init();

const api="http://localhost:3000/",
	occupazione="occupazione/",
	scegli="scegli/";

const spazi=[
	{
		id: 0,
		nameSelected: "Sala prove 1",
		description: "La sala prove è provvista di..."
	},
	{
		id: 1,
		nameSelected: "Sala prove 2",
		description: "La sala prove è provvista di..."
	},
	{
		id: 2,
		nameSelected: "Studio registrazione 1",
		description: "Lo studio è provvista di..."
	},
	{
		id: 3,
		nameSelected: "Studio registrazione 2",
		description: "Lo studio è provvista di..."
	}
];

const placeSelector=document.getElementById("placeSelector");
const daySelector=document.getElementById("daySelector");
const indicazioni=document.getElementById("indicazioni");
const table=document.getElementById("table");
const placeBook=document.getElementById("placeBook");
const dayBooking=document.getElementById("dayBooking");
const from=document.getElementById("from");
const to=document.getElementById("to");
const nameSelected=document.getElementById("name");
const book=document.getElementById("book");

function fillPlaceSelector(places) {
	for(i in places) {
		const opt=document.createElement("option");
		opt.value=spazi[i].id;
		opt.innerHTML=spazi[i].nameSelected;
		placeSelector.appendChild(opt);
	}
	placeSelector.addEventListener("change", ()=> {
		fillIndicazioni(places);
		fillTable(places);
	});
	daySelector.addEventListener("change", ()=> {
		fillTable(places);
	});
}

function getSelected(places) {
	return places.find((p)=> p.id==placeSelector.value);
}

function getDay(input) {
	const tmpDay=input.value;
	if(tmpDay.length!=10) return undefined;
	return tmpDay;
}

function fillIndicazioni(places) {
	indicazioni.innerHTML="";
	const a=getSelected(places);
	const h2=document.createElement("h2");
	h2.innerHTML=a.nameSelected;
	const p=document.createElement("p");
	p.innerHTML=a.description;
	indicazioni.append(h2, p);
}

function fillTable(places) {
	table.innerHTML="";
	const a=getSelected(places);
	const d=getDay(daySelector);
	if(d==undefined) return;
	fetch(`${api}${occupazione}?id=${a.id}&giorno=${d}`)
	.then(res=> {
		if(!res.ok) throw new Error("http error");
		return res.json();
	})
	.then(json=> {
		const data=json[0].turni;
		for(i in data) table.innerHTML+=`<tr><td>${data[i].nome}</td><td>${data[i].ora}</td></tr>`;
	})
	.catch(e=> console.log(e));
}

function isInvalidHour(h) {
	return h<15 || h>22;
}

function bookDate(s, d, h, n) {
	fetch(
		`${api}${scegli}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				spazio: s,
				nome: n,
				giorno: d,
				ora: `${h}-${h+1}`
			})
		}
	);
}

function fillForm(places) {
	for(i in places) {
		const opt=document.createElement("option");
		opt.value=spazi[i].id;
		opt.innerHTML=spazi[i].nameSelected;
		placeBook.appendChild(opt);
	}
	from.addEventListener("change", ()=> {
		const val=Number(from.value);
		if(isInvalidHour(val)) to.innerHTML="";
		else to.innerHTML=`alle ore ${val+1}`;
	});
	book.addEventListener("click", ()=> {
		const s=Number(placeBook.value);
		const d=getDay(dayBooking);
		const h=Number(from.value);
		const n=nameSelected.value;
		if(d===undefined || isInvalidHour(h) || n.length<2) alert("Informazioni non consone");
		else {
			placeBook.value=places[0].id;
			dayBooking.value="";
			from.value="";
			nameSelected.value="";
			bookDate(s, d, h, n);
		}
	});
}

fillPlaceSelector(spazi);
fillIndicazioni(spazi);
fillTable(spazi);
fillForm(spazi);

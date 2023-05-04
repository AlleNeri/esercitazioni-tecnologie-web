import { useState } from "react";

import { getCordUrl, getWeatherUrl } from "../../linkGenerator.js"; 
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import Btn from "../Btn/Btn";

//cities
const cities=[ { name: "Bologna", key: "bologna" },
	{ name: "Cesena", key: "cesena" },
	{ name: "Ferrara", key: "ferrara" },
	{ name: "Forlì", key: "forli" },
	{ name: "Modena", key: "modena" },
	{ name: "Parma", key: "parma" },
	{ name: "Piacenza", key: "piacenza" },
	{ name: "Ravenna", key: "ravenna" },
	{ name: "Reggio Emilia", key: "reggio" },
	{ name: "Rimini", key: "rimini" }
];

function initialFullData() {
	let temp = [];
	cities.forEach((c, i)=> temp.push({ id: i++ }));
	return temp;
}

export default function Wrapper() {
	//variables
	const [ data, setData ] = useState({});
	const [ fullData, setFullData ] = useState(initialFullData());
	function createFullDataFormatted() {
		let temp = [];
		fullData.forEach((d, i)=> temp.push(<Card data={d} key={i} />));
		return temp;
	}
	const [ fullDataFormatted, setFullDataFormatted ] = useState(createFullDataFormatted());
	//create options modifier
	//city modifier
	const updateCity = async(newCity)=> {
		//fetch latitude and longitude
		const cordUrl = getCordUrl(newCity);
		fetch(cordUrl)
			.then(res=> res.json())
			.then(data=> {
				//fetch the weather
				const weatherUrl = getWeatherUrl(data[0]);
				fetch(weatherUrl)
					.then(res=> res.json())
					.then(data=> setData(data));
			});
	};
	//get all cities weather with promAll
	const promAll = async()=> {
		//delete data
		setFullData(initialFullData());
		//array of promise
		let promises = [];
		cities.forEach(c=> {
			promises.push(new Promise(async()=> {
				//fetch latitude and longitude
				const cordUrl = getCordUrl(c.key);
				let res = await fetch(cordUrl);
				let data = res.json();
				console.log(data);
				//fetch the weather
				const weatherUrl = getWeatherUrl(data[0]);
				res = await fetch(weatherUrl);
				console.log(res.json());
				return res.json();
			}));
		});
		//store the data
		Promise.all(promises).then(datas=> {
			console.log("datas: ", datas);
			setFullData(datas);
			//render the data
			console.log("in promiseall");
			setFullDataFormatted();
		}).catch(console.log("problema"));
	};
	//get all cities weather with foreach
	const forEach = async()=> {
		//delete data
		setFullData(initialFullData());
		//fetch latitude and longitude of all cities
		cities.forEach((c, i)=> {
			//fetch latitude and longitude
			const cordUrl = getCordUrl(c.key);
			fetch(cordUrl)
				.then(res=> res.json())
				.then(data=> {
					//fetch the weather
					const weatherUrl = getWeatherUrl(data[0]);
					fetch(weatherUrl)
						.then(res=> res.json())
						.then(d=> {
							setFullData(prev=> {
								prev[i]=d;
								return prev;
							});
							//render the data
							setFullDataFormatted(createFullDataFormatted());
						});
				});
		});
	};
	//view
	return (
		<>
			<Filter cityUpdater={updateCity} cities={cities} />
			<Card data={data} />
			<hr/>
			<Btn text="Scarica il meteo di tutte le città" triggered={promAll} />
			<Btn text="Scarica il meteo di tutte le città" triggered={forEach} />
			<div className="flexbox">{fullDataFormatted}</div>
		</>
	);
}

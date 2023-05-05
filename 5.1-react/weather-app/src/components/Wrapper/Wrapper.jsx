import { useState } from "react";

import { getCordUrl, getWeatherUrl } from "../../linkGenerator.js"; 
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import Btn from "../Btn/Btn";
import MultiCards from "../MultiCards/MultiCards.jsx";

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

export default function Wrapper() {
	//variables
	const [ data, setData ] = useState({});
	const [ fullData, setFullData ] = useState([]);
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
		//delete old data
		setFullData([]);
		//array of promise
		let promisesCord = [];
		//fetch all cords
		cities.forEach(c=>
			promisesCord.push(
				fetch(getCordUrl(c.key)).then(res=> res.json())
			)
		);
		Promise.all(promisesCord)
			.then(cords=> {
				//array of weather
				let promisesWeather = [];
				//fetch all weather
				cords.forEach(c=>
					promisesWeather.push(
						fetch(getWeatherUrl(c[0])).then(res=> res.json())
					)
				);
				Promise.all(promisesWeather)
					.then(data=> setFullData(data));
			});
		/*
		cities.forEach(c=> {
			promises.push(
				fetch(getCordUrl(c.key))
					.then(res=> res.json())
					.then(data=> {
						console.log(data);
						//fetch the weather
						const weatherUrl = getWeatherUrl(data[0]);
						fetch(weatherUrl)
							.then(res=> res.json());
					})
			)
		});
		//store the data
		Promise.all(promises).then(promRes=> {
			console.log("promRes: ", promRes);
			setFullData(promRes);
			//render the data
			console.log("in promiseall");
		}).catch(console.log("problema"));
		*/
	};
	//get all cities weather with foreach
	const forEach = async()=> {
		//delete old data
		setFullData([]);
		//fetch latitude and longitude of all cities
		cities.forEach(c=> {
			//fetch latitude and longitude
			const cordUrl = getCordUrl(c.key);
			fetch(cordUrl)
				.then(res=> res.json())
				.then(data=> {
					//fetch the weather
					const weatherUrl = getWeatherUrl(data[0]);
					fetch(weatherUrl)
						.then(res=> res.json())
						.then(d=> setFullData(prev=> [ ...prev, d ]));
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
			<MultiCards info={fullData} />
		</>
	);
}

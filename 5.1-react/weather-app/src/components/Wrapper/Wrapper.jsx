import { useState } from "react";

import key from "../../apiKey.js";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";

export default function Wrapper() {
	//variables
	const [ data, setData ] = useState({});
	//create options modifier
	//city modifier
	const updateCity = async(newCity)=> {
		const cordUrl=`https://api.openweathermap.org/geo/1.0/direct?q=${newCity}&appid=${key}`;
		//fetch latitude and longitude
		fetch(cordUrl)
			.then(res=> res.json())
			.then(data=> {
				//fetch the weather
				const { lat, lon } = data[0];
				const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${key}`;
				fetch(weatherUrl)
					.then(res=> res.json())
					.then(data=> {
						setData(data)});
				return { city: newCity, lat: lat, lon: lon };
			});
	};
	//view
	return (
		<>
			<Filter cityUpdater={updateCity} />
			<hr/>
			<Card data={data} />
		</>
	);
}

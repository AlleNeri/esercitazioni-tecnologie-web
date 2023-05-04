import key from "./apiKey.js";

export function getCordUrl(city) {
	return `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;
};

export function getWeatherUrl(cord) {
	const { lat, lon } = cord;
	return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${key}`;
};

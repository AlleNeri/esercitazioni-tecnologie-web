import "../../shared-css/index.css";

export default function Card(props) {
	const { data } = props;
	//render
	if(data.cod===200) {
		console.log(data);
		return (
			<div className="center">
				<img
					src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
					alt={data.weather[0].description}
					className="icon"
				/>
				<h2>{data.name}</h2>
				<h4>{data.weather[0].description}</h4>
				<p>Temperatura: {data.main.temp}°</p>
				<p>Umidità: {data.main.humidity}%</p>
				<p>Quantità di nuvole: {data.clouds.all}%</p>
				<p>Visibilità: {data.visibility}</p>
				<p>Vento: {data.wind.speed}m/s - {data.wind.deg}</p>
			</div>
		);
	}
	else return <div className="center"><p>Non ci sono dati</p></div>;
};

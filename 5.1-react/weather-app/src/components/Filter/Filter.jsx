import { useId } from "react";

import "../../shared-css/index.css";

export default function Filter(props) {
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
	//select id
	const selectId=useId();
	//render
	return (
		<div className="center">
			<label htmlFor={selectId}>Selezioneare la città: </label>
			<select
				id={selectId}
				onChange={e=> props.cityUpdater(e.target.value)}
				defaultValue="undefined"
			>
				<option disabled value="undefined">-- select an option --</option>
				{cities.map((city)=> (<option key={city.key} value={city.key}>{city.name}</option>))}
			</select>
		</div>
	);
};

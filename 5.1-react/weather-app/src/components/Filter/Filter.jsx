import { useId } from "react";

import "../../shared-css/index.css";

export default function Filter(props) {
	const { cities, cityUpdater } = props;
	//select id
	const selectId=useId();
	//render
	return (
		<div className="center">
			<label htmlFor={selectId}>Selezioneare la città: </label>
			<select
				id={selectId}
				onChange={e=> cityUpdater(e.target.value)}
				defaultValue="undefined"
			>
				<option disabled value="undefined">-- select an option --</option>
				{cities.map(city=> (<option key={city.key} value={city.key}>{city.name}</option>))}
			</select>
		</div>
	);
};

import Card from "../Card/Card";

import "./MultiCards.css"

export default function MultiCards(props) {
	//get the info
	const { info } = props;
	return <div className="flexbox">
		{info.map((elem, i)=> <Card data={elem} key={i} />)}
	</div>;
}

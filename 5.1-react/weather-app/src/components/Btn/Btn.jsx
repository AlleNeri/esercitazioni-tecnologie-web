import "../../shared-css/index.css";

export default function Btn(props) {
	//get the param
	const { text, triggered } = props;
	return <div className="center">
			<button onClick={()=> triggered()} >
				{text}
			</button>
		</div>;
};

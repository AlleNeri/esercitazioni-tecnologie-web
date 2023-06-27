import { useState, useRef } from "react";

function App() {
	const MAX=300;
	const [caratteri, setCaratteri]=useState(0);
	const [parole, setParole]=useState(0);
	const [rimanenti, setRimanenti]=useState(MAX);
	const inputRef=useRef(null);
	function myFun(evento) {
		const frase=evento.target.value;
		setCaratteri(frase.length);
		setRimanenti(MAX-caratteri);
		setParole(frase.split(" ").length);
		if(rimanenti<=1) {
			alert("Caratteri terminati!");
			inputRef.current.disabled=true;
		}
	};
	return <>
		<h1>Input testuale</h1>
		<hr/>
		<textarea ref={inputRef} name="myTextarea" onChange={myFun} />
		<p>Caratteri: {caratteri}</p>
		<p>Parole: {parole}</p>
		<p>Rimanenti: {rimanenti}</p>
	</>;
}

export default App;

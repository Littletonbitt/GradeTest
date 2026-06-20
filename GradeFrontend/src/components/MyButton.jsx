import { useState } from 'react'

function TextBox() {
	return (
		<div>
			<p>Here some text</p>
		</div>
	);
}

function ClickBox({ count, onClick }) {
	return (
		<button onClick={onClick}>
			{count}
		</button>
	);
}

function MyButton() {
	const [count, setCount] = useState(0);
	function handleClick() {
		setCount(count + 1);
	}

	return (
		<div>
			<TextBox />
			<ClickBox count={count} onClick={handleClick}/>
		</div>
	);
}

export default MyButton;

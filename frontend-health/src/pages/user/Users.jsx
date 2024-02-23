import React,{useState} from 'react';
import { Register } from "./Register";
import { Login } from "./Login";
 export default function Users() {
	const [currentForm, setCurrentForm] = useState("login");
	const toggleForm = (formName) => {
		setCurrentForm(formName);
	};
	return (
		<div>
			{currentForm === "login" ? (
				<Login onFormSwitch={toggleForm} />
			) : (
				<Register onFormSwitch={toggleForm} />
			)}
			)
		</div>
	);
}


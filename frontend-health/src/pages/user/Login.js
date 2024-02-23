import React, { useState } from "react";

export const Login = (props) => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email);
	};

	return (
		<div className="flex flex-col	center">
			<h2 className="bigheadtext">Login</h2>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<label htmlFor="email">email</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="youremail@gmail.com"
					id="email"
					name="email"
				/>
				<label htmlFor="password">password</label>
				<input
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					placeholder="********"
					id="password"
					name="password"
				/>
				<button type="submit" className="btn-0 w-20">
					Log In
				</button>
			</form>
			<button
				type="button"
				className="hover:scale-150"
				onClick={() => props.onFormSwitch("register")}
			>
				Don't have an account? Register here.
			</button>
		</div>
	);
};

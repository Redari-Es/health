import React, { useState } from "react";

export const Register = (props) => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [name, setName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email);
	};

	return (
		<div className="flex flex-col center">
			<h2 className="bigheadtext">Register</h2>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<label htmlFor="name">Full name</label>
				<input
					value={name}
					name="name"
					onChange={(e) => setName(e.target.value)}
					id="name"
					placeholder="full Name"
				/>
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
				<button type="submit" className="btn-0 w-20 mt-4 ">
					Register
				</button>
			</form>
			<div>
				<span className='text-xl'>
					Already have an account?
				</span>
				<button
					type="button"
					className="mt-4 ml-6 text-custom0 text-xl font-bold hover:scale-125"
					onClick={() => props.onFormSwitch("login")}
				>
					Login here.
				</button>
			</div>
		</div>
	);
};

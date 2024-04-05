import React, { useState } from "react";
import { useAuth } from '../../layouts/States'
import { useNavigate } from 'react-router'

export const Login = (props) => {
	// 
	const { login } = useAuth()
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [name, setName] = useState("")
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email);
	};
	const handleLogin = () => {
		const userData = {
			username: name,
			email: email,
		}
		login(userData)
		navigate(`/$name`)
	}

	return (
		<div className="flex flex-col	center">
			<h2 className="bigheadtext">Login</h2>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<label htmlFor="name">用户名</label>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="请输入用户名"
					id="name"
					name="name"
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
				<button type="submit" className="btn-0 w-20 mt-4"
					onClick={handleLogin}
				>
					Log In
				</button>
			</form>
			<div>
				<span className='text-xl'>Don't have an account?</span>
				<button
					type="button"
					className="mt-4 ml-6 text-custom0 text-xl font-bold hover:scale-125"
					onClick={() => props.onFormSwitch("register")}
				>
					Register here.
				</button>
			</div>
		</div>
	);
};

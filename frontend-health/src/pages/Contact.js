import React, { useState } from "react";
import contactImg from "../assets/img/contact-img.svg";
import { NavigationButtons, idToUrlMap, navItems } from "../components/Section"



export const Contact = () => {
	return (
		<div>
			<div className="bg-contain bg-left w-full min-h-screen fixed z-0 animate-background scale-150" style={{ backgroundImage: `url(${contactImg})`, backgroundPositionX: '-20%' }} />
			<div className="flex flex-col justify-center items-center z-10 min-h-screen p-6 text-center relative" style={{ width: '40%', marginLeft: 'auto' }}>
				<h2 className="title0 text-5xl font-bold my-8">Get In Touch</h2>
				<ContactForm />
			</div>
			<NavigationButtons
				items={navItems}
				mappingFunction={(name) => idToUrlMap[name]}

				textSytle={'text-custom0 z-10 bg-custom0'}
			/>

		</div>
	);
};

const ContactForm = () => {
	const [formState, setFormState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		message: "",
	});
	const [submitStatus, setSubmitStatus] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState((prevFormState) => ({ ...prevFormState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5001/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formState),
			});
			const result = await response.json();
			if (result.code === 200) {
				setSubmitStatus({ success: true, message: "Message sent successfully" });
			} else {
				setSubmitStatus({ success: false, message: "Something went wrong, please try again later." });
			}
			setFormState({
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				message: "",
			});
		} catch (error) {
			setSubmitStatus({ success: false, message: "Error occurred, please try again later." });
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full p-4 m-4 max-w-md mx-auto z-10 relative items-end">
			<div className="mb-4">
				<input type="text" className="rounded p-2 border border-custom0 w-full" name="firstName" value={formState.firstName} onChange={handleChange} placeholder="First Name" required />
			</div>
			<div className="mb-4">
				<input type="text" className="rounded p-2 border border-custom0 w-full" name="lastName" value={formState.lastName} onChange={handleChange} placeholder="Last Name" required />
			</div>
			<div className="mb-4">
				<input type="email" className="rounded p-2 border border-custom0 w-full" name="email" value={formState.email} onChange={handleChange} placeholder="Email Address" required />
			</div>
			<div className="mb-4">
				<input type="tel" className="rounded p-2 border border-custom0 w-full" name="phone" value={formState.phone} onChange={handleChange} placeholder="Phone No." />
			</div>
			<div className="mb-4">
				<textarea className="rounded p-2 border border-custom0 w-full h-24" name="message" value={formState.message} onChange={handleChange} placeholder="Message" required></textarea>
			</div>
			<div className="flex items-center justify-center">
				<button type="submit" className={`btn-0 ${submitStatus && submitStatus.success ? 'cursor-not-allowed' : ''}`}>
					<span className="inline-block py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
						{submitStatus ? submitStatus.message : "Send"}
					</span>
				</button>
			</div>
			{submitStatus && (
				<p className={`text-sm ${submitStatus.success ? "text-green-600" : "text-red-600"}`}>
					{submitStatus.message}
				</p>
			)}
		</form>
	);
};


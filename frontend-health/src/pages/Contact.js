import { useState } from "react";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";

export const Contact = () => {
	const formInitialDetails = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		message: "",
	};
	const [formDetails, setFormDetails] = useState(formInitialDetails);
	const [buttonText, setButtonText] = useState("Send");
	const [status, setStatus] = useState({});

	const onFormUpdate = (category, value) => {
		setFormDetails({
			...formDetails,
			[category]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setButtonText("Sending...");
		let response = await fetch("http://localhost:5000/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(formDetails),
		});
		setButtonText("Send");
		let result = await response.json();
		setFormDetails(formInitialDetails);
		if (result.code === 200) {
			setStatus({ succes: true, message: "Message sent successfully" });
		} else {
			setStatus({
				succes: false,
				message: "Something went wrong, please try again later.",
			});
		}
	};

	return (
		<section className="contact">
			<img
				className="w-screen h-[300px] animate__animated animate__zoomIn"
				src={contactImg}
				alt="Contact Us"
			/>
			<div className="animate__animated animate__fadeIn">
				<h2 className="flex center ">Get In Touch</h2>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col border-2 border-custom0 "
				>
					<input
						type="text"
						value={formDetails.firstName}
						placeholder="First Name"
						onChange={(e) => onFormUpdate("firstName", e.target.value)}
					/>
					<input
						type="text"
						value={formDetails.lasttName}
						placeholder="Last Name"
						onChange={(e) => onFormUpdate("lastName", e.target.value)}
					/>
					<input
						type="email"
						value={formDetails.email}
						placeholder="Email Address"
						onChange={(e) => onFormUpdate("email", e.target.value)}
					/>
					<input
						type="tel"
						value={formDetails.phone}
						placeholder="Phone No."
						onChange={(e) => onFormUpdate("phone", e.target.value)}
					/>
					<textarea
						rows="6"
						value={formDetails.message}
						placeholder="Message"
						onChange={(e) => onFormUpdate("message", e.target.value)}
					/>
					<button className="btn-0" type="submit">
						<span>{buttonText}</span>
					</button>
					{status.message && (
						<p className={status.success === false ? "danger" : "success"}>
							{status.message}
						</p>
					)}
				</form>
			</div>
		</section>
	);
};

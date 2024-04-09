
import React, { useState } from 'react';

// 通用样式类
const formInputStyle = {
	appearance: 'none',
	border: '1px solid #e2e8f0',
	borderRadius: '0.375rem',
	padding: '0.75rem 1rem',
	width: '100%',
	focusBorderColor: '#4299e1',
	focusRing: '0 0 0 3px #4299e1',
	focusRingOffset: '0.5rem',
};

// 表单输入组件
const Input = ({ type, id, label, ...props }) => {
	return (
		<div className="mb-4">
			<label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
				{label}
			</label>
			<input
				type={type}
				id={id}
				style={formInputStyle}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				required
			/>
		</div>
	);
};

// 表单组件
const FeedbackForm = ({ onSubmit }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [feedback, setFeedback] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ name, email, feedback });
	};

	return (
		<form onSubmit={handleSubmit} className="mx-auto max-w-md">
			<Input type="text" id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
			<Input type="email" id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
			<Input
				type="textarea"
				id="feedback"
				label="Feedback"
				value={feedback}
				onChange={(e) => setFeedback(e.target.value)}
				placeholder="Your feedback here..."
			/>
			<button type="submit" className="btn btn-blue text-xl font-bold rounded-md hover:-translate-y-1 active:-translate-y-2">
				Submit Feedback
			</button>
		</form>
	);
};

// 反馈列表组件
const FeedbackList = ({ feedbacks }) => {
	return (
		<div className="mt-8 space-y-4">
			{feedbacks.map((feedback) => (
				<div key={feedback.id} className="p-4 border rounded-lg border-gray-200 shadow-md">
					<h3 className="text-lg font-bold mb-2">{feedback.name}</h3>
					<p className="text-gray-700">Email: {feedback.email}</p>
					<p className="text-gray-700">{feedback.feedback}</p>
				</div>
			))}
		</div>
	);
};

// 用户反馈页面组件
const FeedBack = () => {
	const [feedbacks, setFeedbacks] = useState([]);

	const handleFeedbackSubmit = (feedbackData) => {
		setFeedbacks([...feedbacks, { ...feedbackData, id: Date.now() }]);
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-5xl font-bold mb-8 text-center">User Feedback</h1>
				<FeedbackForm onSubmit={handleFeedbackSubmit} />
				<h2 className="text-3xl font-bold mb-4 mt-8 text-center">Feedback List</h2>
				<FeedbackList feedbacks={feedbacks} />
			</div>
		</div>
	);
};

export default FeedBack;

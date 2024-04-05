import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import userIcon from "../assets/img/user1.png"

const UserProfile = () => {
	const { username } = useParams();
	return (
		<div className="flex items-center mb-4">
			<div className="w-20 h-20 flex-shrink-0 hover:scale-125">
				<img src={userIcon} alt="User Profile" className="rounded-full w-full h-full object-cover shadow-lg shadow-teal-800" />
			</div>
			<div className='flex flex-col items-center justify-center ml-4'>
				<span className="text-custom0 font-bold text-2xl">{username}</span>
				<TimeDisplay />
			</div>
		</div>
	);
}
const TimeDisplay = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<span className="text-custom7 font-bold text-base">{currentTime.toLocaleTimeString()}</span>
			<span className="text-custom7 font-bold text-base">{currentTime.toLocaleDateString()}</span>
		</>
	);
}


export default UserProfile;

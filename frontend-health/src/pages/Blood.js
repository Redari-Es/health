import React from 'react';
import UserProfile from '../components/UserProfile'
import { Title } from "../components/Pages"


export default function Blood() {

	return (
		<div className="animate__animated animate__fadeInDown">
			<Title text="血糖血压" />
			<UserProfile />
		</div>
	)

}


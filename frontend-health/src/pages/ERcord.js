import React from 'react';
import UserProfile from '../components/UserProfile'
import { Title } from "../components/Pages"


export default function ERcord() {

	return (
		<div className="animate__animated animate__fadeInDown">
			<Title text="健身记录" />
			<UserProfile />
		</div>
	)

}


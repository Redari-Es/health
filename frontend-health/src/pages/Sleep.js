import React from 'react';
import UserProfile from '../components/UserProfile'
import { Title } from "../components/Pages"


export default function Sleep() {

	return (
		<div className="animate__animated animate__fadeInDown">
			<Title text="睡眠" />
			<UserProfile />
		</div>
	)

}


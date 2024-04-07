import React from 'react';
import UserProfile from '../components/UserProfile'
import { Title } from "../components/Pages"


export default function Family() {

	return (
		<div className="animate__animated animate__fadeInDown">
			<Title text="家庭" />
			<UserProfile />
		</div>
	)

}

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import userIcon from "../assets/img/user1.png"
import { useTranslation } from "react-i18next"


const UserProfile = () => {
	const { username } = useParams();
	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center mb-4" >
				<div className="w-20 h-20 flex-shrink-0 hover:scale-125">
					<img src={userIcon} alt="User Profile" className="rounded-full w-full h-full object-cover shadow-lg shadow-teal-800" />
				</div>
				<div className='flex flex-col items-center justify-center ml-4'>
					<span className="text-custom0 font-bold text-2xl">{username}</span>
					<TimeDisplay />
				</div>
			</div >
		</div >
	);
}

// 用户详情组件
export const UserDetail = ({ user }) => {
	const { t } = useTranslation()
	// 使用 useMemo 缓存翻译结果，避免不必要的重复计算
	const translatedKeys = React.useMemo(() => {
		return Object.keys(user.userInfo).reduce((acc, key) => {
			acc[key] = t(`user.userInfo.${key}`); // 翻译文本的键是 userInfo.后面跟着属性名
			return acc;
		}, {});
	}, [user.userInfo, t]);

	return (
		<div className="bg-white shadow-md rounded-lg p-4 mb-4">
			<h2 className="text-center text-4xl font-bold mb-6">{t("user.userInfo.title")}</h2>
			<table className="w-full text-gray-700">
				<thead>
					<tr className="border-b">
						<th className="text-sm font-semibold text-center p-2">{t("user.userInfo.status")}</th>
						<th className="text-sm font-semibold text-center p-2">{t("user.userInfo.value")}</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(user.userInfo).map(([key, value]) => (
						<tr key={key} className="border-b text-center">
							<td className="p-2 font-medium">{translatedKeys[key]}</td>
							<td className="p-2">{value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

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


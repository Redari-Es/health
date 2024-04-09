import React, { useState } from 'react';
import UserProfile from '../components/UserProfile'
import { Title } from "../components/Pages"

// 家庭成员数据.js
const members = [
	{ name: '张三', age: 35, gender: '男' },
	{ name: '李四', age: 30, gender: '女' },
	{ name: '王五', age: 12, gender: '男' },
	// 更多家庭成员...
];

export default function Family() {

	return (
		<div className="animate__animated animate__fadeInDown">
			<Title text="家庭" />
			<UserProfile />
			<FamilyPage />

		</div>
	)

}
// FamilyPage.js

const FamilyPage = () => {
	const [familyMembers, setFamilyMembers] = useState(members);
	const handleAddMember = () => {
		const newMember = {
			id: familyMembers.length + 1,
			name: '新成员',
			age: 0,
			gender: '未知',
		};
		setFamilyMembers([...familyMembers, newMember]);
	};

	const handleEditMember = (memberId, updatedInfo) => {
		setFamilyMembers(members =>
			members.map(member => member.id === memberId ? { ...member, ...updatedInfo } : member)
		);
	};

	const handleDeleteMember = (memberId) => {
		setFamilyMembers(members =>
			members.filter(member => member.id !== memberId)
		);
	};

	return (
		<div className="container mx-auto p-4">
			<Title text="家庭成员" />
			<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none mb-4" onClick={handleAddMember}>
				添加成员
			</button>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{familyMembers.map(member => (
					<FamilyMemberCard key={member.id} member={member} onEdit={() => handleEditMember(member.id, { name: prompt('请输入新姓名') || member.name, age: prompt('请输入新年龄') || member.age, gender: prompt('请输入新性别') || member.gender })} onDelete={() => handleDeleteMember(member.id)} />
				))}
			</div>
		</div>
	);
};



const FamilyMemberCard = ({ member, onEdit, onDelete }) => {
	return (
		<div className="bg-white shadow-md p-4 rounded-lg mb-4">
			<div className="flex flex-col items-center justify-center">
				<h2 className="text-2xl font-bold mb-1">{member.name}</h2>
				<p className="text-gray-600 text-sm">年龄: {member.age}</p>
				<p className="text-gray-600 text-sm">性别: {member.gender}</p>
			</div>
			<div className="flex justify-center mt-2 space-x-2">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none" onClick={onEdit}>
					编辑
				</button>
				<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none" onClick={onDelete}>
					删除
				</button>
			</div>
		</div>
	);
};


const Modal = ({ isOpen, onClose, children }) => {
	const [visible, setVisible] = useState(isOpen);

	const hideModal = () => {
		setVisible(false);
		onClose();
	};

	return (
		<div className={`fixed inset-0 z-50 ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
			<div className="absolute inset-0 bg-gray-600 bg-opacity-75 transition-opacity">

			</div>
			<div className="relative p-8 flex flex-col items-center justify-center h-screen">
				<div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
					{children}
					<div className="flex justify-end">
						<button onClick={hideModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none">              关闭
						</button>
					</div>
				</div>
			</div>
		</div>);
}

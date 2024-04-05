import React, { useContxt } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Heart, Hrv, Rhr, Rates } from './charts/Hearts'
import { Link } from "react-router-dom";
import UserProfile from '../components/UserProfile'
import userIcon from '../assets/img/user1.png'
import { useParams } from 'react-router'


const cardItem = {
	Heart: ['心率', '心率相关的详细信息或数据。'],
	Hrv: ['心率变异性', '心率变异性相关的详细信息或数据。'],
	Rhr: ['静息心率', '静息心率相关的详细信息或数据。'],
	Rates: ['心率表', '心率相关的详细信息或数据。'],
}
// 定义组件映射对象
const componentMap = {
	Heart: <Heart />,
	Hrv: <Hrv />,
	Rhr: <Rhr />,
	Rates: <Rates />,
}
// 根据索引值获取对应的组件
export const Summary = () => {

	return (
		<div className="animate__animated animate__fadeInDownBig">
			<UserProfile />
			<div className='flex'>
				<span className=' text-center items-center p-2 shadow-2xl shadow-gray-500 justify-center text-3xl font-bold text-custom6 w-screen mb-6 border border-solid rounded bg-custom7 transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-110 hover:bg-custom0'>心率视图</span>
			</div>
			<div className='grid grid-cols-2 gap-8'>
				{Object.keys(cardItem).map((key) => (
					<MultiActionAreaCard key={key} props={key} />
				))}
			</div>
		</div>
	)
}

export function MultiActionAreaCard({ props }) {
	const index = props
	const content = cardItem[index]
	const RenderedComponent = componentMap[index] || null;
	const { username } = useParams();
	return (
		<Card sx={{
			maxWidth: 600,
			maxHeight: 800,
			backgroundColor: '#185864',
			borderRadius: 2, // 圆角半径
			boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)', // 阴影效果
			boxSizing: 'border-box', // 盒模型设置
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			transition: 'transform 0.2s ease-in-out', // 添加过渡效果
			'&:hover': {
				transform: 'scale(1.05)', // 鼠标悬停时放大
			}
		}}>

			< CardActionArea >
				{
					< CardContent >
						<Typography gutterBottom variant="h4" component="div">
							{RenderedComponent}
						</Typography>
						<Typography variant="body2" color="white">
							{content[1]}
						</Typography>
					</CardContent>
				}
			</ CardActionArea>
			<CardActions>
				<Button
					component={Link}
					to={`${username}/hearts/${index}`}
					size="large" sx={{ color: "#f9a647" }}
				>
					Click
				</Button>
			</CardActions>
		</ Card >
	);
}

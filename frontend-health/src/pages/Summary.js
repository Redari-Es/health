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
import { Title } from "../components/Pages"
import Vision from './Vision'
import Body from './Body'
import Family from './Family'
import Breath from './Breath'
import Blood from './Blood'
import ERcord from './ERcord'
import Sleep from './Sleep'


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
		<>
			<div className="animate__animated animate__fadeInDownBig mb-6">
				<UserProfile />
				<Title text="心率视图" />
				<div className='grid grid-cols-2 gap-8'>
					{Object.keys(cardItem).map((key) => (
						<MultiActionAreaCard key={key} props={key} />
					))}
				</div>
			</div>
			<Body />
			<ERcord />
			<Breath />
			<Sleep />
			<Vision />
			<Blood />
		</>
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

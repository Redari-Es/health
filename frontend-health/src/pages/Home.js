import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from "react-router-dom";
import BasicPagination from "../components/BasicPagination";
import { Title } from "../components/Pages"
import { Link } from 'react-router-dom';
import { Banner } from './Banner'
import { NavigationButtons, BottomNavigation, ScrollSections } from '../components/Section'
import { useTranslation } from 'react-i18next';
import { LangBtn } from '../components/Language'

const sectionIds = ['#welcome', '#banner', 'admin', 'Dashboard'];


const Home = () => {
	const { t, i18n } = useTranslation();


	return (
		<ScrollSections sectionIds={sectionIds}>
			<div className="min-h-screen bg-gradient-to-b from-custom6 to-purple-500">
				{/* 传递 language 属性给 Welcome 组件 */}
				<Welcome title={t('welcome.title')} description={t('welcome.description')} button={t('welcome.button')} />
				<Banner greeting={t('banner.greeting')} description={t('banner.description')} connectBtn={t('banner.connect')} />
				<BottomNavigation sectionIds={sectionIds} />
			</div>
		</ScrollSections >
	);
};


// Welcome.js
const Welcome = ({ title, description, button }) => {

	return (
		<section id="#welcome" className="screen">
			<div className="p-4 flex flex-col gap-10 items-center justify-center text-center">
				<div className="flex flex-col gap-4">
					<h1 className="bigtitle title0">{title}</h1>
				</div>
				<p className="text-sm md:text-base font-light">{description}</p>
				<div className="flex flex-row gap-4 items-center justify-center mx-auto">
					<Link to="/dashboard" className="btn-1">{button}</Link>
					<LangBtn />
				</div>
			</div>
		</section >
	);
};


export default Home;

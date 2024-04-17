import React from "react";
import Typography from "@mui/material/Typography";
import { Title } from '../components/Pages'
import { ScrollSections, BottomNavigation, navItems, idToUrlMap, NavigationButtons } from '../components/Section'
import { useTranslation } from "react-i18next"


const sectionIds = ['#about1', '#about2', '#about3', '#about4'];

export default function About() {
	const { t } = useTranslation()
	const vision = t('about.vision')
	const features = t('about.features')
	const howToUse = t('about.howToUse')
	const contactUs = t('about.contactUs')

	return (
		<>
			<ScrollSections sectionIds={sectionIds}>
				<div className="min-h-screen bg-gradient-to-b from-custom6 to-purple-500">
					<AboutVision title={vision.title} content={vision.content} btn={vision.btn} />
					<AboutFeatures title={features.title} content={features.content} />
					<HowToUse title={howToUse.title} steps={howToUse.steps} />
					<ContactUs title={contactUs.title} more={contactUs.more} contactInfo={contactUs.info} />
					<BottomNavigation sectionIds={sectionIds} />
					<NavigationButtons
						items={navItems}
						mappingFunction={(name) => idToUrlMap[name]}
					/>
				</div>
			</ScrollSections>
		</>
	);
}

const AboutVision = ({ title, content, btn }) => {
	return (
		<section id="#about1" className="flex items-center justify-center h-screen">
			<div className="max-w-6xl mx-auto px-4 py-16 text-center">
				<h1 className="text-5xl font-bold mb-8 text-custom0 hover:scale-110">{title}</h1>
				<p className="text-xl text-gray-700 leading-relaxed max-w-2xl mb-12">
					{content}
				</p>
				<div className="flex gap-4 justify-center">
					<a href="contact" className="inline-block px-4 py-3 mt-4 rounded-md bg-custom0 text-white font-medium text-lg hover:scale-[1.05] transition duration-300 ease-in-out animate-pulse">
						{btn}
					</a>
				</div>
			</div>
		</section>
	);
};


const AboutFeatures = ({ title, content }) => {

	return (
		<section id="#about2" className="flex items-center justify-center h-screen">
			<div className="container text-center mx-auto">
				<h2 className="text-center text-5xl font-bold pb-6 mb-10 hover:scale-110">{title}</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{content.map((feature, index) => (
						<div key={index} className="feature-item rounded-lg shadow-md p-6 transform transition hover:scale-110 duration-300 ease-in-out">
							<h3 className="text-xl font-medium mb-2">{feature.title}</h3>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};



// StepCard.js
const StepCard = ({ stepNumber, title, description }) => {
	return (
		<div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-3xl transform hover:scale-105 duration-300 ease-in-out">
			<span className="text-lg text-costom0 font-medium">Step {stepNumber}</span>
			<h3 className="text-xl font-bold my-2"> {title}</h3>
			<p className="text-gray-600">{description}</p>
		</div>
	);
};

// HowToUse.js
const HowToUse = ({ title, steps }) => {

	return (
		<section id="#about3" className="flex items-center justify-center h-screen">
			<div className="max-w-6xl mx-auto px-4 py-8 text-center">
				<h2 className=" uppercaes text-5xl font-bold mb-8 pb-5 hover:scale-110">{title}</h2>
				<div className="mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{steps.map((step, index) => (
						<StepCard key={index} {...step} />
					))}
				</div>
			</div>
		</section>
	);
};

const ContactUs = ({ title, more, contactInfo }) => {

	// 遍历联系信息数组并生成联系卡片
	const contactCards = contactInfo.map((item, index) => (
		<div key={index} className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:shadow-xl hover:transform hover:scale-105">
			<div className="flex flex-col h-full text-center gap-4">
				<h3 className="text-2xl font-bold mb-2 ">{item.title}</h3>
				<a href={item.link} className="text-blue-700 hover:text-blue-900 focus:outline-none">
					<span className="flex-1">{item.detail}</span>
				</a>
				<div className="mt-2">
					<a href={item.link} className="text-green-700 font-bold hover:text-blue-900 focus:outline-none">
						<span className="cursor-pointer">{more}</span>
					</a>
				</div>
			</div>
		</div>
	));

	return (
		<section id="#about4" className="min-h-screen flex items-center justify-center">
			<div className="max-w-6xl mx-auto">
				<h2 className=" uppercaes text-5xl font-bold text-center hover:scale-110 pb-5 mb-10">{title}</h2>
				<div className="grid gap-8 md:grid-cols-3">
					{contactCards}
				</div>
			</div>
		</section>
	);
};

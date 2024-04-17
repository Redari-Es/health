
import React, { useEffect, useRef } from 'react';
import { Outlet } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const sectionIds = ['#welcome', '#banner'];

export const ScrollSections = ({ children, sectionIds }) => {
	const lastScrollPosition = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const windowHeight = window.innerHeight;

			sectionIds.forEach((sectionId, index) => {
				const section = document.getElementById(sectionId);
				if (section) {
					const rect = section.getBoundingClientRect();
					const sectionTop = rect.top + scrollPosition;
					const sectionBottom = rect.bottom + scrollPosition;

					// Calculate the scroll distance for half of the window height
					const scrollDistance = windowHeight * 0.3;

					// Check if scrolled past half of the section
					if (scrollPosition >= sectionTop + scrollDistance && scrollPosition < sectionBottom - scrollDistance) {
						// Determine direction of scroll
						const direction = scrollPosition > lastScrollPosition.current ? 1 : -1;

						// Calculate index of next section
						let nextIndex = index + direction;
						nextIndex = Math.min(Math.max(nextIndex, 0), sectionIds.length - 1);

						const nextSectionId = sectionIds[nextIndex];
						const nextSection = document.getElementById(nextSectionId);
						if (nextSection) {
							const scrollTop = nextSection.offsetTop - (windowHeight - nextSection.clientHeight) / 2;
							window.scrollTo({
								top: scrollTop,
								behavior: 'smooth'
							});
							lastScrollPosition.current = scrollPosition; // 更新 ref
						}
					}
				}
			});
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div>
			{children}
			<Outlet />
		</div>
	);
};



//底部
export const BottomNavigation = ({ sectionIds, idTextMap }) => {
	const { t } = useTranslation()
	const handleClick = (id) => {
		const element = document.getElementById(id);
		if (element) {
			const offset = element.offsetTop - 50; // Adjust offset as needed
			window.scrollTo({
				top: offset,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div className="w-full shadow-lg">
			<div className="max-w-6xl mx-auto px-4 py-4 flex justify-center gap-4">
				{sectionIds.map((id, index) => (
					<a
						key={index}
						//# 当前
						//href={`#${id}`}
						href={`${id}`}
						className="flex items-center justify-center p-2 rounded-md border border-gray-300 text-sm hover:bg-custom5 text-white transition duration-300 ease-in-out cursor-pointer"
						onClick={() => handleClick(id)}
						style={{ textDecoration: 'none' }}
					>
						{t(`section.${id}`)}
					</a>
				))}
			</div>
		</div>
	);
}

export const navItems = ['Home', 'About', 'Contact', 'Dashboard'];

export const idToUrlMap = {
	'Home': '/home',
	'About': '/about',
	'Contact': '/contact',
	'Dashboard': '/dashboard',
};
export const NavigationButtons = ({ items, mappingFunction, textSytle }) => {
	const { t } = useTranslation()
	const handleClick = (id) => {
		const url = mappingFunction(id); // Get the URL based on the ID
		if (url) {
			window.location.href = url; // Navigate to the specified URL
		}
	};

	return (
		<div className="w-full shadow-lg">
			<div className='max-w-6xl mx-auto px-4 py-4 flex justify-center gap-4'>
				{items.map((item, index) => (
					<button
						key={index}
						onClick={() => handleClick(item)}
						className={`flex items-center justify-center p-2 rounded-md border border-gray-300 text-sm hover:bg-custom5 text-white transition duration-300 ease-in-out cursor-pointer ${textSytle} `}
					>
						{t(`navbar.${item}`)}
					</button>
				))}
			</div>
		</div >
	);
};

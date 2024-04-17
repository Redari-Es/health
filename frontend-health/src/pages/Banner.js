import { useState, useEffect } from "react";
import "animate.css";
import TrackVisibility from "react-on-screen";
import headerImg from "../assets/img/header-img.svg"; // Assuming you have imported headerImg
// import { useNavigation } from "react-router-dom";
import { LangBtn } from '../components/Language'

import { useTranslation } from 'react-i18next';
// 导入语言资源



export const Banner = ({ greeting, description, connectBtn }) => {
	const { t } = useTranslation();

	const [loopNum, setLoopNum] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [text, setText] = useState("");
	const [delta, setDelta] = useState(300 - Math.random() * 100);
	const [index, setIndex] = useState(1);
	const toRotate = t('banner.roles', { returnObjects: true });
	const period = 2000;

	useEffect(() => {
		let ticker = setInterval(() => {
			tick();
		}, delta);

		return () => {
			clearInterval(ticker);
		};
	}, [text]);

	const tick = () => {
		let i = loopNum % toRotate.length;
		let fullText = toRotate[i];
		let updatedText = isDeleting
			? fullText.substring(0, text.length - 1)
			: fullText.substring(0, text.length + 1);

		setText(updatedText);
		if (isDeleting) {
			setDelta((prevDelta) => prevDelta / 2);
		}
		if (!isDeleting && updatedText === fullText) {
			setIsDeleting(true);
			setIndex((prevIndex) => prevIndex - 1);
			setDelta(period);
		} else if (isDeleting && updatedText === "") {
			setIsDeleting(false);
			setLoopNum(loopNum + 1);
			setIndex(1);
			setDelta(500);
		} else {
			setIndex((prevIndex) => prevIndex + 1);
		}
	};


	return (
		<section className="#banner flex items-center justify-center" id="banner" style={{ height: "100vh" }}>
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap items-center">
					<div className="w-full md:w-1/2 xl:w-7/12 md:order-2">
						<TrackVisibility>
							{({ isVisible }) => (
								<div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
									<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
										{greeting}
										<br />
										<span
											className="txt-rotate"
											dataPeriod="1000"
											data-rotate={JSON.stringify(toRotate)}
										>
											<span className="wrap">{text}</span>
										</span>
									</h1>
									<p className="text-gray-600">{description}</p> {/* 使用翻译函数来获取介绍文本 */}
									<button
										className="btn-1 inline-flex items-center mt-8"
										type="submit"
										onClick={() => console.log("connect")}
									>
										{connectBtn}
									</button>
								</div>
							)}
						</TrackVisibility>
					</div>
					<div className="w-full md:w-1/2 xl:w-5/12 md:order-1">
						<TrackVisibility>
							{({ isVisible }) => (
								<div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
									<img src={headerImg} alt="Header Img" className="h-full" />
								</div>
							)}
						</TrackVisibility>
					</div>
				</div>
			</div>
		</section>
	);
};

/*
export const Banner = () => {
	// const navigation = useNavigation()
	const [loopNum, setLoopNum] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [text, setText] = useState("");
	const [delta, setDelta] = useState(300 - Math.random() * 100);
	const [index, setIndex] = useState(1);
	const toRotate = [
		"Web Developer",
		"Web Designer",
		"UI/UX Designer",
		"Go Developer",
		"React Developer",
	];
	const period = 2000;

	useEffect(() => {
		let ticker = setInterval(() => {
			tick();
		}, delta);

		return () => {
			clearInterval(ticker);
		};
	}, [text]);

	const tick = () => {
		let i = loopNum % toRotate.length;
		let fullText = toRotate[i];
		let updatedText = isDeleting
			? fullText.substring(0, text.length - 1)
			: fullText.substring(0, text.length + 1);

		setText(updatedText);
		if (isDeleting) {
			setDelta((prevDelta) => prevDelta / 2);
		}
		if (!isDeleting && updatedText === fullText) {
			setIsDeleting(true);
			setIndex((prevIndex) => prevIndex - 1);
			setDelta(period);
		} else if (isDeleting && updatedText === "") {
			setIsDeleting(false);
			setLoopNum(loopNum + 1);
			setIndex(1);
			setDelta(500);
		} else {
			setIndex((prevIndex) => prevIndex + 1);
		}
	};

	return (
		<section className="#banner flex items-center justify-center" id="banner" style={{ height: "100vh" }}>
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap items-center">
					<div className="w-full md:w-1/2 xl:w-7/12 md:order-2">
						<TrackVisibility>
							{({ isVisible }) => (
								<div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
									<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
										Hi! I'm Shon{" "}
										<span
											className="txt-rotate"
											dataPeriod="1000"
											data-rotate='["Web Developer", "Web Designer", "UI/UX Designer"]'
										>
											<span className="wrap">{text}</span>
										</span>
									</h1>
									<p className="text-gray-600">
										Lorem Ipsum is simply dummy text of the printing and typesetting
										industry. Lorem Ipsum has been the industry's standard dummy text
										ever since the 1500s, when an unknown printer took a galley of
										type and scrambled it to make a type specimen book.
									</p>
									<button
										className="bg-custom0 text-white py-2 px-4 rounded-md mt-8 inline-flex items-center hover:bg-blue-600 transition duration-300"
										type="submit"
										onClick={() => console.log("connect")}
									// onClick={() => navigation('contact')}
									>
										Let’s Connect
									</button>
								</div>
							)}
						</TrackVisibility>
					</div>
					<div className="w-full md:w-1/2 xl:w-5/12 md:order-1">
						<TrackVisibility>
							{({ isVisible }) => (
								<div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
									<img src={headerImg} alt="Header Img" className="h-full" />
								</div>
							)}
						</TrackVisibility>
					</div>
				</div>
			</div>
		</section>
	)
}
	*/

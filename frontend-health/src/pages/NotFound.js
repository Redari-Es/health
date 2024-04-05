import React from 'react';


export const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-custom0">
			<div className="flex flex-col items-center justify-center animate__animated animate__fadeInDown ">
				<h1 className="text-6xl text-custom6 font-bold mb-4 hover:scale-125">404 - Page Not Found</h1>
				<p className="text-3xl text-white mb-8">The page you are looking for does not exist.</p>
				<a href="/" className=" text-2xl text-custom8 hover:scale-125 hover:font-bold">Go back to Home</a>
			</div>
		</div>
	);
};

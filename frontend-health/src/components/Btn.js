
import React from 'react'

export const MenuBtn = ({ Menu, current, onClick }) => {
	return (
		<div className="log-buttons flex items-center justify-center m-4" >
			{
				Menu.map((button, index) => (
					<button
						key={index}
						className={`animate__animated animate__pulse space-x m-3 py-3 w-1/6 border rounded-xl bg-custom0 text-white ${current === button.current ? `transition ease-in-out bg-custom5 w-1/4 font-bold py-6 animate__animated animate__pulse animate__infinite animate__slow` : 'hover:w-1/4 hover:py-6 hover:font-bold hover:bg-custom5'}`}
						onClick={() => { onClick(button.current) }}
					>
						{button.label}
					</button>
				))
			}
		</div >
	)
}

export const MenuBtn1 = ({ Menu, current, onClick }) => {
	return (
		<div className="log-buttons flex items-center justify-center m-4" >
			{
				Menu.map((button, index) => (
					<button
						key={index}
						className={`transition ease-in-out border bg-custom0 button-wrap space-x text-white py-3 m-3 w-1/6 rounded-xl hover:w-1/4 hover:font-bold hover:shadow-2xl
							${current === button.current ? 'transition ease-in-out bg-custom5 w-1/4 py-6 font-bold animate__animated animate__slow animate__pulse animate__infinite' : 'hover:w 1/4 hover:py-6 hover-bold hover:bg-custom5'}
							`}
						onClick={() => { onClick(button.current) }}
					>
						{button.label}
					</button>
				))
			}
		</div >
	)
}

export const MenuBtn2 = ({ Menu, current, onClick }) => {
	return (
		<div className="flex m-4">

			{/* 遍历 form 对象中的键，并生成相应的按钮 */}
			{Object.keys(Menu).map(formName => (
				<button key={formName} onClick={() => onClick(formName)}
					className={`border bg-custom0 text-white p-3 m-2 rounded-xl hover:scale-125 hover:font-bold hover:shadow-2xl
							${current === formName ? 'bg-custom5 py-4 font-bold animate__animated animate__slow animate__pulse animate__infinite' : ''}
							`}
				>
					{Menu[formName][1] || Menu[formName][0]}
				</button>
			))}
		</div>

	)
}


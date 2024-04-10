import React,{useState,useEffect} from 'react';
import { useAuth } from '../../layouts/States'
import { useNavigate } from 'react-router'
import {submitForm} from '../../databus/FrontApi.js'
import { Outlet } from "react-router-dom";


const login={
	name:'login',
	title:'Login',
	button:'Log In',
	toggle:[
		"Don't have an account?",
		'register',
		'Register Here']
}


const register={
	name:'register',
	title:'Register',
	button:'Register',
	toggle:[
		"Already have an account?",
		'login',
		'Login Here']
}

 export default function Users({children}) {
	const [currentForm, setCurrentForm] = useState("login");
	const toggleForm = (formName) => {
		setCurrentForm(formName);
	};
	return (
		<div>
			{currentForm === "login" ? (
				<User onFormSwitch={toggleForm} text={login} formFields={loginFields} />
			) : (
				<User onFormSwitch={toggleForm} text={register} formFields={registerFields} />
			)}
		</div>
	);
}

const loginFields = {
	user_name: {
		type: 'text',
		placeholder: '请输入用户名',
		label: '用户名',
		value: ''
	},
	email: {
		type: 'email',
		placeholder: 'youremail@gmail.com',
		label: '邮 箱',
		value: ''
	},
	password: {
		type: 'password',
		placeholder: '请输入密码',
		label: '密码',
		value: ''
	},
}

const registerFields = {
	user_name: {
		type: 'text',
		placeholder: '请输入用户名',
		label: '用户名',
		value: ''
	},
	email: {
		type: 'email',
		placeholder: 'youremail@gmail.com',
		label: '邮 箱',
		value: ''
	},
	password: {
		type: 'password',
		placeholder: '请输入密码',
		label: '密码',
		value: ''
	},
	repassword: {
		type: 'password',
		placeholder: '请重新输入密码',
		label: '验证密码',
		value: ''
	}

}

export const User = (props) => {
	const { login } = useAuth()

	// const [formFields,setFormFields]=useState(props.formFields)
	const text=props.text
	const api=text.name
	
  // 使用 useEffect 确保在 props.formFields 发生变化时更新 formFields 和 formData
  const [formFields, setFormFields] = useState(props.formFields);
  const [formData, setFormData] = useState({ ...props.formFields }); // 深拷贝初始化 formData

  useEffect(() => {
    setFormFields(props.formFields);
    setFormData({ ...props.formFields }); // 在 props.formFields 变化时更新 formData
  }, [props.formFields]);

	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault(); //阻止默认提交行为
		// 这里您可以添加表单验证逻辑，确保用户输入的数据有效
		//
  // 准备要提交的数据
  const formDataToSubmit = {
    formFields: { ...formData } // 深拷贝 formData，确保不会直接修改原始状态
  };
		// 在这里执行提交逻辑，比如发送请求给服务器
		 submitForm(api, formDataToSubmit, navigate,login);
  // 提交成功后的处理，比如跳转页面、显示成功消息等
  console.log("Form submitted successfully!", formDataToSubmit);
  // navigate('/success'); // 例如使用 react-router-dom 进行页面跳转

  // 清空表单数据（可选）
		
		// login(userData);
		// navigate(`/${name}`);
  // setFormData({ ...formFields })
	// 	console.log("formFields",formFields)
	};

	return (
		<div className="flex flex-col	center">
			<h2 className="bigheadtext">{text.title}</h2>
			<form className="flex flex-col m-4" onSubmit={handleSubmit}>
				{/* 遍历表单字段，并渲染表单元素 */}
				{Object.keys(formData).map((key) => (
					<div key={key} className="flex flex-col mb-4">
						<label htmlFor={key} className="mb-2">{formFields[key].label}</label>
						<input
							value={formData[key].value}
							onChange={handleInputChange}
							type={formFields[key].type}
							placeholder={formFields[key].placeholder}
							id={key}
							name={key}
							className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
						/>
					</div>
				))}

				<button type="submit" className="btn-0 w-20 mt-4">{text.button}</button>
			</form>
			<div>
				<span className='text-xl'>{text.toggle[0]}</span>
				<button
					type="button"
					className="mt-4 ml-6 text-custom0 text-xl font-bold hover:scale-125"
					onClick={() => props.onFormSwitch(`${text.toggle[1]}`)}
				>
		{text.toggle[2]}
				</button>
			</div>
		</div>
	);
};



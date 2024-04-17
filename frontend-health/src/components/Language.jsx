import { useLanguage } from '../layouts/States'

export const LangBtn=()=>{
		const { language, toggleLanguage } = useLanguage();

	return (
											<button
										className="btn-lang w-full mx-auto"
										type="submit"
										onClick={toggleLanguage}
									>
										{language === 'en' ? '切换至中文' : 'Switch to English'} {/* 根据当前语言显示按钮文本 */}
									</button>


	)
}

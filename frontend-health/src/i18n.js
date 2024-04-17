import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en_us from './locales/en/en_us.json'
import zh_cn from './locales/zh/zh_cn.json'
import nav_en from './locales/en/nav.json'
import nav_zh from './locales/zh/nav.json'

i18n
	// 检测用户当前使用的语言
	// 文档: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// 注入 react-i18next 实例
	.use(initReactI18next)
	// 初始化 i18next
	// 配置参数的文档: https://www.i18next.com/overview/configuration-options
	.init({
		debug: true,
		fallbackLng: 'en',
		returnObjects: true,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['cookie', 'navigator'],
			caches: ['cookie'],
		},
		resources: {
			en: {
				translation: Object.assign({}, en_us, nav_en)
			},
			zh: {
				// translation: {
				// 	...zh_cn,
				// 	nav: nav_zh
				// }
				translation: Object.assign({}, zh_cn, nav_zh)
			}
		}
	});

export default i18n;


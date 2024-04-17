import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en_us from './locales/en_us.json'
import zh_cn from './locales/zh_cn.json'

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
				// banner: en_us.banner
				translation: en_us
			},
			zh: {
				translation: zh_cn
			}
		}
	});

export default i18n;


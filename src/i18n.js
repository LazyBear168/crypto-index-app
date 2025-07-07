// File: src/i18n.js
// Author: Cheng
// Description: i18n configuration file for multilingual support using i18next and react-i18next.
//    Supports English (en) and Chinese (zh), with browser language auto-detection.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zh from './locales/zh.json';

i18n
  .use(LanguageDetector) // auto-detect user's language
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

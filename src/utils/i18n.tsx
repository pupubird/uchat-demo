import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEnglish from "../locales/en/common.json";
import translationChinese from "../locales/zh/common.json";
import translationKorean from "../locales/ko/common.json";
import translationJapanese from "../locales/ja/common.json";

const resources = {
    en: {
        translation: translationEnglish
    },
    zh: {
        translation: translationChinese
    },
    ko: {
        translation: translationKorean
    },
    ja: {
        translation: translationJapanese
    }
}

i18next.use(initReactI18next).init({
    resources,
    lng: "en"
})

export default i18next;
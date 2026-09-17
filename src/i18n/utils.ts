import es from "./es.json";
import en from "./en.json";

// diccionarios
const ui = {es, en};

// lectura de url
export function getLangFromUrl(url: URL){
    const [, lang] = url.pathname.split("/");

    if (lang in ui) return lang as keyof typeof ui;

    return 'es';
}

// traducción
export function useTranslations(lang: keyof typeof ui){
    return function t(key: keyof typeof ui['es']){
        return ui[lang][key] || ui['es'][key];
    }
}
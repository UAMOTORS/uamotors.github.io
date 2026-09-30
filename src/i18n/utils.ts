// imports español
import esFooter from "./es/esFooter.json";
import esTeam from "./es/esTeam.json";
import esHome from "./es/esHome.json";
import esNosotros from "./es/esNosotros.json";
import esProyecto from "./es/esProyecto.json";
import esAliados from "./es/esAliados.json";

//imports inglés
import enFooter from "./en/enFooter.json";
import enTeam from "./en/enTeam.json";
import enHome from "./en/enHome.json";
import enNosotros from "./en/enNosotros.json";
import enProyecto from "./en/enProyecto.json";
import enAliados from "./en/enAliados.json";

// objetos de idiomas
const es = {...esFooter, ...esTeam, ...esHome, ...esNosotros, ...esProyecto, ...esAliados};
const en = {...enFooter, ...enTeam, ...enHome, ...enNosotros, ...enProyecto, ...enAliados};

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
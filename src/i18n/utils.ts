// imports español
import esFooter from "./es/esFooter.json";
import esTeam from "./es/esTeam.json";
import esHome from "./es/esHome.json";
import esNosotros from "./es/esNosotros.json";
import esProyecto from "./es/esProyecto.json";
import esAliados from "./es/esAliados.json";
import esContacto from "./es/esContacto.json";
import esPrivacy from "./es/esPrivacy.json";
import esLogros from "./es/esLogros.json";

//imports inglés
import enFooter from "./en/enFooter.json";
import enTeam from "./en/enTeam.json";
import enHome from "./en/enHome.json";
import enNosotros from "./en/enNosotros.json";
import enProyecto from "./en/enProyecto.json";
import enAliados from "./en/enAliados.json";
import enContacto from "./en/enContacto.json";
import enPrivacy from "./en/enPrivacy.json";
import enLogros from "./en/enLogros.json";
;
// objetos de idiomas
const es = {...esFooter, ...esTeam, ...esHome, ...esNosotros, ...esProyecto, ...esAliados, ...esContacto, ...esPrivacy, ...esLogros};
const en = {...enFooter, ...enTeam, ...enHome, ...enNosotros, ...enProyecto, ...enAliados, ...enContacto, ...enPrivacy, ...enLogros};

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
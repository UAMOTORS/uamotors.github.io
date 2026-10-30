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
import es404 from "./es/es404.json";

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
import en404 from "./en/en404.json";

// objetos de idiomas
// const es = {...esFooter, ...esTeam, ...esHome, ...esNosotros, ...esProyecto, ...esAliados, ...esContacto, ...esPrivacy, ...esLogros, ...es404};
// const en = {...enFooter, ...enTeam, ...enHome, ...enNosotros, ...enProyecto, ...enAliados, ...enContacto, ...enPrivacy, ...enLogros, ...en404};

const es = {
    footer: esFooter,
    team: esTeam,
    home: esHome,
    nosotros: esNosotros,
    proyecto: esProyecto,
    aliados: esAliados,
    contacto: esContacto,
    privacy: esPrivacy,
    logros: esLogros,
    "404": es404
}

const en = {
    footer: enFooter,
    team: enTeam,
    home: enHome,
    nosotros: enNosotros,
    proyecto: enProyecto,
    aliados: enAliados,
    contacto: enContacto,
    privacy: enPrivacy,
    logros: enLogros,
    "404": en404
}

// diccionarios
const ui = {es, en};

// lectura de url
export function getLangFromUrl(url: URL){
    const [, lang] = url.pathname.split("/");

    if (lang in ui) return lang as keyof typeof ui;

    return 'es';
}

// traducción

type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends any[]
        ? never
        : ObjectType[Key] extends object
            ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
            : `${Key}`;
}[keyof ObjectType & (string | number)];

type translationKey = NestedKeyOf<typeof ui['es']>;

function getNestedValue(obj: any, path: string): string | undefined {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

export function useTranslations(lang: keyof typeof ui){
    return function t(key: translationKey){
        // return ui[lang][key] || ui['es'][key];
        return getNestedValue(ui[lang], key) || getNestedValue(ui['es'], key) || key;
    };
}
const fs = require('fs');

let content = fs.readFileSync('src/components/pages/contactoTemplate.astro', 'utf8');

// Add imports
content = content.replace(
  'import Building from "../../icons/general/Building.astro";\n---',
  'import Building from "../../icons/general/Building.astro";\nimport { getLangFromUrl, useTranslations } from "../../i18n/utils";\n\nconst lang = getLangFromUrl(Astro.url);\nconst t = useTranslations(lang);\n---'
);

// Meta properties
content = content.replace('pageTitle={siteConfig.title + " | Contacto"}', 'pageTitle={siteConfig.title + " | " + t("contacto.meta.title")}');
content = content.replace('description="¿Quieres colaborar, patrocinar o unirte a la escudería UAMOTORS? Ponte en contacto con nosotros a través de nuestros canales oficiales y representantes."', 'description={t("contacto.meta.desc")}');

// Titles
content = content.replace('<h1 class="sigmar-ff text-balance mb-8">Contacto</h1>', '<h1 class="sigmar-ff text-balance mb-8">{t("contacto.main.title")}</h1>');
content = content.replace('¿Por qué contactarnos?', '{t("contacto.why.title")}');
content = content.replace('Canales Oficiales', '{t("contacto.channels.title")}');
content = content.replace('Representantes Oficiales', '{t("contacto.reps.title")}');
content = content.replace('Ubicación Física', '{t("contacto.location.title")}');

// Why items
content = content.replace('Patrocinios:', '{t("contacto.why.item1.title")}');
content = content.replace('Para establecer <strong>alianzas estratégicas</strong> y vinculación\n              industria-academia.', '<span set:html={t("contacto.why.item1.text")} />');

content = content.replace('Donaciones:', '{t("contacto.why.item2.title")}');
content = content.replace('Gestión de apoyos monetarios, en especie o componentes para nuestro\n              monoplaza <a href="/proyecto"><strong>"OP"</strong></a>.', '<span set:html={t("contacto.why.item2.text")} />');

content = content.replace('Reclutamiento:', '{t("contacto.why.item3.title")}');
content = content.replace('Información sobre procesos de integración a la familia <strong\n                >UAMOTORS</strong\n              >.', '<span set:html={t("contacto.why.item3.text")} />');

// Reps items
content = content.replace('Capitán', '{t("contacto.reps.capitan")}');
content = content.replace(/>Ver perfil</g, '>{t("contacto.reps.ver_perfil")}<');

// Location items
content = content.replace('Dirección (Sede Azcapotzalco):', '{t("contacto.location.address.title")}');
content = content.replace('Institución:', '{t("contacto.location.inst.title")}');

fs.writeFileSync('src/components/pages/contactoTemplate.astro', content);
console.log("Updated contactoTemplate.astro");

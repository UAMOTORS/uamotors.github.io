const fs = require('fs');

let content = fs.readFileSync('src/components/pages/contactoTemplate.astro', 'utf8');

// Fix "Ver perfil"
content = content.replace(/\s+Ver perfil\s+/g, '\n                {t("contacto.reps.ver_perfil")}\n              ');

fs.writeFileSync('src/components/pages/contactoTemplate.astro', content);
console.log("Updated contactoTemplate.astro again");

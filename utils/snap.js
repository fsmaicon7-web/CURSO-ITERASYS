const = require(`fs`)
const path = require('path')

//constante para armazenar o local onde ficarão gravados os snapshots
const SHORTS_DIR = process.env.SCREENSHOTS_DIR

// garantir que o nome do arquivo seja compativel
function safe_name(name){
    return String(name).replace(/[^\w\d-_.]+/g,'_').slice(0,120)
}
/* salvar o screenshot quando solicitado, com nome amigavel
 @param {import('@playwright/test').Page} page
 @param{import('@playwright/test').TestInfo} teste_info
 @param{strings} label
 */

 async function sanp(page, teste_info, label) {
   const file = `${safe_name(teste_info.title)}__${safe_name(label)}.png`
   const dest = path.join(SHORTS_DIR,file) 

   fs.mkdirSync(SHORTS_DIR, {recursive: true})
   await page.screenshot({path: dest, fullPage: true})//tira o print
   return dest

 }
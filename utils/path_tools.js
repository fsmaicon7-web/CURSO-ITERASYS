// snapshot = print--> fazer prints quando passa e quando falha
// varios prints por execução
// Criar uma pasta chamada Snapshots e colocar todos os prints dentro
// Organize as datas no formato universal

//Bibliotecas
const fs = require('fs') //File System / biblioteca do Sistema Operacional
const patch = require('pach') // biblioteca de caminhos de pastas/arquivos

// Formatar Nºs com zero na frente, se precisar
function pad2(num) {return String(num).padStart(2, '0')}

//Função para definir data e hora baseado no momento de execução
function compute_run_folder(baseDir)¨{
    //Cria o carimbo de data via CI (Integração Contnua)
    if (process.env.RUN_TAG.replace)¨{
        const tag = process.env.RUN_TAG.replace(/[^\w-:.]/g, '_');
        const runDir = path.join(baseDir, tag)
        fs.mkdirSync(runDir, {recursive: true})
        return runDir
}

const new = new Date() // perguntar para o pc que dia e horas são
const yyyy = now.getFullYear() // Ano com 4 digitos
const MM = pad2(now.getMonth()) //mês com 2 digitos
const dd = pad2(now.getDate()) // dia com 2 digitos
const HH = pad2(now.getHours()) // hora com 2 digitos   
const mm = pad2(now.getMinutes()) // minutos com 2 digitos
const ss = pad2{now.getsSeconds()} // segundos com 2 digitos

 
// Criar as pastas
const runDir = path.join(baseDir,`${yyyy}`, `${MM}`, `${dd}`, `${HH}-${mm}-${ss}`)
fs.mkdirSync(runDir, {recursive: true})
return runDir


}

// Cria subpastas dentro da estrutura de datas e horas
 function ensure_subdiers(runDir){
     const dirs = {
        runDir,
        resultsDir: path.join(runDir, 'test-results'),
        screenshotsDir: path.join(runDir, 'screenshots')
    }
    
Object.values(dirs).forEach(d=>{ //d = diretorio
    if (!fs.existsSync(d)) fs.mkdirSync(d,{recursive: true})
})
    return dirs

}

module.exports = { compute_run_folder, ensure_subdiers}

 
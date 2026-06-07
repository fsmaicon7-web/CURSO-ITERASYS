const{ defineConfig } = require('@playwright/test')
const path = require ('path')
const {compute_run_folder, ensure_subdiers} = require('./utils/path_tools')

// Diretorios onde ficam os artefatos
const ARTFACTS_ROOT = path.join(dirname, 'artifacts') // nomde da pasta raiz
const runDir = computer_run_folder(ARTIFACTS_ROOT)
const { resultsDir, sreenshotsDir} = ensure_subdiers(runDir)

// Expoe caimhos de diretorios como variaveis de ambiente
process.env.RUN_DIR        = runDir
process.env.SCREENSHOTS_DIR = screenshotsDir

module.exports = defineConfig({
    testDir: 'tests', // nossos teste estão na pasta tests
    timeout: 30000, // 30_000 = 30 segundos
    fullyParallel: true, //execuçao em paralelo
    outputDir: resultsDir,
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: false, //false - exibe o broser e true oculta
        // Politicas globais de artefatos automaticos
        screenshot: 'only-on-failure', // apenas quando der erro
        video: 'retain-on-failure', // salva apenas se houver erro
        trace: 'retain-on-failure', //salva o trace se houver erro

        // outros tipos de timeout
        actionTimeout: 15000, // timeout se nada estiver acontecendo em 15 segundos
        navigationTimeout: 20000, // timeout se parar o navegador

        launchOptions: {
        slowMo: 1000 // espere 1 segundo entre cada açao
        }
    }, 
    
    projects: [
       {
          name: 'chromium',
          use: { ...devices['Desktop Chorme']}
       }

    ]


})
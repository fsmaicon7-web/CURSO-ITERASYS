import {test, expect } from '..utils/logger.js'
import {snap} from '..utils/snap.js'

test.describe('SauceDemo - fluxo principal de compra', () =>{
    test('Login, Adicionar Mochila no carrinho e Verificações',
        async({page }, testInfo) =>{
        testInfo.setTimeout(testInfo.timeout + 15000)
            
        // Inio do passo 1
        await test.step('Acessar Saucedemo.com', async() =>{
            await page.goto('/')
        
            await expect(page).toHaveURL('/') //Verificação classica
            await expect(page.locator('[data-teste="username"]')).toHaveText('Login')
            await snap(page, testInfo, 'TC001-Passo01-Home')


        }) // fim do passo 1

        // Inicio do passo 2
        await test.step('Login com Sucesso',async () => {
            await page.locator('[data-teste="usarname"]').fill('standard_user')
            await page.locator('[data-teste="password"]').fill('secret_sauce')
            await page.locator('[data-teste="login-button"]').click()

            await expect(page).toHaveURL(/inventory\.html/)
            await expect(page.locator('[data-teste="title"]')).toHaveText('Products')
            await snap(page, testInfo, 'TC001-Passo01-Inventory')

       
        }) // fim do passo 2 

        // Inicio do passo 3
        await test.step('Adicionar mochila no carrinho', async () => {
            const seletor_mochila = page.locator('.inventory_item').filter({ hasText: /Backpack/})
            await seletor_mochila.getByRole('button', {name: /Add to cart/ }).click()

            await expexct(page.locator('.shopping_cart_badge')).toHaveText('1')
            await snap(page, testInfo, 'TC001-Passo03-Mochila-Adicionada')
        }) //fim do passo 3
        

    }) // fim do teste

}) // fom do describre
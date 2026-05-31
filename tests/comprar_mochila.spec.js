// 1 - Referência e bibliotecas
// Declara um objeto chamado test vindo da biblioteca Playwright
const { test, expect } = require("@playwright/test");

// 2 - Classe ou Funções ou Métodos
// Um script pode executar de forma Assíncrona (passo a passo aguardando as respostas)
test("Realizar o fluxo de compra da mochila", async ({ page }) => {

    await page.goto('/'); // abre o browser no site alvo
    await expect(page).toHaveURL('/'); // verifica se está na página raiz
    
    const botao_login = page.locator("#login-button");
    
    // CORREÇÃO 1: Valida o atributo 'value' em vez do texto interno do botão
    await expect(botao_login).toHaveAttribute("value", "Login"); 

    // Realizar login
    await page.fill("[name='user-name']", 'standard_user');
    await page.fill('[placeholder="Password"]', "secret_sauce");
    await botao_login.click();

    // Pagina de Inventário / Produtos
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator("span.title")).toHaveText('Products'); 

    // Adicionar a mochila ao carrinho de compras
    // CORREÇÃO 2: Substituído o XPath instável pelo ID direto do botão da mochila
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Verificar se exibe o N 1 no carrinho de compras
    const icoQuantCart = 'span.shopping_cart_badge' // cssSelector
    await expect(page.locator(icoQuantCart)).toHaveText('1')

    //Clicar no icone do carrinho (Nº 1)
    await page.locator(icoQuantCart).click()


    // Verificar se está na página certa - cart
    await expect(page).toHaveURL(/.*cart/)
    const tituloSecao = '.title'
    await expect(page.locator(tituloSecao)).toHaveText('Your Cart')

    //Verificar dados funcionais
    await expect(page.locator('.cart_quantity')).toHaveText('1')
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99')

    //Espera de 1 segundo
    await page.waitForTimeout(1000) // alfinete temporario

}); // final do test

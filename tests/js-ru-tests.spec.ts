import { test, expect } from '@playwright/test'

test.describe('Функцилнальные тесты сайта learn.javascript.ru', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://learn.javascript.ru/')
    })

    test('Открытие статьи "Циклы while и for" с главной страницы', async ({ page }) => {
        await page.locator('a:has-text("Циклы while и for")').click()
        await expect(page.locator('.main__header-title')).toHaveText('Циклы while и for')
    })

    test('Работа строки поиска', async ({ page }) => {
        await page.locator('.text-input__frontpage-search__input').click()
        await page.locator('.text-input__frontpage-search__input').fill('switch')
        await page.locator('.text-input__frontpage-search__input').press('Enter')
        await expect(page.locator('.search-results__title-link').first()).toHaveText('Конструкция "switch"')
    })

    test('Смена темы сайта на темную и обратно', async ({ page }) => {
        await expect(page.locator('.theme-changer__icon >> nth=1')).toHaveClass('theme-changer__icon theme-changer__icon_dark-theme')
        await page.locator('.theme-changer__icon >> nth=1').click()
        await expect(page.locator('.theme-changer__icon >> nth=0')).toHaveClass('theme-changer__icon theme-changer__icon_light-theme')
        await expect(page.locator('body')).toHaveCSS('background', 'rgb(35, 37, 41) none repeat scroll 0% 0% / auto padding-box border-box')
        await page.locator('.theme-changer__icon >> nth=0').click()
        await expect(page.locator('.theme-changer__icon >> nth=1')).toHaveClass('theme-changer__icon theme-changer__icon_dark-theme')
        await expect(page.locator('body')).toHaveCSS('background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box')
    })

    test('Переход на форум из главного меню навигации', async ({ page }) => {
        await page.locator('a:has-text("Форум")').click()
        await expect(page.url()).toEqual('https://javascript.ru/forum/')
    })

    test('Переключение языка сайта', async ({ page }) => {
        await page.locator('.sitetoolbar__dropdown-button >> nth=0').click()
        await page.locator('.supported-langs__title:has-text("English")').click()
        await expect(page.locator('h1.frontpage-banner__title')).toHaveText('The Modern JavaScript Tutorial')
    })
})
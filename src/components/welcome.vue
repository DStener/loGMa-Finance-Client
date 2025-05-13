<template>
    <div class="welcome-page">


        <section class="first-section">
            <div class="first-container" style="background-image: 
            url('/src/assets/1921b428-a12e-4010-b837-a790b55ed87e_removalai_preview.png'); 
            background-repeat: no-repeat;">
                <div class="first-background"></div>
                <div class="first-content">
                <h1 class="app-name">loGMa</h1>
                <p class="slogan">>>> управляй своими финансами легко</p>
                </div>
            </div>
        </section>


        <section class="intro-section card">
        <h2 className="sub-title">Управление личными финансами стало проще!</h2>
        <p className="main-text">
            loGMa помогает отслеживать расходы, анализировать доходы и планировать бюджет
            без лишних сложностей. Всё — в одном интерфейсе.
        </p>
        </section>


        <section class="features-section">
            <div className="features-heading">
                <div className="feature-icon">
                    <i class="ri-tools-fill m-feature-icon"></i>
                </div>                
                <h1 class="sub-title"> Основные возможности приложения</h1>
            </div>

            <div class="features-list">
                <div class="feature-card">
                <i class="ri-table-line feature-icon"></i>
                <div>
                    <h3>Учёт расходов</h3>
                    <ul>
                    <li className="main-text">Добавление и категоризация покупок</li>
                    <li className="main-text">История операций</li>
                    </ul>
                </div>
                </div>
                <div class="feature-card" style="flex-direction: row-reverse; background-color: var(--primary-light);">
                <i class="ri-line-chart-line feature-icon"></i>
                <div>
                    <h3>Аналитика и визуализация</h3>
                    <ul>
                    <li className="main-text">Просматривайте динамику ваших финансов в диаграммах.</li>
                    <li className="main-text">Анализируйте свои финансы за любой временной промежуток.</li>
                    <li className="main-text">Экспортируйте отчёты в удобных форматах.</li>
                    </ul>
                </div>
                </div>
                <div class="feature-card">
                <i class="ri-article-line feature-icon"></i>
                <div>
                    <h3>Планирование бюджета</h3>
                    <ul>
                    <li className="main-text">Устанавливайте лимиты на различные виды расходов ежемесячно.</li>
                    <li className="main-text"> Следите за соблюдением установленных бюджетов благодаря уведомлениям о достижении лимта.</li>
                    </ul>
                </div>
                </div>
                <div class="feature-card" style="flex-direction: row-reverse; background-color: var(--primary-light);">
                <i class="ri-group-line feature-icon"></i>
                <div>
                    <h3>Совместное использование</h3>
                    <ul>
                    <li className="main-text">Совместно ведите учёт общих трат и управляйте совместным бюджетом.</li>
                    </ul>
                </div>
                </div>
            </div>
            <section class="benefits-section card" style="margin: 1.5rem 0rem 0rem;">
                <h2 className="sub-title">Зачем пользоваться loGMa?</h2>
                <p className="main-text">
                    Мы предлагаем решение вашей финансовой головоломки! Забудьте о постоянных расчётах и сложностях ведения домашней бухгалтерии — наш сервис делает процесс простым и прозрачным. Экономьте своё время и принимайте взвешенные финансовые решения с лёгкостью. 
                    Попробуйте наше приложение уже сегодня и почувствуйте разницу в управлении личным и семейным бюджетом!
                </p>
            </section>
        </section>

    </div>
</template>

<script>
    export default {
    name: 'WelcomePage'
    }
</script>

<style src="/css/welcome.css"></style>
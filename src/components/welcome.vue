<template>
    <div class="welcome-page">


        <section class="first-section">
        <div class="first-container">
            <div class="first-background"></div>
            <div class="first-content">
            <h1 class="app-name">loGMa</h1>
            <p class="slogan">>>> управляй своими финансами легко</p>
            </div>
        </div>
        </section>


        <section class="intro-section card">
        <h2>Управление личными финансами стало проще!</h2>
        <p>
            loGMa помогает отслеживать расходы, анализировать доходы и планировать бюджет
            без лишних сложностей. Всё — в одном интерфейсе.
        </p>
        </section>


        <section class="features-section">
        <h2 class="features-heading"><i class="ri-tools-fill m-feature-icon"></i> Основные возможности приложения</h2>
        <div class="features-list">
            <div class="feature-card">
            <i class="ri-table-line feature-icon"></i>
            <div>
                <h3>Учёт расходов</h3>
                <ul>
                <li>Добавление и категоризация покупок</li>
                <li>История операций</li>
                </ul>
            </div>
            </div>
            <div class="feature-card">
            <i class="ri-line-chart-line feature-icon"></i>
            <div>
                <h3>Аналитика</h3>
                <ul>
                <li>Графики и диаграммы</li>
                <li>Фильтрация по датам</li>
                </ul>
            </div>
            </div>
            <div class="feature-card">
            <i class="ri-article-line feature-icon"></i>
            <div>
                <h3>Планирование бюджета</h3>
                <ul>
                <li>Установка лимитов</li>
                <li>Уведомления о перерасходе</li>
                </ul>
            </div>
            </div>
            <div class="feature-card">
            <i class="ri-group-line feature-icon"></i>
            <div>
                <h3>Совместное использование</h3>
                <ul>
                <li>Групповые расходы</li>
                <li>Общий бюджет</li>
                </ul>
            </div>
            </div>
        </div>
        </section>


        <section class="benefits-section card">
        <h2>Зачем пользоваться loGMa?</h2>
        <p>
            Забудьте про Excel! loGMa предлагает удобную и красивую платформу для понимания,
            контроля и оптимизации ваших финансов.
        </p>
        </section>
    </div>
</template>

<script>
    export default {
    name: 'WelcomePage'
    }
    </script>

    <style scoped>
    @import url('https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css');

    :root {
    --primary: #00A876;
    --primary-dark: #008A65;
    --primary-light: #E6F5F0;
    --secondary: #00C191;
    --accent: #00D99E;
    --text-dark: #1A1D1F;
    --text-light: #FFFFFF;
    --bg-light: #F9FBF8;
    --bg-dark: #1E262C;
    --card-bg: #FFFFFF;
    --border-radius: 16px;
    --box-shadow: 0 4px 12px rgba(0, 168, 118, 0.1);
    --transition: all 0.3s ease;
    }

    .welcome-page {
    padding: 1rem;
    background-color: var(--bg-light);
    color: var(--text-dark);
    }

    .first-section {
    margin-bottom: 2rem;
    }

    .first-container {
    position: relative;
    height: 282px;
    border-radius: var(--border-radius);
    overflow: hidden;
    background-color: var(--primary);
    }

    .first-background {
    position: absolute;
    inset: 0;
    background: url('@/assets/first-bg.jpg') center/cover no-repeat;
    filter: brightness(0.5);
    z-index: 1;
    }

    .first-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--text-light);
    text-align: center;
    padding: 1rem;
    }

    .app-name {
    font-size: 2.2rem;
    font-weight: bold;
    }

    .slogan {
    font-size: 1.1rem;
    margin-top: 0.3rem;
    }

    /* Sections */
    .card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: 1.5rem;
    margin-bottom: 2rem;
    transition: var(--transition);
    }

    .features-section {
    background: linear-gradient(to bottom, var(--primary-light), #ffffff);
    padding: 2rem 1rem;
    border-radius: var(--border-radius);
    }

    .features-heading {
    text-align: center;
    font-size: 1.6rem;
    color: var(--primary-dark);
    margin-bottom: 2rem;
    }

    .features-heading i {
    vertical-align: middle;
    font-size: 5rem;
    color: var(--accent);
    }

    .features-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.2rem;
    }

    .feature-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 1rem;
    box-shadow: var(--box-shadow);
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    transition: var(--transition);
    }

    .feature-icon {
    font-size: 5rem;
    color: var(--primary);
    flex-shrink: 0;
    }
    .m-feature-icon {
    font-size: 100 rem;
    color: var(--primary);
    flex-shrink: 0;
    }

    .feature-card h3 {
    margin-bottom: 0.3rem;
    }

    .feature-card ul {
    padding-left: 1.1rem;
    list-style: disc;
    margin: 0;
    }

    .benefits-section {
    text-align: center;
    }

    @media (min-width: 768px) {
    .first-container {
        height: 360px;
    }

    .app-name {
        font-size: 3.2rem;
    }

    .slogan {
        font-size: 1.4rem;
    }

    .features-list {
        grid-template-columns: repeat(2, 1fr);
    }
    }

    @media (min-width: 1024px) {
    .features-list {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }
    }
</style>
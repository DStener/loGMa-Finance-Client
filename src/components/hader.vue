<template>
    <header class="header">
        <div class="container header-container">
        <div class="logo">
            <i class="ri-wallet-3-line"></i>
            <span>loGMa Finance</span>
        </div>
        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
            <i class="ri-menu-line"></i>
        </button>
        <nav class="nav" :class="{ show: isMenuOpen }">
            <router-link to="/" class="nav-link">
            <i class="ri-home-4-line"></i> Главная
            </router-link>
            <router-link to="/history" class="nav-link">
            <i class="ri-history-line"></i> История
            </router-link>
            <router-link to="/analytics" class="nav-link">
            <i class="ri-pie-chart-2-line"></i> Аналитика
            </router-link>
            <router-link to="/groups" class="nav-link">
            <i class="ri-group-line"></i> Группы
            </router-link>
            <router-link to="/categories" class="nav-link">
            <i class="ri-price-tag-3-line"></i> Категории
            </router-link>
            <button class="btn-add-expense" @click="handleAddExpense">
            <i class="ri-add-line"></i> Добавить
            </button>
            <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
            <i :class="themeIcon"></i>
            </button>
        </nav>
        </div>
    </header>
</template>

<script>
    export default {
    name: 'AppHeader',
    data() {
        return {
        isMenuOpen: false,
        isDarkTheme: false
        }
    },
    computed: {
        themeIcon() {
        return this.isDarkTheme ? 'ri-sun-line' : 'ri-moon-line'
        }
    },
    methods: {
        toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen
        },
        toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme
        document.body.classList.toggle('dark')
        this.$emit('theme-change', this.isDarkTheme)
        },
        handleAddExpense() {
        this.$emit('add-expense')
        }
    }
    }
</script>

<style scoped>

    @import url('https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css');

    .header {
    background-color: var(--primary);
    color: white;
    padding: 16px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    }

    .logo {
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    }

    .menu-toggle {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    display: none;
    padding: 8px;
    }

    .nav {
    display: flex;
    gap: 15px;
    align-items: center;
    transition: var(--transition);
    }

    .nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
    }

    .nav-link.router-link-active {
    background-color: rgba(255, 255, 255, 0.2);
    }

    .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.15);
    }

    .btn-add-expense {
    background-color: var(--accent);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: var(--transition);
    }

    .btn-add-expense:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    }

    .theme-toggle {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 10px;
    padding: 8px;
    border-radius: 50%;
    transition: var(--transition);
    }

    .theme-toggle:hover {
    background-color: rgba(255, 255, 255, 0.15);
    }

    @media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav {
        position: fixed;
        top: 70px;
        right: -100%;
        width: 80%;
        max-width: 300px;
        background-color: var(--primary-dark);
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
        border-radius: 0 0 0 var(--border-radius);
        box-shadow: -5px 5px 15px rgba(0, 0, 0, 0.2);
    }

    .nav.show {
        right: 0;
    }

    .nav-link {
        width: 100%;
        padding: 12px;
    }

    .btn-add-expense,
    .theme-toggle {
        width: 100%;
        justify-content: center;
        margin: 5px 0;
    }
    }
</style>
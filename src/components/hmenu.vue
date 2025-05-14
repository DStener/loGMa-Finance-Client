<template>
    <header class="header">
        <div class="container header-container">
            <div class="header-left">
                <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu"
                    :class="{ 'white-icon': isMenuOpen }">
                    <i :class="menuIcon"></i>
                </button>

                <div class="logo" :class="{ 'white-icon': isMenuOpen }">
                    <i class="ri-wallet-3-line"></i>
                    <span>loGMa</span>
                </div>
            </div>

            <div class="header-right">
                <button class="theme-toggle" :class="{ 'white-icon': isMenuOpen }" @click="toggleTheme" aria-label="Toggle theme">
                    <i :class="themeIcon"></i>
                </button>

                <router-link v-if="isAuth === 1" to="/profile" class="user-profile" :class="{ 'white-icon': isMenuOpen }">
                    <img v-if="userAvatar" :src="userAvatar" alt="User avatar" class="avatar" />
                    <i v-else class="ri-user-line"></i>
                </router-link>
                <router-link v-else to="/auth" class="auth-btn" :class="{ 'white-icon': isMenuOpen }">
                    <i class="ri-login-box-line"></i>
                </router-link>
            </div>

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

                <details class="nav-details">
                    <summary class="nav-summary">
                        <i class="ri-group-line"></i> Группы
                    </summary>
                    <div class="nav-dropdown">
                        <router-link v-for="group in groups" to="/groups" class="nav-link dropdown-link">
                            {{ group.name }}
                        </router-link>
                    </div>
                </details>

                <router-link to="/categories" class="nav-link">
                    <i class="ri-price-tag-3-line"></i> Категории
                </router-link>
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
            isDarkTheme: false,
            isAuth: 0,
            userAvatar: '',
            groups: [
                { name: "Семья" },
                { name: "Друзья" },
                { name: "Коллеги" }
            ]
        }
    },
    computed: {
        themeIcon() {
            return this.isDarkTheme ? 'ri-sun-line' : 'ri-moon-line'
        },
        menuIcon() {
            return this.isMenuOpen ? 'ri-close-line' : 'ri-menu-line'
        }
    },

    // Set saved theme color 
    mounted: function() {
        if(localStorage.getItem("isDark")  === "false") {
            document.documentElement.classList.remove("dark")
            document.documentElement.classList.add("light")
            this.isDarkTheme = false;
        } else {
            document.documentElement.classList.remove("light")
            document.documentElement.classList.add("dark")
            this.isDarkTheme = true;
        }
    },

    // Check that user is logined
    mounted: async function() {
         const requestOptions = {
            method: 'POST',
        };
        const response = await fetch('/api/auth/me', requestOptions);
        const data = await response.json();
        // if()
    },


    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },

        toggleTheme() {

            if(localStorage.getItem("isDark") != null) {
                if(localStorage.getItem("isDark")  === "true") {
                    document.documentElement.classList.remove("dark")
                    document.documentElement.classList.add("light")
                    localStorage.setItem('isDark', "false");
                    this.isDarkTheme = false;
                } else {
                    document.documentElement.classList.remove("light")
                    document.documentElement.classList.add("dark")
                    localStorage.setItem('isDark', "true");
                    this.isDarkTheme = true;
                }
                return;
            }

            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add("dark")
                localStorage.setItem('isDark', "true")
                this.isDarkTheme = true;
            } else {
                document.documentElement.classList.add("light")
                localStorage.setItem('isDark', "false")
                this.isDarkTheme = false;
            }
            
        },
        handleAddExpense() {
            this.$emit('add-expense')
        }
    }
}
</script>

<style src="/css/header.css"></style>
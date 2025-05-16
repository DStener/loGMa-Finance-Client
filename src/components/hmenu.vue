<template>
    <header class="header">
        <div class="container header-container">
            <div class="header-left">
                <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu"
                    :class="{ 'white-icon': isMenuOpen }">
                    <i :class="menuIcon"></i>
                </button>

                <div class="logo" :class="{ 'white-icon': isMenuOpen }">
                    <img src="/src/assets/favicon.png" class="logo" />
                    <span>loGMa</span>
                </div>
            </div>

            <nav class="nav" :class="{ show: isMenuOpen }">
                <router-link to="/" class="nav-link">
                    <i class="ri-home-4-line"></i> Главная
                </router-link>
                <router-link v-if="isAuth === 1" to="/my" class="nav-link">
                    <i class="ri-history-line"></i> Мой бюджет
                </router-link>

                <details v-if="isAuth === 1" class="nav-details">
                    <summary class="nav-summary">
                        <i class="ri-group-line"></i> Группы
                    </summary>
                    <div class="nav-dropdown">
                        <router-link v-for="group in groups" to="/groups" class="nav-link dropdown-link">
                            {{ group.name }}
                        </router-link>
                    </div>
                </details>
                <details v-if="isAuth === 1 && isAdmin === 1 && isGroup === 1" class="nav-details">
                    <summary class="nav-summary">
                        <i class="ri-user-settings-line"></i>Управление группой
                    </summary>
                    <div class="nav-dropdown">
                        <span class="nav-link"><i class="ri-user-shared-2-line"></i> Управление участниками</span>
                        <span class="nav-link"><i class="ri-file-edit-line"></i> Редактировать бюджет</span>
                    </div>

                </details>
                <button  v-if="isAuth === 1 && isGroup === 1"   class="invite-btn nav-details">Пригласить</button>

            </nav>

            <div class="header-right">
                <button class="theme-toggle" :class="{ 'white-icon': isMenuOpen }" @click="toggleTheme"
                    aria-label="Toggle theme">
                    <i :class="themeIcon"></i>
                </button>

                <router-link v-if="isAuth === 1" to="/me" class="user-profile"
                    :class="{ 'white-icon': isMenuOpen }">
                    <img v-if="userAvatar" :src="userAvatar" alt="User avatar" class="avatar" />
                    <i v-else class="ri-user-line"></i>
                </router-link>
                <router-link v-else to="/auth" class="auth-btn" :class="{ 'white-icon': isMenuOpen }">
                    <i class="ri-login-box-line"></i>
                </router-link>
            </div>




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
            isAdmin: 1,
            isGroup: 0,
            userAvatar: null,
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
    mounted: function () {
        if (localStorage.getItem("isDark") === "false") {
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
    mounted: async function () {

        const response = await fetch('/api/auth/me');
        const status = await response.status;
        const data = await response.json();

        if (status != 200) { return; }

        this.isAuth = 1;
        this.userAvatar = `/api/file/${data.avatar}`;
        console.log(this.userAvatar);
    },


    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },

        toggleTheme() {

            if (localStorage.getItem("isDark") != null) {
                if (localStorage.getItem("isDark") === "true") {
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
<template>
    <div class="auth-container">
        <div class="auth-card">
        <div class="auth-header">
            <i class="fas fa-wallet"></i>
            <h2>loGMa Finance Pro</h2>
            <p>{{ isLoginMode ? 'Вход в ваш аккаунт' : 'Создание нового аккаунта' }}</p>
        </div>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
            <label for="email">Email</label>
            <input 
                type="email" 
                id="email" 
                v-model="email" 
                required 
                placeholder="Введите ваш email"
            >
            </div>

            <div class="form-group">
            <label for="password">Пароль</label>
            <input 
                type="password" 
                id="password" 
                v-model="password" 
                required 
                :placeholder="isLoginMode ? 'Введите ваш пароль' : 'Придумайте пароль'"
            >
            </div>

            <div class="form-group" v-if="!isLoginMode">
            <label for="name">Имя</label>
            <input 
                type="text" 
                id="name" 
                v-model="name" 
                required 
                placeholder="Как вас зовут?"
            >
            </div>

            <button type="submit" class="btn-submit">
            {{ isLoginMode ? 'Войти' : 'Зарегистрироваться' }}
            </button>

            <div class="auth-footer">
            <p>
                {{ isLoginMode ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?' }}
                <a href="#" @click.prevent="toggleMode">
                {{ isLoginMode ? 'Создать аккаунт' : 'Войти' }}
                </a>
            </p>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
    export default {
    data() {
        return {
        isLoginMode: true,
        email: '',
        password: '',
        name: '',
        }
    },
    
    methods: {
        toggleMode() {
        this.isLoginMode = !this.isLoginMode
        this.email = ''
        this.password = ''
        if (!this.isLoginMode) {
            this.name = ''
        }
        },
        
        handleSubmit() {
        if (this.isLoginMode) {
            console.log('Пользователь хочет войти с:', {
            email: this.email,
            password: this.password
            })
        } else {
            console.log('Пользователь хочет зарегистрироваться с:', {
            email: this.email,
            password: this.password,
            name: this.name
            })
        }
        }
    }
    }
</script>

<style scoped>
    .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: var(--bg-light);
    }

    body.dark .auth-container {
    background-color: var(--bg-dark);
    }

    .auth-card {
    background-color: var(--card-bg);
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 168, 118, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 450px;
    }

    .auth-header {
    text-align: center;
    margin-bottom: 30px;
    }

    .auth-header i {
    font-size: 2.5rem;
    color: var(--primary);
    margin-bottom: 15px;
    }

    .form-group {
    margin-bottom: 20px;
    }

    .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    }

    .form-group input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    }

    .btn-submit {
    width: 100%;
    padding: 12px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
    }

    .btn-submit:hover {
    background-color: var(--primary-dark);
    }

    .auth-footer a {
    color: var(--primary);
    text-decoration: none;
    }

    .auth-footer a:hover {
    text-decoration: underline;
    }

    @media (max-width: 576px) {
    .auth-card {
        padding: 30px 20px;
    }
    }
</style>

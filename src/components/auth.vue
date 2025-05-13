<template>
    <div  class="auth-container">
        <div class="auth-card">
        <div class="auth-header">
            <i class="fas fa-wallet"></i>
            <h2>loGMa Finance Pro</h2>
            <p>{{ isLoginMode ? 'Вход в ваш аккаунт' : 'Создание нового аккаунта' }}</p>
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

<style src="/css/auth.css"></style>

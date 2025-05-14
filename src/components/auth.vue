<template>
    <div  class="auth-container">
        <div class="auth-card">
        <div class="auth-header">
            <i class="fas fa-wallet"></i>
            <h2>loGMa Finance Pro</h2>
            <p>{{ isLoginMode ? 'Вход в ваш аккаунт' : 'Создание нового аккаунта' }}</p>
        </div>

        <form @submit.prevent="handleSubmit" id="auth">

            <div class="form-group" v-for="field in loginInputs" v-if="isLoginMode">
            <label :for="field.field">{{field.name}}</label>
            <input 
                :type="field.type" 
                :id="field.field"  
                required 
                :placeholder="field.placeholder"
            >
            </div>

            
            <div class="form-group" v-for="field in regInputs" v-if="!isLoginMode">
            <label :for="field.field">{{field.name}}</label>
            <input 
                :type="field.type" 
                :id="field.field"  
                required 
                :placeholder="field.placeholder"
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
        
        loginInputs : [
            {
                field: "login",
                name: "Логин",
                type: "text",
                placeholder: "Введите ваш логин " 
            },
            {
                field: "login",
                name: "Пароль",
                type: "password",
                placeholder: "Введите пароль" 
            },

        ],
        regInputs : [
            {
                field: "login",
                name: "Логин",
                type: "text",
                placeholder: "Придумайте логин" 
            },
            {
                field: "name",
                name: "Имя",
                type: "text",
                placeholder: "Укажите имя" 
            },
            {
                field: "surname",
                name: "Фамилия",
                type: "text",
                placeholder: "Укажите фамилию" 
            },
            {
                field: "patronymic",
                name: "Отчество",
                type: "text",
                placeholder: "Укажите отчество" 
            },
            {
                field: "birthday",
                name: "Дата рождения",
                type: "date",
                placeholder: "Укажите дату рождения" 
            },
            {
                field: "password",
                name: "Пароль",
                type: "password",
                placeholder: "Укажите пароль" 
            },
        ]
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
        
        async handleSubmit() {
        
        const path = (this.isLoginMode)? "/api/auth/login" : "/api/auth/reg";

        const form = document.getElementById("auth");
        const formData = new FormData(form);

        const requestOptions = {
            method: 'POST',
            body: formData,
        };

        const response = await fetch(path, requestOptions);
        const status = await response.status;

        if(status != 404) { return }
        

        // console.log("test");s

        }
    }
    }
</script>

<style src="/css/auth.css"></style>

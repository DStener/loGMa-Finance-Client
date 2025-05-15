<template>
    <div  class="auth-container">
        <div class="auth-card">
        <div class="auth-header">
            <i class="fas fa-wallet"></i>
            <h2>loGMa Finance Pro</h2>
            <p>{{ isLoginMode ? 'Вход в ваш аккаунт' : 'Создание нового аккаунта' }}</p>
        </div>

        <form @submit.prevent="handleSubmit" id="auth">

            <template v-for="field in loginInputs" v-if="isLoginMode">
                <label class="form-label" :for="field.field">{{field.name}}</label>
                <input  class="form-input"
                    :type="field.type" 
                    :name="field.field"   
                    :placeholder="field.placeholder"
                required>
            </template>
            
            <template v-for="field in regInputs" v-if="!isLoginMode">
                <label class="form-label" :for="field.field">{{field.name}}</label>
                <input  class="form-input"
                    :type="field.type" 
                    :name="field.field"   
                    :placeholder="field.placeholder"
                required>
            </template>

            <p v-if="errorMessages" class="form-error"> {{errorMessages}}</p>

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
    <mwin></mwin>
</template>

<script>
import { errorMessages } from 'vue/compiler-sfc';
import mwin from './mwin.vue';

export default {
    components: {
        mwin,
    },

    data() {
        return {
        isLoginMode: true,
        errorMessages: null,
        
        loginInputs : [
            {
                field: "login",
                name: "Логин",
                type: "text",
                placeholder: "Введите ваш логин " 
            },
            {
                field: "password",
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
            this.isLoginMode = !this.isLoginMode;
            this.errorMessages = null;
        },
        
        async handleSubmit(e) {
            e.preventDefault();
        
            const path = (this.isLoginMode)? "/api/auth/login" : "/api/auth/reg";
            const redirect = (this.isLoginMode)? "/me" : "/auth";

            const form = document.getElementById("auth");
            const formData = new FormData(form);

            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            const response = await fetch(path, requestOptions);
            const status = await response.status;
            const data = await response.json();

            if(status != 200 && status != 201) {
                this.errorMessages = data.message;
                console.log(data)
            };

            document.location.pathname = redirect;
        }
    }
    }
</script>

<style src="/css/auth.css"></style>

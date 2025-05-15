<template>
    <div class="profile-container">
        <div class="profile-header">
            <div class="avatar-container">
                <img :src="newAvatar || user.avatar" alt="Аватар пользователя" class="profile-avatar"
                    @click="avatarChange">
                <input type="file" ref="avatarInput" @change="avatarUpload" accept="image/*" style="display: none">
                <button class="avatar-edit-btn" @click="avatarChange">
                    <i class="ri-camera-line"></i>
                </button>
            </div>

            <div class="profile-info">
                <h2 v-if="!isEditing">{{ user.login }}</h2>
                <input v-else v-model="user.login" class="edit-input login-input">
                <p class="email">{{ user.email }}</p>

                <div class="profile-fields">
                    <div class="field">
                        <label>Имя</label>
                        <input v-if="isEditing" v-model="user.name" type="text" class="edit-input">
                        <div v-else class="field-value">
                            {{ user.name || 'Не указано' }}
                        </div>
                    </div>
                    
                    <div class="field">
                        <label>Фамилия</label>
                        <input v-if="isEditing" v-model="user.surname" type="text" class="edit-input">
                        <div v-else class="field-value">
                            {{ user.surname || 'Не указано' }}
                        </div>
                    </div>
                    
                    <div class="field">
                        <label>Отчество</label>
                        <input v-if="isEditing" v-model="user.patronymic" type="text" class="edit-input">
                        <div v-else class="field-value">
                            {{ user.patronymic || 'Не указано' }}
                        </div>
                    </div>
                    
                    <div class="field">
                        <label>Дата рождения</label>
                        <input v-if="isEditing" v-model="user.birthday" type="date" class="edit-input">
                        <div v-else class="field-value">
                            {{ user.birthday || 'Не указано' }}
                        </div>
                    </div>
                    
                    <div class="field">
                        <label>Пароль</label>
                        <div class="password-field">
                            ********
                            <button class="change-password-btn" @click="showPasswordModal">
                                <i class="ri-key-line"></i> Изменить пароль
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile-actions">
            <template v-if="!isEditing">
                <button class="edit-btn" @click="startEditing">
                    <i class="ri-edit-line"></i> Изменить профиль
                </button>
            </template>
            <template v-else>
                <button class="save-btn" @click="saveChanges">
                    <i class="ri-check-line"></i> Сохранить
                </button>
                <button class="cancel-btn" @click="cancelChanges">
                    <i class="ri-close-line"></i> Отменить
                </button>
            </template>
        </div>

        <button class="btn-logout" @click="logout">
            <i class="ri-logout-box-r-line"></i> Выйти
        </button>

        <div v-if="isWindowShow" class="win-background">
            <div class="win-main">
                <button class="win-close-btn" @click="this.isWindowShow = false"><i class="ri-close-line"></i></button>
                <h3><i class="ri-key-2-line"></i> Изменение пароля</h3>
                <div class="modal-field">
                    <label>Текущий пароль</label>
                    <input type="password" v-model="currentPassword" placeholder="Введите текущий пароль">
                </div>
                <div class="modal-field">
                    <label>Новый пароль</label>
                    <input type="password" v-model="newPassword" placeholder="Введите новый пароль">
                </div>
                <div class="modal-actions">
                    <button class="modal-confirm" @click="changePassword">
                        <i class="ri-check-line"></i> Подтвердить
                    </button>
                    <button class="modal-cancel" @click="hidePasswordModal">
                        <i class="ri-close-line"></i> Отменить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserProfile',
    data() {
        return {
            isEditing: false,
            showPasswordChangeModal: false,
            currentPassword: '',
            newPassword: '',
            newAvatar: null,
            isWindowShow: false,
            user: {
                login: 'darkedoviz',
                email: 'user@example.com',
                name: 'Иван',
                surname: 'Иванов',
                patronymic: 'Иванович',
                birthday: '1990-01-01',
                password: 'securepassword123',
                avatar: null,
            },
            editableFields: [
                { key: 'name', label: 'Имя', type: 'text', editable: true },
                { key: 'surname', label: 'Фамилия', type: 'text', editable: true },
                { key: 'patronymic', label: 'Отчество', type: 'text', editable: true },
                { key: 'birthday', label: 'Дата рождения', type: 'date', editable: true },
            ],
            originalUser: {}
        };
    },
    // Check that user is logined
    mounted: async function () {

        const response = await fetch('/api/auth/me');
        const status = await response.status;
        const data = await response.json();

        if (status != 200) { return; }

        this.login = data.login;
        this.name = data.name;
        this.surname = data.surname;
        this.patronymic = data.patronymicж
        this.birthday = data.birthday;
        this.password = data.password;
        this.avatar = `/api/file/${data.avatar}`;
    },

    methods: {
        startEditing() {
            this.originalUser = JSON.parse(JSON.stringify(this.user));
            this.isEditing = true;
        },
        saveChanges() {
            if (this.newAvatar) {
                this.user.avatar = this.newAvatar;
                this.newAvatar = null;
            }
            this.isEditing = false;
        },
        cancelChanges() {
            this.user = JSON.parse(JSON.stringify(this.originalUser));
            this.newAvatar = null;
            this.isEditing = false;
        },

        avatarChange() {
            this.$refs.avatarInput.click();
        },
        avatarUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newAvatar = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        showPasswordModal() {
            this.isWindowShow = true;
            this.currentPassword = '';
            this.newPassword = '';
        },
        hidePasswordModal() {
            this.showPasswordChangeModal = false;
        },
        changePassword() {
            if (this.currentPassword === this.user.password) {
                this.user.password = this.newPassword;
                this.hidePasswordModal();
                alert('Пароль успешно изменен');
            } else {
                alert('Текущий пароль неверен');
            }
        },


        
        async logout() {

            const response = await fetch('/api/auth/out', {method: 'POST'});
            const status = await response.status;
            const data = await response.json();

            if(status == 200) {
                document.location.pathname = '/';
            };
        }
    }
};
</script>
<style src="/css/profile.css"></style>
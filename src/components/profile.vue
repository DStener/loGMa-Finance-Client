<template>
    <div class="profile-container">
        <div class="profile-header">
        <div class="avatar-container">
            <img 
            :src="user.avatar" 
            alt="Аватар пользователя" 
            class="profile-avatar"
            @click="triggerAvatarUpload"
            >
            <input 
            type="file" 
            ref="avatarInput" 
            @change="handleAvatarChange" 
            accept="image/*" 
            style="display: none"
            >
            <button 
            class="avatar-edit-btn" 
            @click="triggerAvatarUpload"
            >
            <i class="fas fa-camera"></i>
            </button>
        </div>

        <div class="profile-info">
            <h2 v-if="!isEditingName">{{ user.name }}</h2>
            <input 
            v-else
            v-model="editedName" 
            type="text" 
            class="name-input"
            @keyup.enter="saveName"
            >
            <p class="email">{{ user.email }}</p>
            <button 
            class="edit-name-btn"
            @click="toggleNameEdit"
            >
            <i :class="isEditingName ? 'fas fa-check' : 'fas fa-edit'"></i>
            {{ isEditingName ? 'Сохранить' : 'Изменить имя' }}
            </button>
        </div>
        </div>

        <button class="btn-logout">
        <i class="fas fa-sign-out-alt"></i> Выйти
        </button>
    </div>
</template>

<script>
    export default {
    name: 'UserProfile',

    data() {
        return {
        isEditingName: false,
        editedName: '',
        user: {
            name: 'Иван Иванов',
            email: 'ivan@example.com',
            avatar: 'https://via.placeholder.com/150'
        }
        };
    },

    methods: {
        toggleNameEdit() {
        if (this.isEditingName) {
            this.saveName();
        } else {
            this.editedName = this.user.name;
            this.isEditingName = true;
        }
        },

        saveName() {
        if (this.editedName.trim()) {
            this.user.name = this.editedName.trim();
        }
        this.isEditingName = false;
        },

        triggerAvatarUpload() {
        this.$refs.avatarInput.click();
        },

        handleAvatarChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
            this.user.avatar = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        }
    }
    };
</script>

    <style scoped>
    .profile-container {
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 25px;
    box-shadow: var(--box-shadow);
    max-width: 500px;
    margin: 0 auto;
    transition: var(--transition);
    }

    .profile-header {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 25px;
    }

    .avatar-container {
    position: relative;
    width: 120px;
    height: 120px;
    }

    .profile-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    border: 3px solid var(--primary-light);
    transition: var(--transition);
    }

    .profile-avatar:hover {
    opacity: 0.9;
    }

    .avatar-edit-btn {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--primary);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
    }

    .avatar-edit-btn:hover {
    background-color: var(--primary-dark);
    transform: scale(1.1);
    }

    .profile-info {
    flex: 1;
    }

    .profile-info h2 {
    font-size: 1.5rem;
    color: var(--primary-dark);
    margin-bottom: 5px;
    }

    body.dark .profile-info h2 {
    color: var(--accent);
    }

    .name-input {
    font-size: 1.5rem;
    font-weight: bold;
    border: 2px solid var(--primary-light);
    border-radius: 8px;
    padding: 5px 10px;
    width: 100%;
    color: inherit;
    background-color: transparent;
    }

    body.dark .name-input {
    border-color: #3A4A54;
    }

    .email {
    color: #666;
    margin-bottom: 15px;
    }

    body.dark .email {
    color: #aaa;
    }

    .edit-name-btn {
    background-color: var(--primary-light);
    color: var(--primary);
    border: none;
    padding: 8px 15px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 8px;
    }

    body.dark .edit-name-btn {
    background-color: #3A4A54;
    color: var(--accent);
    }

    .edit-name-btn:hover {
    background-color: var(--primary);
    color: white;
    }

    .btn-logout {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: transparent;
    color: #ff5252;
    border: 1px solid #ff5252;
    }

    .btn-logout:hover {
    background-color: rgba(255, 82, 82, 0.1);
    }

    @media (max-width: 768px) {
    .profile-header {
        flex-direction: column;
        text-align: center;
    }

    .profile-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    }

    @media (max-width: 480px) {
    .profile-container {
        padding: 15px;
    }

    .avatar-container {
        width: 100px;
        height: 100px;
    }
    }
</style>

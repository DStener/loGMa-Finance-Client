<template>
    <div v-if="isWindowShow" class="win-background">
        <div class="win-main">
            <button class="win-close-btn" @click="isWindowShow = false"><i class="ri-close-line"></i></button>
            
            <div class="limits-container">
                <h2>Управление участниками</h2>
                
                <div class="limit-section">
                    <div class="category-row">
                        <select v-model="selectedMember">
                            <option v-for="member in members">
                                {{ member.name }}
                            </option>
                        </select>
                        <div class="category-limit">
                            <span v-if="!isEditing">{{ getCurrentMemberStatus() }}</span>
                            <button v-else @click="ban" class="ban-btn">Бан</button>
                        </div>
                    </div>
                </div>
                
                <div class="actions">
                    <button @click="isEditing = isEditing ? 0 : 1" class="edit-btn">
                        {{ isEditing ? 'Сохранить' : 'Редактировать' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MemberSetting',
    data() {
        return {
            isWindowShow: true,
            isEditing: false,
            selectedMember: '',
            members: [
                { name: 'Иван Иванов', banned: false },
                { name: 'Петр Петров', banned: false },
                { name: 'Сергей Сергеев', banned: false },
                { name: 'Алексей Алексеев', banned: false }
            ],
        }
    },
    methods: {
        getCurrentMember() {
            return this.members.find(mem => mem.name === this.selectedMember) || {};
        },
        getCurrentMemberStatus() {
            const member = this.getCurrentMember();
            return member ? (member.banned ? 'Забанен' : 'Активен') : null;
        },
        ban() {
            
        }
    }
}
</script>

<style src="/css/window.css"></style>
<style scoped>
.limits-container {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
}

.limit-section {
    margin-bottom: 20px;
}

.limit-section label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.field-value {
    padding: 8px;
    border-radius: 4px;
}

.category-row {
    display: flex;
    gap: 10px;
    align-items: center;
}

.category-limit {
    min-width: 100px;
}

.actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.edit-btn {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.ban-btn {
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
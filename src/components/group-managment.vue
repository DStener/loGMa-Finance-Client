<template>
    <details  class="nav-details" style="margin-bottom: 1rem;">
    <summary class="nav-summary">
        <i class="ri-user-settings-line"></i>Управление участниками
    </summary>
    <div class="nav-dropdown">
        <div >
            <div class="ban-select">
                <div class="ban-word">Выберите кого исключить</div>
                <div style="display: flex;">
                    <select v-model="selectedMember" >
                    <option v-for="member in members">
                        {{ member.name }}
                    </option>
                    </select>
                    <div class="ban">
                        <button @click="ban" class="ban-btn">Исключить</button>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- <span class="nav-link"><i class="ri-file-edit-line"></i> Редактировать бюджет</span> -->
    </div>
</details>
</template>
<script>
    export default {
    data() {
        return {
            selectedMember: '',
            members: [
                { name: 'Иван Иванов' },
                { name: 'Петр Петров' },
                { name: 'Сергей Сергеев' },
                { name: 'Алексей Алексеев' }
            ],
        }
    },
    methods: {
        getCurrentMember() {
            return this.members.find(mem => mem.name === this.selectedMember) || {};
        },
        ban() {
            // пользователь который this.selectedMember банится сюда delete метод как понимаю
        }
    }
    }
</script>
<style src="/css/window.css"></style>
<style scoped>


.field-value {
    padding: 8px;
    border-radius: 4px;
}

.ban-select {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-items: center;
}

.ban {
    min-width: 100px;
}

.ban-word {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-text);
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
    margin-left: 1rem;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.category-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 100px;
    overflow-y: auto;
    background: var(--vt-c-black-soft);
    border: 1px solid #000000;
    border-radius: 0.4rem;
    border-top: none;
    border-radius: 0 0 0.4rem 0.4rem;
    z-index: 100;
    margin: 0;
    padding: 0;
    list-style: none;
}

.category-dropdown li {
    padding: 8px 12px;
    cursor: pointer;
}

.category-dropdown li:hover {
    background-color: var(--primary-dark);
}
</style>
<template>
    <div v-if="isWindowShow" class="win-background">
        <div class="win-main">
            <button class="win-close-btn" @click="isWindowShow = false"><i class="ri-close-line"></i></button>
            
            <div class="limits-container">
                <h2>Управление лимитами</h2>
                
                <div class="limit-section">
                    <label>Общий лимит</label>
                    <input v-if="isEditing" v-model="mainLimit" type="number">
                    <div v-else class="field-value">
                        {{ mainLimit || 'Не указано' }}
                    </div>
                </div>
                
                <div class="limit-section">
                    <div class="category-row">
                        <select v-model="selectedCategory">
                            <option v-for="category in categories">
                                {{ category.name }}
                            </option>
                        </select>
                        <div class="category-limit">
                            <span v-if="!isEditing">{{ getCurrentCategoryLimit() }}</span>
                            <input v-else v-model="getCurrentCategory().limit" type="number">
                        </div>
                    </div>
                </div>
                
                <div class="actions">
                    <button @click="isEditing = isEditing ? 0 : 1" class="edit-btn">
                        {{ isEditing ? 'Сохранить' : 'Редактировать' }}
                    </button>
                    <!-- <button v-if="isEditing" @click="isEditing=0" class="cancel-btn">
                        Стоп
                    </button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LimitsSetting',
    data() {
        return {
            isWindowShow: true,
            isEditing: false,
            mainLimit: 10000,
            selectedCategory: '',
            categories: [
                { name: 'Еда', limit: 3000 },
                { name: 'Транспорт', limit: 2000 },
                { name: 'Развлечения', limit: 1500 },
                { name: 'Одежда', limit: 2500 }
            ],
        }
    },
    methods: {
        getCurrentCategory() {
            return this.categories.find(cat => cat.name === this.selectedCategory) || {};
        },
        getCurrentCategoryLimit() {
            const category = this.getCurrentCategory();
            return category ? category.limit : null;
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

.cancel-btn {
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
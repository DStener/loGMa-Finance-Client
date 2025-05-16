<template>
    <div class="win-background">
        <div class="win-main">
            <button class="win-close-btn" @click="$emit('close')"><i class="ri-close-line"></i></button>
            
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
                            <option v-for="category in categories" :value="category.name">
                                {{ category.name }}
                            </option>
                        </select>
                        <div class="category-limit">
                            <span v-if="!isEditing">{{ getCurrentCategoryLimit() }}</span>
                            <input v-else v-model="currentCategory.limit" type="number">
                        </div>
                    </div>
                </div>
                
                <div class="actions">
                    <button @click="toggleEdit" class="edit-btn">
                        {{ isEditing ? 'Сохранить' : 'Редактировать' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LimitsSetting',
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isEditing: false,
            mainLimit: 10000,
            selectedCategory: '',
            currentCategory: null
        }
    },
    methods: {
        getCurrentCategoryLimit() {
            const category = this.categories.find(cat => cat.name === this.selectedCategory);
            return category ? category.limit : 'Не выбрано';
        },
        toggleEdit() {
            if (this.isEditing) {
                // При сохранении можно добавить логику обновления данных
                this.$emit('update-category', this.currentCategory);
            }
            this.isEditing = !this.isEditing;
        }
    },
    watch: {
        selectedCategory(newVal) {
            this.currentCategory = this.categories.find(cat => cat.name === newVal);
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
</style>
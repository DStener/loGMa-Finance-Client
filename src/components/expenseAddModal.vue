<template>
    <div>
        <!-- <button class="add-expense-btn" @click="openModal">
            <i class="ri-add-line"></i> Добавить операцию
        </button> -->

        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
                <h3><i class="ri-money-dollar-circle-line"></i> Добавить операцию</h3>
                
                <div class="modal-field">
                    <label>Тип операции</label>
                    <select v-model="operation.type" class="modal-field-input">
                        <option value="expense">Расход</option>
                        <option value="income">Доход</option>
                    </select>
                </div>
                
                <div class="modal-field">
                    <label>Сумма</label>
                    <input
                        type="number"
                        v-model="operation.amount"
                        placeholder="Введите сумму"
                        min="0"
                        step="0.01"
                    >
                </div>
                
                <div class="modal-field">
                    <label>Категория</label>
                    <select v-model="operation.category" class="modal-field-input">
                        <option 
                            v-for="category in categories" 
                            :value="category.value"
                            :disabled="category.type !== operation.type"
                        >
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                
                <div class="modal-field">
                    <label>Дата операции</label>
                    <input
                        type="date"
                        v-model="operation.date"
                        class="modal-field-input"
                    >
                </div>
                
                <div class="modal-field">
                    <label>Описание (необязательно)</label>
                    <input
                        type="text"
                        v-model="operation.description"
                        placeholder="Введите описание"
                        class="modal-field-input"
                    >
                </div>
                
                <div class="modal-actions">
                    <button class="modal-confirm" @click="addOperation">
                        <i class="ri-check-line"></i> Добавить
                    </button>
                    <button class="modal-cancel" @click="closeModal">
                        <i class="ri-close-line"></i> Отменить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OperationForm',
    
    data() {
        return {
            showModal: false,
            operation: {
                type: 'expense', 
                amount: null,
                category: 'food',
                date: new Date().toISOString().substr(0, 10),
                description: ''
            },
            categories: [
                { name: 'Еда', value: 'food', type: 'expense' },
                { name: 'Транспорт', value: 'transport', type: 'expense' },
                { name: 'Развлечения', value: 'entertainment', type: 'expense' },
                { name: 'Жилье', value: 'housing', type: 'expense' },
                { name: 'Здоровье', value: 'health', type: 'expense' },
                
                { name: 'Зарплата', value: 'salary', type: 'income' },
                { name: 'Фриланс', value: 'freelance', type: 'income' },
                { name: 'Инвестиции', value: 'investments', type: 'income' },
                { name: 'Подарки', value: 'gifts', type: 'income' },
            ]
        }
    },
    
    methods: {
        openModal() {
            this.showModal = true;
        },
        
        closeModal() {
            this.showModal = false;
        },
        
        addOperation() {
            if (!this.operation.amount) {
                alert('Пожалуйста, укажите сумму');
                return;
            }
            this.closeModal();
        }
    }
}
</script>

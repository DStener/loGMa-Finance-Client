<template>
    <!-- История операций -->
    <section class="history-section">
    <div class="header-table">
        <h2 class="section-title">
        <i class="ri-file-list-2-fill"></i> История расходов
        </h2>
        <button class="pagination-btn" style="padding-right: 10px;" @click="isAddWindowShow = true"><i class="ri-add-fill"></i></button>
    </div>

    <!-- Кнопки сортировки -->
    <div class="sort-controls">
        <button class="sort-btn" @click="sortBy('data')">
            <i class="ri-calendar-line"></i> По дате
            <i :class="getSortIcon('data')"></i>
        </button>
        <button class="sort-btn" @click="sortBy('category')">
            <i class="ri-price-tag-3-line"></i> По категории
            <i :class="getSortIcon('category')"></i>
        </button>
        <button class="sort-btn" @click="sortBy('sum')">
            <i class="ri-money-dollar-circle-line"></i> По сумме
            <i :class="getSortIcon('sum')"></i>
        </button>
    </div>

    <!-- Окно добавления -->
    <div v-if="isAddWindowShow" class="win-background">
        <div class="win-main">
            <button class="win-close-btn" @click="isAddWindowShow = false"><i class="ri-close-line"></i></button>
            <h1>Добавить трату</h1>
            <input type="text" class="color-input" v-model="data" placeholder="чч мм гггг">
            <input type="text" class="color-input" v-model="category" placeholder="категория">
            <input type="text" class="color-input" v-model="sum" placeholder="сумма">
            <input type="text" class="inp-description" v-model="Description" placeholder="описание">
            <button @click="sendData(), isAddWindowShow = false" class="btn-add">добавить</button>
        </div>
    </div>
    
    <!-- Окно редактирования -->
    <div v-if="isEditWindowShow" class="win-background">
        <div class="win-main">
            <button class="win-close-btn" @click="isEditWindowShow = false"><i class="ri-close-line"></i></button>
            <h1>Редактировать трату</h1>
            <input type="text" class="color-input" v-model="editingItem.editedCategory" placeholder="категория">
            <input type="text" class="color-input" v-model="editingItem.editedSum" placeholder="сумма">
            <input type="text" class="inp-description" v-model="editingItem.editedDescription" placeholder="описание">
            <button @click="saveChanges()" class="btn-add">сохранить</button>
        </div>
    </div>
    
    <h1 class="error">{{error}}</h1>

    <div class="table-container">
        <div v-if="paginatedExpenses.length === 0" class="yore-histori">
            <p class="date" style="color: rgb(149 149 149); display: block;">
                здесь вы можете отслеживать свои траты
            </p>
        </div>

    <div v-for="(el, originalIndex) in paginatedExpenses" :key="el.data + '-' + originalIndex">
        <h3 v-if="shouldShowDate(originalIndex)" 
            class="date" 
            style="display: block;"
        >
            {{ el.viweData }}
        </h3>        
            <div class="table-line">
                <div class="avatar"></div>
                <p class="user">{{ el.user }}</p>
                <div class="category">
                    <span class="category-badge">{{ el.category }}</span>
                </div>                        
                <p class="amount">{{ el.sum + " ₽"}}</p>
                <p class="description">{{ el.Description }}</p>
                <div class="actions">
                    <button 
                        class="btn-icon" 
                        @click="openEditWindow(sortedIndices[currentPage * itemsPerPage + originalIndex])">
                        <i class="ri-pencil-fill"></i>
                    </button>
                    <button 
                        class="btn-icon" 
                        @click="removeExpense(sortedIndices[currentPage * itemsPerPage + originalIndex])"
                    >
                        <i class="ri-delete-bin-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="table-footer">
        <div class="pagination">
        <button 
            class="pagination-btn" 
            @click="prevPage"
            :disabled="currentPage === 0"
        >
            <i class="ri-arrow-left-s-line"></i>
        </button>
        <span class="page-info">Страница {{ currentPage + 1 }} из {{ totalPages }}</span>
        <button 
            class="pagination-btn" 
            @click="nextPage"
            :disabled="currentPage >= totalPages - 1"
        >
            <i class="ri-arrow-right-s-line"></i>
        </button>
        </div>
    </div>
    </section>
</template>

<script>
export default{
    data(){
    return{

        sortedIndices: [], // Массив индексов после сортировки

        sortField: 'data', 
        sortDirection: 'desc', 
        currentPage: 0,
        itemsPerPage: 10,

        isAddWindowShow: false,
        isEditWindowShow: false,
        error: '',
        expenses: [
            {data:'12052020', viweData:'12 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке', user: '4erepashka_Pashka'},
            {data:'12052020', viweData:'12 мая',  category:'Продукты', sum:'1500', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            {data:'12052020', viweData:'12 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн', user: 'Амогус'},
            {data:'10052020', viweData:'10 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке', user: 'Юля'},
            {data:'10052020', viweData:'10 мая', category:'Продукты', sum:'1500', Description:'продукты в 5-чке', user: 'Амогус'},
            {data:'10052020', viweData:'10 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн', user: '4erepashka_Pashka'},
            {data:'6052020', viweData:'6 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке', user: '4erepashka_Pashka'},
            {data:'6052020', viweData:'6 мая', category:'Продукты', sum:'1500', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            {data:'6052020', viweData:'6 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн', user: '4erepashka_Pashka'},
            {data:'12052020', viweData:'12 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке', user: 'Сергей'},
            {data:'12052020', viweData:'12 мая',  category:'Продукты', sum:'1500', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            {data:'12052020', viweData:'12 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн', user: 'Сергей'},
            {data:'10052020', viweData:'10 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке', user: 'Сергей'},
            {data:'10052020', viweData:'10 мая', category:'Продукты', sum:'1500', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            {data:'10052020', viweData:'10 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн', user: '4erepashka_Pashka'},
            {data:'6052020', viweData:'6 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке', user: '4erepashka_Pashka'},
            {data:'6052020', viweData:'6 мая', category:'Продукты', sum:'1500', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            {data:'6052020', viweData:'6 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн', user: '4erepashka_Pashka'},
        ],
        data:'',
        category:'',
        sum:'',
        Description:''
    }
    },

    computed: {
        totalPages() {
            return Math.ceil(this.expenses.length / this.itemsPerPage);
        },
        paginatedExpenses() {
            // Сортируем индексы вместо самих элементов
            this.sortedIndices = [...Array(this.expenses.length).keys()].sort((a, b) => {
                const itemA = this.expenses[a];
                const itemB = this.expenses[b];
                let valA, valB;
                
                if (this.sortField === 'data') {
                    valA = parseInt(itemA.data);
                    valB = parseInt(itemB.data);
                } 
                else if (this.sortField === 'sum') {
                    valA = parseFloat(itemA.sum);
                    valB = parseFloat(itemB.sum);
                } 
                else {
                    valA = itemA[this.sortField].toLowerCase();
                    valB = itemB[this.sortField].toLowerCase();
                }
                
                if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
                if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
            
            const start = this.currentPage * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            
            // Возвращаем элементы по отсортированным индексам
            return this.sortedIndices.slice(start, end).map(i => this.expenses[i]);
        }
    },
    
    methods:{
        openEditWindow(index) {
            this.editingIndex = index;
            this.editingItem = {...this.expenses[index]};
            this.editingItem.editedCategory = this.editingItem.category;
            this.editingItem.editedSum = this.editingItem.sum;
            this.editingItem.editedDescription = this.editingItem.Description;
            this.isEditWindowShow = true;
        },

        saveChanges() {
            const item = this.expenses[this.editingIndex];
            
            item.category = this.editingItem.editedCategory;
            item.sum = this.editingItem.editedSum;
            item.Description = this.editingItem.editedDescription;
            
            this.isEditWindowShow = false;
        },

        shouldShowDate(index) {
            if (index === 0) return true;
            const currentIdx = this.sortedIndices[this.currentPage * this.itemsPerPage + index];
            const prevIdx = this.sortedIndices[this.currentPage * this.itemsPerPage + index - 1];
            return this.expenses[currentIdx]?.data !== this.expenses[prevIdx]?.data;
        },
        nextPage() {
            if (this.currentPage < this.totalPages - 1) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
            }
        },

        sendData(){
            let dmont = '';
            let months = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентебря',
            'октября',
            'ноября',
            'декабря',
            ];
            if(this.data == '' && this.category == '' && this.sum == ''){
            this.error='введите данные'
            return;
            } else if(this.data == ''){
            this.error='дата не введена'
            return;
            } else if(this.data.length != 10){
            this.error='дата введена некорректно'
            return;
            }else if(this.category == ''){
            this.error='не указанна категория'
            return;
            } else if(this.sum == ''){
            this.error='не введена сумма'
            return;
            }

            let num = this.data;
            let charMas = Array.from(num);
            charMas[2] = "";
            charMas[5] = "";
            let st = charMas.join('');
            num = st;

            let year = parseInt(num.substring(4,8))
            if( /^\d+$/.test(year) == 0 || year < 999){
            this.error='дата введена некорректно'
            return;
            }

            let day = parseInt(num.substring(0,2));
            let month = parseInt(num.substring(2,4));

            if(((day > 31 || day < 0) 
            || ((day > 28 || day < 0) && month == 2)) 
            || (month > 13 || month < 0)){
            this.error='дата введена некорректно'
            return;
            } else {
            for(let i = 0; i < 12; i++){
                if(month - 1 == i) dmont = months[i];
            }

            if((day < 32 && month != 2 && day > 0) || (day < 29 && month == 2 && day > 0)){
            dmont = day + " " + dmont;
            }
            }

            num = parseInt(num);

            this.error = '';
            this.expenses.push({
            data: num,
            viweData: dmont,
            category: this.category,
            sum: this.sum,
            Description: this.Description,
            isEditing: false,
            editedName: this.category
            })

            if(this.error == ''){
            this.resetInput();
            }
            
        },
        
        resetInput(){
            this.data = '';
            this.category = '';
            this.sum = '';
            this.Description = '';
        },

        toggleEdit(index) {
            if (this.expenses[index].isEditing) {
            this.saveChanges(index);
            } else {
            this.expenses[index].editedCategory = this.expenses[index].category;
            this.expenses[index].editedSum = this.expenses[index].sum;
            this.expenses[index].editedDescription = this.expenses[index].Description;            
            this.expenses[index].isEditing = true;
            }
        },

        
        removeExpense(index) {
            this.expenses.splice(index, 1);
        },

        handleKeyDown(e) {
            if (e.key === 'ArrowLeft') {
                this.prevPage();
            } else if (e.key === 'ArrowRight') {
                this.nextPage();
            }
        },

        // Метод сортировки
        sortBy(field) {
            if (this.sortField === field) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                
                this.sortField = field;
                this.sortDirection = 'asc';
            }
            this.currentPage = 0;
        },
        
        
        getSortIcon(field) {
            if (this.sortField !== field) return 'ri-arrow-up-down-line';
            return this.sortDirection === 'asc' ? 'ri-arrow-up-line' : 'ri-arrow-down-line';
        }

    },

    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    
}
</script>

<style src="/css/history.css"></style>

<template>
    <!-- История операций -->
    <section className="history-section">
    <div className="header-table">
        <h2 className="section-title">
        <i className="ri-file-list-2-fill"></i> История расходов
        </h2>
        <button className="pagination-btn" style="padding-right: 10px;" @click="isWindowShow = true"><i className="ri-add-fill"></i></button>
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

    <div v-if="isWindowShow" class="win-background">
        <div class="win-main">
            <button class="win-close-btn" @click="this.isWindowShow = false"><i class="ri-close-line"></i></button>
            <h1>Добавить трату</h1>
            <input type="text" class="color-input" v-model="data" placeholder="чч мм гггг">
            <input type="text" class="color-input" v-model="category" placeholder="категория">
            <input type="text" class="color-input" v-model="sum" placeholder="сумма">
            <input type="text" className="inp-description" v-model="Description" placeholder="описание">
            <button  @click="sendData(), isWindowShow = false"  className="btn-add">добавить</button>
        </div>
    </div>
    
    <h1 className="error">{{error}}</h1>

    <div class="table-container">
        <div v-if="paginatedExpenses.length === 0" class="yore-histori">
            <p class="date" style="color: rgb(149 149 149); display: block;">
                здесь вы можете отслеживать свои траты
            </p>
        </div>

      <div v-for="(el, index) in paginatedExpenses" :key="currentPage * itemsPerPage + index">
        <h3 v-if="shouldShowDate(currentPage * itemsPerPage + index)" 
            class="date" 
            style="display: block;"
        >
            {{ el.viweData }}
        </h3>        
            <div class="table-line">
                <div class="category">
                    <span class="category-badge" v-if="!el.isEditing">{{ el.category }}</span>
                    <input 
                        v-else 
                        v-model="el.editedCategory" 
                        type="text" 
                        class="name-input" 
                        @keyup.enter="saveChanges(currentPage * itemsPerPage + index)">
                </div>                        
                <p class="amount" v-if="!el.isEditing">{{ el.sum + " ₽"}}</p>
                <input 
                        v-else 
                        v-model="el.editedSum" 
                        type="text" 
                        class="name-input" 
                        @keyup.enter="saveChanges(currentPage * itemsPerPage + index)">
                <p class="description" v-if="!el.isEditing">{{ el.Description }}</p>
                <input 
                        v-else 
                        v-model="el.editedDescription" 
                        type="text" 
                        class="name-input" 
                        @keyup.enter="saveChanges(currentPage * itemsPerPage + index)">
                <div class="actions">
                    <button 
                        class="btn-icon" 
                        @click="toggleEdit(currentPage * itemsPerPage + index);">
                        <i :class="el.isEditing ? 'ri-save-fill' : 'ri-pencil-fill'"></i>
                    </button>
                    <button 
                        class="btn-icon" 
                        @click="removeExpense(currentPage * itemsPerPage + index)"
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
        <!-- <a href="historyV7.html" class="btn-all">
            <i class="ri-file-list-2-fill"></i> Все
        </a> -->
    </div>
    </section>
</template>

<script>
export default{
    data(){
    return{

        sortField: 'data', // текущее поле сортировки
        sortDirection: 'desc', // направление сортировки (asc/desc)
        currentPage: 0,
        itemsPerPage: 10,

        isWindowShow: false,
        error: '',
        expenses: [
            {data:'12052020', viweData:'12 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке'},
            {data:'12052020', viweData:'12 мая',  category:'Продукты', sum:'1500', Description:'продукты в 5-чке'},
            {data:'12052020', viweData:'12 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн'},
            {data:'10052020', viweData:'10 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке'},
            {data:'10052020', viweData:'10 мая', category:'Продукты', sum:'1500', Description:'продукты в 5-чке'},
            {data:'10052020', viweData:'10 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн'},
            {data:'6052020', viweData:'6 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке'},
            {data:'6052020', viweData:'6 мая', category:'Продукты', sum:'1500', Description:'продукты в 5-чке'},
            {data:'6052020', viweData:'6 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн'},
            {data:'12052020', viweData:'12 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке'},
            {data:'12052020', viweData:'12 мая',  category:'Продукты', sum:'1500', Description:'продукты в 5-чке'},
            {data:'12052020', viweData:'12 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн'},
            {data:'10052020', viweData:'10 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке'},
            {data:'10052020', viweData:'10 мая', category:'Продукты', sum:'1500', Description:'продукты в 5-чке'},
            {data:'10052020', viweData:'10 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн'},
            {data:'6052020', viweData:'6 мая', category:'Транспорт', sum:'35', Description:'проезд в маршрутке'},
            {data:'6052020', viweData:'6 мая', category:'Продукты', sum:'1500', Description:'продукты в 5-чке'},
            {data:'6052020', viweData:'6 мая', category:'Развлечения', sum:'700', Description:'билеты в кино + попкорн'},
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
            // Сортируем перед пагинацией
            const sorted = [...this.expenses].sort((a, b) => {
                let valA, valB;
                
                // Для сортировки по дате преобразуем в число
                if (this.sortField === 'data') {
                    valA = parseInt(a.data);
                    valB = parseInt(b.data);
                } 
                // Для сортировки по сумме преобразуем в число
                else if (this.sortField === 'sum') {
                    valA = parseFloat(a.sum);
                    valB = parseFloat(b.sum);
                } 
                // Для категории и описания - строковое сравнение
                else {
                    valA = a[this.sortField].toLowerCase();
                    valB = b[this.sortField].toLowerCase();
                }
                
                if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
                if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
            
            const start = this.currentPage * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return sorted.slice(start, end);
        }
        
    },
    
    methods:{

        shouldShowDate(index) {
            if (index === 0) return true;
            return this.expenses[index]?.data !== this.expenses[index - 1]?.data;
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

        saveChanges(index) {
            if (this.expenses[index].editedCategory.trim()) {
            this.expenses[index].category = this.expenses[index].editedCategory.trim();
            }
            if (this.expenses[index].editedSum.trim()) {
            this.expenses[index].sum = this.expenses[index].editedSum.trim();
            }
            if (this.expenses[index].editedSum.trim()) {
            this.expenses[index].Description = this.expenses[index].editedDescription.trim();
            }
            this.expenses[index].isEditing = false;
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
                // Если уже сортируем по этому полю, меняем направление
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                // Если новое поле, сортируем по возрастанию
                this.sortField = field;
                this.sortDirection = 'asc';
            }
            // Сбрасываем страницу на первую при сортировке
            this.currentPage = 0;
        },
        
        // Метод для отображения иконки сортировки
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

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
            <button class="win-close-btn" @click="isAddWindowShow = false, resetInput()"><i class="ri-close-line"></i></button>
            <h1>Добавить трату</h1>
            <input type="date" class="color-input" v-model="data" >
            <div class="category-select">
                <input 
                    type="text" 
                    class="color-input" 
                    v-model="category" 
                    placeholder="Выберите категорию"
                    @focus="showCategoryDropdown = true"
                    @blur="onCategoryBlur"
                >
                <ul v-show="showCategoryDropdown" class="category-dropdown">
                    <li 
                        v-for="(cat, index) in filteredCategories" 
                        :key="index"
                        @mousedown="selectCategory(cat)"
                    >
                        {{ cat }}
                    </li>
                </ul>
            </div>
            <input type="number" class="color-input" v-model="sum" placeholder="сумма">
            
            <div class="category-select">
                <input 
                    type="text" 
                    class="color-input" 
                    v-model="valuta" 
                    placeholder="Выберите валюту"
                    @focus="showValutaDropdown = true"
                    @blur="onValutaBlur"
                >
                <ul v-show="showValutaDropdown" class="category-dropdown">
                    <li 
                        v-for="(val, index) in filteredValuta" 
                        :key="index"
                        @mousedown="selectValuta(val)"
                    >
                        {{ val }}
                    </li>
                </ul>
            </div>

            <input type="text" class="color-input" v-model="Description" placeholder="описание">
            <button @click="sendData()" class="btn-add">Добавить</button>
            <h1 class="error">{{error}}</h1>
        </div>
    </div>
    
    <!-- Окно редактирования -->
    <div v-if="isEditWindowShow" class="win-background">
        <div class="win-main">
            <button class="win-close-btn" @click="isEditWindowShow = false, resetInput()"><i class="ri-close-line"></i></button>
            <h1>Редактировать трату</h1>
            <div class="category-select">
                <input 
                    type="text" 
                    class="color-input" 
                    v-model="editingItem.editedCategory" 
                    placeholder="Выберите категорию"
                    @focus="showCategoryDropdown = true"
                    @blur="onCategoryBlur"
                >
                <ul v-show="showCategoryDropdown" class="category-dropdown">
                    <li 
                        v-for="(cat, index) in filteredCategories" 
                        :key="index"
                        @mousedown="selectCategoryE(cat)"
                    >
                        {{ cat }}
                    </li>
                </ul>
            </div>
            <input type="text" class="color-input" v-model="editingItem.editedSum" placeholder="сумма">

            <div class="category-select">
                <input 
                    type="text" 
                    class="color-input" 
                    v-model="editingItem.editedValuta" 
                    placeholder="Выберите валюту"
                    @focus="showValutaDropdown = true"
                    @blur="onValutaBlur"
                >
                <ul v-show="showValutaDropdown" class="category-dropdown">
                    <li 
                        v-for="(vul, index) in filteredValuta" 
                        :key="index"
                        @mousedown="selectValutaE(vul)"
                    >
                        {{ vul }}
                    </li>
                </ul>
            </div>

            <input type="text" class="color-input" v-model="editingItem.editedDescription" placeholder="описание">
            <button @click="saveChanges()" class="btn-add">сохранить</button>
        </div>
    </div>

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
                <div class="category">
                    <span class="category-badge">{{ el.category }}</span>
                </div>                        
                <p class="amount">{{ el.sum }} {{ el.valuta }}</p>
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

        idWall: null,

        sortedIndices: [], // Массив индексов после сортировки

        sortField: 'data', 
        sortDirection: 'desc', 
        currentPage: 0,
        itemsPerPage: 10,

        showCategoryDropdown: false,
        existingCategories: [],
        showValutaDropdown: false,
        existingValuta: [],

        isAddWindowShow: false,
        isEditWindowShow: false,
        error: '',
        expenses: [
            // {data:'12-05-2020', viweData:'12 мая', category:'Транспорт', sum:'35', valuta: 'rub', Description:'проезд в маршрутке', user: '4erepashka_Pashka'},
            // {data:'12-05-2020', viweData:'12 мая',  category:'Продукты', sum:'1500', valuta: 'rub', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            // {data:'12-05-2020', viweData:'12 мая', category:'Развлечения', sum:'700', valuta: 'rub', Description:'билеты в кино + попкорн', user: 'Амогус'},
            // {data:'10-05-2020', viweData:'10 мая', category:'Транспорт', sum:'35', valuta: 'rub', Description:'проезд в маршрутке', user: 'Юля'},
            // {data:'10-05-2020', viweData:'10 мая', category:'Продукты', sum:'1500', valuta: 'rub', Description:'продукты в 5-чке', user: 'Амогус'},
            // {data:'10-05-2020', viweData:'10 мая', category:'Развлечения', sum:'700', valuta: 'rub', Description:'билеты в кино + попкорн', user: '4erepashka_Pashka'},
            // {data:'06-05-2020', viweData:'6 мая', category:'Транспорт', sum:'35', valuta: 'rub', Description:'проезд в маршрутке', user: '4erepashka_Pashka'},
            // {data:'06-05-2020', viweData:'6 мая', category:'Продукты', sum:'1500', valuta: 'rub', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            // {data:'06-05-2020', viweData:'6 мая', category:'Развлечения', sum:'700', valuta: 'rub', Description:'билеты в кино + попкорн', user: '4erepashka_Pashka'},
            // {data:'12-05-2020', viweData:'12 мая', category:'Транспорт', sum:'35', valuta: 'rub', Description:'проезд в маршрутке', user: 'Сергей'},
            // {data:'12-05-2020', viweData:'12 мая',  category:'Продукты', sum:'1500', valuta: 'rub', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            // {data:'12-05-2020', viweData:'12 мая', category:'Развлечения', sum:'700', valuta: 'rub', Description:'билеты в кино + попкорн', user: 'Сергей'},
            // {data:'10-05-2020', viweData:'10 мая', category:'Транспорт', sum:'35', valuta: 'rub', Description:'проезд в маршрутке', user: 'Сергей'},
            // {data:'10-05-2020', viweData:'10 мая', category:'Продукты', sum:'1500', valuta: 'rub', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            // {data:'10-05-2020', viweData:'10 мая', category:'Развлечения', sum:'700', valuta: 'rub', Description:'билеты в кино + попкорн', user: '4erepashka_Pashka'},
            // {data:'06-05-2020', viweData:'6 мая', category:'Транспорт', sum:'35', valuta: 'rub', Description:'проезд в маршрутке', user: '4erepashka_Pashka'},
            // {data:'06-05-2020', viweData:'6 мая', category:'Продукты', sum:'1500', valuta: 'rub', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            // {data:'06-05-2020', viweData:'6 мая', category:'Развлечения', sum:'700', valuta: 'rub', Description:'билеты в кино + попкорн', user: '4erepashka_Pashka'},
        ],
        data:'',
        category:'',
        sum:'',
        valuta: '',
        Description:''
    }
    },


    mounted: async function() {

        const target = (window.location.pathname == "/my")? "/api/wall/my" : "/api/wall/walls";

        const response = await fetch(target);
        const status = await response.status;
        const data = await response.json();

        if(status != 200) { return; }

        if(window.location.pathname == "/my") {

            console.log(data);

            this.idWall = data[0].id;
        }

        this.getCurrency();
        this.uppdateListCatgory();
        this.listOperation();
    },

    computed: {
        filteredCategories() {
            return this.existingCategories.filter(cat => 
                cat.toLowerCase().includes(this.category.toLowerCase())
            );
        },

        filteredValuta() {
            return this.existingValuta.filter(val => 
                val.toLowerCase().includes(this.valuta.toLowerCase())
            );
        },

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

        async getCurrency() {
            const response = await fetch(`/api/wall/g_curr`);
            const status = await response.status;
            const data = await response.json();

            console.log(data);
        },

        async uppdateListCatgory() {

            const response = await fetch(`/api/wall/c_wall?id_wall=${this.idWall}`);
            const status = await response.status;
            const data = await response.json();

            console.log(data);


            if ( status == 200 ) {   
                this.existingCategories = [];

                for(let i = 0; i < data.length; ++i) {
                    this.existingCategories.push(data[0].name);
                }
            }

        },

        async listOperation() {

            const response = await fetch(`/api/wall/operations?id_wall=${this.idWall}`);
            const status = await response.status;
            const data = await response.json();

            console.log(data);

            if(status != 200) { return; }

            console.log(data[0].time);

            for(let i = 0; i < data.length; ++i) {
                this.expenses.push({
                    id: data[i].id,
                    data: data[i].time.substring(0, 10),
                    viweData: "",
                    category: "",
                    sum: data[i].value,
                    valuta: data[i].iso_currency,
                    Description: data[i].description,
                    user: data[i].id_user,
                });
            }

            // {data:'10-05-2020', viweData:'10 мая', category:'Продукты', sum:'1500', valuta: 'rub', Description:'продукты в 5-чке', user: '4erepashka_Pashka'},
            
        },

        selectCategory(cat) {
            this.category = cat;
            this.showCategoryDropdown = false;
        },

        selectCategoryE(cat) {
            this.editingItem.editedCategory = cat;
            this.showCategoryDropdown = false;
        },

        onCategoryBlur() {
            setTimeout(() => {
                this.showCategoryDropdown = false;
            }, 200);
        },

        selectValuta(val) {
            this.valuta = val;
            this.showValutaDropdown = false;
        },

        selectValutaE(val) {
            this.editingItem.editedValuta = val;
            this.showValutaDropdown = false;
        },

        onValutaBlur() {
            setTimeout(() => {
                this.showValutaDropdown = false;
            }, 200);
        },

        openEditWindow(index) {
            this.editingIndex = index;
            this.editingItem = {...this.expenses[index]};
            this.editingItem.editedCategory = this.editingItem.category;
            this.editingItem.editedSum = this.editingItem.sum;
            this.editingItem.editedValuta = this.editingItem.valuta;
            this.editingItem.editedDescription = this.editingItem.Description;
            this.isEditWindowShow = true;
        },

        saveChanges() {

            console.log("MAY BE");

            const item = this.expenses[this.editingIndex];
        
            item.category = this.editingItem.editedCategory;
            item.sum = this.editingItem.editedSum;
            item.valuta = this.editingItem.editedValuta;
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

        async sendData(){
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
            if(this.data == '' && this.category == '' && this.sum == '' && this.valuta == ''){
            this.error='введите данные'
            return;
            } else if(this.data == ''){
            this.error='дата не введена'
            return;
            }else if(this.category == ''){
            this.error='не указанна категория'
            return;
            } else if(this.sum == ''){
            this.error='не введена сумма'
            return;
            }else if(this.valuta == ''){
            this.error='не выброна валюта'
            return;
            }

            let day = this.data.substring(8,10);
            for(let i = 0; i < 12; i++){
                if(parseInt(this.data.substring(5,7)) - 1 == i) dmont = months[i];
            }
            dmont = day + " " + dmont;


            // NEW OPERATION ///////////////////////////

            const form = new FormData();
            
            form.append("value", this.sum);
            form.append("description", this.Description);
            form.append("iso_currency", this.valuta);
            form.append("time", this.data);
            form.append("id_wall", this.idWall);

            this.error = '';
            this.expenses.push({
                data: this.data,
                viweData: dmont,
                category: this.category,
                sum: this.sum,
                valuta: this.valuta,
                Description: this.Description,
                isEditing: false,
                editedName: this.category
            })

            const response = await fetch(`/api/opreation/create`, {method: "POST", body: form});
            const status = await response.status;
            const data = await response.json();

            console.log

            if(this.error == ''){
                this.isAddWindowShow = false;
                this.resetInput();
            }
            
        },
        
        resetInput(){
            this.data = '';
            this.category = '';
            this.sum = '';
            this.Description = '';
            this.valuta = '';
        },

        

        
        removeExpense(index) {
            this.expenses.splice(index, 1);
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

    // mounted() {
    //     window.addEventListener('keydown', this.handleKeyDown);
    // },
    beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    
}
</script>

<style src="/css/history.css"></style>

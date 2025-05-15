<template>
    <!-- История операций -->
    <section className="history-section">
    <div className="header-table">
        <h2 className="section-title">
        <i className="ri-file-list-2-fill"></i> История расходов
        </h2>
        <button className="pagination-btn" style="padding-right: 10px;" @click="isWindowShow = true"><i className="ri-add-fill"></i></button>
    </div>

    <div v-if="isWindowShow" class="win-background">
        <div class="win-main">
            <button class="win-close-btn" @click="this.isWindowShow = false"><i class="ri-close-line"></i></button>
            <h1>Добавить трату</h1>
            <input type="text" v-model="data" placeholder="чч мм гггг">
            <input type="text" v-model="category" placeholder="категория">
            <input type="text" v-model="sum" placeholder="сумма">
            <input type="text" v-model="Description" placeholder="описание" className="inp-description">
            <button  @click="sendData(), isWindowShow = false"  className="btn-add">добавить</button>
        </div>
    </div>
    
    <h1 className="error">{{error}}</h1>

    <div className="table-container">
        <div v-if="expenses.length == '0'" className="yore-histori">
        <p className="date" style="color: rgb(149 149 149); display: block;">
            здесь вы можете отслеживать свои траты
        </p>
        </div>

        <div v-for="(el, index) in expenses" :key="index">
        <h3 id="date" v-if="index === 0 || el.data !== expenses[index - 1].data" className="date" style="display: block;">{{el.viweData}}</h3>
        
        <div className="table-line">
            <div className="category">
            <span className="category-badge" v-if="!el.isEditing">{{ el.category }}</span>
            <input v-else v-model="el.editedName" type="text" class="name-input" @keyup.enter="saveName(index)">
            </div>                        
            <p className="amount">{{ el.sum + " ₽"}}</p>
            <p className="description">{{ el.Description }}</p>
            <div className="actions">
            <button class="btn-icon" 
            @click="toggleCategoryEdit(index),
            toggleSumEdit(index),
            toggleDescriptionEdit(index)"
            ><i :class="el.isEditing ? 'ri-save-fill' : 'ri-pencil-fill'"></i></button>
            <button class="btn-icon" @click="removeExpense(index)"><i class="ri-delete-bin-fill"></i></button>
            </div>
        </div>
        </div>
    </div>

    <div className="table-footer">
        <div className="pagination">
        <button className="pagination-btn"><i className="ri-arrow-left-s-line"></i></button>
        <span className="page-info">Страница 1 из 5</span>
        <button className="pagination-btn"><i className="ri-arrow-right-s-line"></i></button>
        </div>
        <a href="historyV7.html" className="btn-all">
        <i className="ri-file-list-2-fill"></i> Все
        </a>
    </div>
    </section>
</template>

<script>
export default{
    data(){
    return{
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
        ],
        data:'',
        category:'',
        sum:'',
        Description:''
    }
    },
    methods:{
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
        
        // this.closeDiv()
    },
    
    resetInput(){
        this.data = '';
        this.category = '';
        this.sum = '';
        this.Description = '';
    },

    // showDiv(){
    //     isWindowShow = "block";
    //     if(document.getElementById('add').style.display == "block") closeDiv();
    // },

    // closeDiv(){
    //     document.getElementById('add').style.display = "none";
    // },

    toggleCategoryEdit(index) {
        if (this.expenses[index].isEditing) {
        this.saveName(index);
        } else {
        this.expenses[index].editedName = this.expenses[index].category;
        this.expenses[index].isEditing = true;
        }
    },

    saveName(index) {
        if (this.expenses[index].editedName.trim()) {
        this.expenses[index].category = this.expenses[index].editedName.trim();
        }
        this.expenses[index].isEditing = false;
    },
    
    removeExpense(index) {
        this.expenses.splice(index, 1);
    }

    }
}
</script>

<style src="/css/history.css"></style>

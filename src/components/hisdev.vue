<template>
  <!-- История операций -->
  <section className="history-section">
    <div className="header-table">
      <h2 className="section-title">
        <i className="ri-file-list-2-fill"></i> История расходов
      </h2>
      <button className="pagination-btn" style="padding-right: 10px;" @click="showDiv()"><i className="ri-add-fill"></i></button>
    </div>
    <div className="add-container" id="add">
      <input type="text" v-model="data" placeholder="чч мм гггг">
      <input type="text" v-model="category" placeholder="категория">
      <input type="text" v-model="sum" placeholder="сумма">
      <input type="text" v-model="Description" placeholder="описание" className="inp-description">
      <button  @click="sendData()"  className="btn-add">добавить</button>
    </div>
    
    <h1 className="error">{{error}}</h1>

                <div className="table-container">

                  <div v-if="expenses.length == '0'" className="yore-histori">
                    <p className="date" style="color: rgb(149 149 149);">
                      здесь вы можете отслеживать свои траты
                    </p>
                  </div>

                  <div v-for="(el, index) in expenses" :key="index">

                     <h3 className="date">{{el.viweData}}</h3>

                    <div className="table-line">

                      <div className="category">
                        <span className="category-badge" style="background: #00C191;">{{ el.category }}</span>
                      </div>                        
                      <p className="amount">{{ el.sum + " ₽"}}</p>
                      <p className="description">{{ el.Description }}</p>
                      <div className="actions">
                        <button class="btn-icon"><i class="ri-pencil-fill"></i></button>
                        <button class="btn-icon" @click="expenses.splice(index)"><i class="ri-delete-bin-fill"></i></button>
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
      error: '',
      expenses: [],
      data:'',
      // viweData:'',
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
      })

      expenses.sort(function(a, b){
        return a.data - b.data;
      });

      if(this.error == ''){
        this.resetInput();
      }
      
      this.closeDiv()

    },
    resetInput(){
      this.data = '';
      this.category = '';
      this.sum = '';
      this.Description = '';
    },

    showDiv(){
        document.getElementById('add').style.display = "block";
        if(document.getElementById('add').style.display == "block") closeDiv();
    },

    closeDiv(){
      document.getElementById('add').style.display = "none";
    },

  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

/* HistoryBlock.vue - стили для блока истории расходов */
input{
  width: 120px;
  height: 25px;
  font-size: 16px;
  padding: 0px 0 3px 7px;
  border: #f5f5f5;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  outline: none;
  margin: 10px;
}

.btn-add{
  font-size: 18px;
  width: 100px;
  height: 30px;
  padding: 0 0 3px 0px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  color: var(--primary);
  transition: var(--transition);
  align-items: center;
  margin-left: 255px;
}

.btn-add:hover{
  background: var(--primary);
  color: white;
}

.table-line{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px 10px 0px;
  justify-content: space-around;
}

.table-line:hover{
  background-color: var(--primary-light);
}

.inp-description{
  width: 290px;
  height: 25px;
  font-size: 16px;
  padding: 0px 0 3px 7px;
  border: #f5f5f5;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  outline: none;
  margin: 10px;
}

.description{
  width: 300px;
  height: 30px;
  font-size: 18px;
  color: black;
}

.history-block {
  margin-top: 30px;
}

.add-container {
  overflow-x: auto;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 5px;
  display: none;
  margin-bottom: 10px;
  background-color: rgb(111 191 146);
}

.table-container {
  overflow-x: auto;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 5px;
}

.date{
  text-align: left;
  font-size: 23px;
  padding: 12px 15px;
}

.operations-table {
  width: 100%;
  border-collapse: collapse;
}

.operations-table th {
  text-align: left;
  padding: 12px 15px;
  background-color: var(--primary-light);
  color: var(--primary-dark);
  font-weight: 600;
}

body.dark .operations-table th {
  background-color: #3A4A54;
  color: var(--accent);
}

.operations-table td {
  padding: 15px 15px;
}

body.dark .operations-table td {
  border-bottom-color: #3A4A54;
}

.operations-table tr:last-child td {
  border-bottom: none;
}

.operations-table tr:hover td {
  background-color: var(--primary-light);
}

body.dark .operations-table tr:hover td {
  background-color: #3A4A54;
}

.category
{
  width: 120px;
  height: 27px;
}

.category-badge {
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  color: white;
  font-weight: 500;
  gap: 5px;
}

.amount {
  font-weight: 600;
  color: var(--primary-dark);
  width: 100px;
}

body.dark .amount {
  color: var(--accent);
}

.actions {
  width: 80px;
  display: flex;
  justify-content: space-between;
}

.btn-icon {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  transition: var(--transition);
  font-size: 18px;
}

body.dark .btn-icon {
  color: #aaa;
}

.btn-icon:hover {
  background-color: var(--primary-light);
  color: var(--primary);
}

body.dark .btn-icon:hover {
  background-color: #3A4A54;
  color: var(--accent);
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination-btn {
  background: var(--primary-light);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--primary);
  transition: var(--transition);
  display: flex;
  align-items: center;
  font-size: 30px;
}

body.dark .pagination-btn {
  background: #3A4A54;
  color: var(--accent);
}

.pagination-btn:hover {
  background: var(--primary);
  color: white;
}

.page-info {
  font-size: 0.9rem;
  color: #666;
}

body.dark .page-info {
  color: #aaa;
}

.btn-all {
  background: var(--primary);
  color: white;
  padding: 8px 15px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
}

.header-table{
  display: flex;
  justify-content: space-between;
  height: 45px;
}

.error{
  font-size: 20px;
  color: rgb(204, 0, 0);
}

@media (max-width: 576px) {
  .table-footer {
    flex-direction: column;
    gap: 15px;
  }
}
</style>

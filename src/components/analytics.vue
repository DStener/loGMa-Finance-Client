<template>
<div className="analytics-block">
    <div className="chart-section">
        <div class="header-table-2">
            <h2 class="section-title">
                <i class="ri-pie-chart-line"></i> Аналитика
            </h2>
            <div style="
                display: flex;
                align-items: center;
                gap: 12px;
                margin-left: 20px;
            ">   
                <button 
                v-if="(showButton === true) || (showButton2 ===true && isAdmin === true)" 
                class="pagination-btn" @click="isWindowShow2 = true">
                    <i class="ri-add-fill"></i>
                </button>
                <!-- <button class="pagination-btn" @click="toggleChartExpand">
                    <i class="fas" :class="isChartExpanded ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line'"></i>
                </button> -->
                <!-- <button 
                v-if="(showButton === true) || (showButton2 ===true && isAdmin === true)"
                class="pagination-btn" @click="isWindowShowCategoryManage = true">
                    <i class="ri-progress-6-line"></i>
                </button> -->
            </div>
        </div>


        <mwinLS  v-if="isWindowShowCategoryManage" :categories="categories"
            @close="isWindowShowCategoryManage = false" />

        <div v-if="isWindowShow2" class="win-background">
            <div class="win-main">
                <button class="win-close-btn" @click="isWindowShow2 = false"><i class="ri-close-line"></i></button>
                <h1>Добавить категорию</h1>
                <input type="text" v-model="categoryName" placeholder="Название">
                <input type="number" class="color-input" v-model="categoryLimit" placeholder="Задайте лимит">
                <button @click="addCategory" className="btn-add">Добавить</button>
            </div>
        </div>
        
        <div class="block-chart">
            <div className="chart-legend">
                <div className="legend-header">
                    <h3>Распределение расходов</h3>
                    <button className="mobile-chart-toggle" @click="toggleMobileChart">
                    <i className="fas fa-chart-pie"></i>
                    </button>
                </div>
                <ul className="category-list">
                    <li className="category-item" v-for="category in categories" :key="category.name">
                        <div className="category-info">
                            <span className="category-color" :style="{ background: category.color }"></span>
                            <i className="fas category-icon" :class="category.icon"></i>
                            <span className="category-name">{{ category.name }}</span>
                            <div className="limit-amount">
                                <span className="category-amount">{{ category.amount }} /</span>
                                <span className="category-limit">{{ category.limit }} ₽</span>
                            </div>
                        </div>
                        <div className="progress-container">
                            <div className="progress-bar-2" :style="{ width: category.percentage + '%', background: category.color }"></div>
                        </div>
                    </li>
                </ul>
                <button className="btn-export">
                    <i className="ri-upload-2-fill"></i> Экспорт данных
                </button>
            </div>
        </div>
        
    </div>
</div>
</template>

<script>
import mwinLS from './mwinLS.vue';

export default {
    name: 'AnalyticsBlock',
    components: {
        mwinLS
    },
    data() {
        return {

            idWall: null,
            
            isAdmin: false,
            categoryName: "",
            categoryLimit: null,
            isChartExpanded: false,
            isWindowShow2: false,
            isWindowShowCategoryManage: false,
            lastUpdated: '01.05.2025',
            operationsCount: 24,
            categoriesCount: 8,
            categories: [
                { name: 'Продукты', amount: '4,200', percentage: 42, color: '#00A876', icon: 'ri-shopping-basket-2-fill', limit: '10,000' },
                { name: 'Транспорт', amount: '3,150', percentage: 31.5, color: '#00C191', icon: 'ri-bus-2-fill', limit: '10,000' },
                { name: 'Кафе', amount: '2,100', percentage: 21, color: '#00D99E', icon: 'ri-cup-fill', limit: '10,000' },
                { name: 'Развлечения', amount: '1,500', percentage: 15, color: '#00F0AA', icon: 'ri-user-smile-fill', limit: '10,000' },
                { name: 'Жилье', amount: '1,500', percentage: 15, color: '#00FFB4', icon: 'ri-home-9-fill', limit: '10,000' }
            ],
            chart: null
        };
    },
    computed: {
    showButton() {
        return this.$route.path === '/my'; 
        },
        showButton2() {
        return this.$route.path === '/group'; 
        }
        
    },
    
    mounted: async function() {

        const target = (window.location.pathname == "/my")? "/api/wall/my" : "/api/wall/walls";

        const response = await fetch(target);
        const status = await response.status;
        const data = await response.json();

        if(status != 200) { return; }

        if(window.location.pathname == "/my") {

            this.idWall = data[0].id;
        }
    },

    methods: {
        toggleChartExpand() {
            var block = document.getElementById('chart');
            if (block.style.display == 'none') {
                block.style.display = 'block';
            } else {
                block.style.display = 'none';
            }
        },
        async addCategory() {


            if (this.categoryName === "") {
                alert('Введите название категории');
                return;
            }
            
            if (this.categoryLimit === 0 || this.categoryLimit < 0) {
                alert('Лимит должен быть выше нуля');
                return;
            }


            const form = new FormData();
            form.append("icon", "1");
            form.append("name", this.categoryName);
            form.append("id_wall", this.idWall);
            form.append("limits", this.categoryLimit);
            

            const response = await fetch("/api/category/create", {method: "POST", body: form});
            const status = await response.status;
            const data = await response.json();

            if(status != 200) { return; }

            this.isWindowShow2 = false; //это после отправки апи добавить
            location.reload();
        },

        loadImageToCanvas() {
            const canvas = this.$refs.chartCanvas;
            const ctx = canvas.getContext('2d');
            
            canvas.width = 800; 
            canvas.height = 400; 

            const img = new Image();
            img.src = '/src/assets/chart-prim.png';
            
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            
            img.onerror = () => {
                console.error('Не удалось загрузить изображение');
            };
        }
    }
};
</script>

<style src="/css/analytics.css"></style>
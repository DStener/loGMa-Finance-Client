<template>
<div className="analytics-block">
    <div className="chart-section">

        <button className="pagination-btn"  
        @click="isWindowShow2 = true" 
        style="position: absolute;
        top: 115px;"><i className="ri-add-fill"></i></button>

        <div v-if="isWindowShow2" class="win-background">
            <div class="win-main">
                <button class="win-close-btn" @click="this.isWindowShow2 = false"><i class="ri-close-line"></i></button>
                <h1>Добавить категорию</h1>
                <input type="text" class="color-input" v-model="categoryName" placeholder="Название">
                <input type="number" class="color-input" v-model="categoryLimit" placeholder="Задайте лимит">
                <button  @click="addCategory()"  className="btn-add">добавить</button>
            </div>
        </div>

        <button className="chart-toggle" @click="toggleChartExpand">
                <i className="fas" :class="isChartExpanded ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line'"></i>
        </button>
        <div className="chart-container" id="chart">            

            <canvas className="chart-img"></canvas>
        </div>
    
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
                        <div className="progress-bar" :style="{ width: category.percentage + '%', background: category.color }"></div>
                    </div>
                </li>
            </ul>
            <button className="btn-export">
                <i className="ri-upload-2-fill"></i> Экспорт данных
            </button>
        </div>
    </div>
</div>
</template>

<script>

    export default {
        name: 'AnalyticsBlock',
        data() {
            return {
            categoryName: "",
            categoryLimit: null,
            isChartExpanded: false,
            isWindowShow2: false,
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
        
        methods: {
            
            toggleChartExpand() {
                var block = document.getElementById('chart');
                if (block.style.display == 'none') {
                    block.style.display = 'block';
                } else {
                    block.style.display = 'none';
                }
            },

            addCategory(){
                if (this.categotyName === "") {
                    alert('Введите название категории');
                    return;
                }
                
                if (this.categoryLimit === 0 || this.categoryLimit < 0) {
                    alert('Лимит должен быть выше нуля');
                    return;
                }
                isWindowShow2 = "false"//это после успешной отправки данных
            }
        }
    };
</script>

<style src="/css/analytics.css"></style>
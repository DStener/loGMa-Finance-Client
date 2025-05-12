<template>
        <div class="analytics-block">
        <div class="chart-section">
            <div class="chart-container" :class="{ 'expanded': isChartExpanded }">
            <button class="chart-toggle" @click="toggleChartExpand">
                <i class="fas" :class="isChartExpanded ? 'fa-compress' : 'fa-expand'"></i>
            </button>
            <canvas ref="financeChart"></canvas>
            <div class="chart-footer">
                <span>Обновлено: {{ lastUpdated }}</span>
                <div class="chart-stats">
                <div class="stat-item">
                    <span class="stat-value">{{ operationsCount }}</span>
                    <span class="stat-label">операции</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{{ categoriesCount }}</span>
                    <span class="stat-label">категории</span>
                </div>
                </div>
            </div>
            </div>
    
            <div class="chart-legend">
            <div class="legend-header">
                <h3>Распределение расходов</h3>
                <button class="mobile-chart-toggle" @click="toggleMobileChart">
                <i class="fas fa-chart-pie"></i>
                </button>
            </div>
            <ul class="category-list">
                <li class="category-item" v-for="category in categories" :key="category.name">
                <div class="category-info">
                    <span class="category-color" :style="{ background: category.color }"></span>
                    <i class="fas category-icon" :class="category.icon"></i>
                    <span class="category-name">{{ category.name }}</span>
                    <span class="category-amount">{{ category.amount }} ₽</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" :style="{ width: category.percentage + '%', background: category.color }"></div>
                </div>
                </li>
            </ul>
            <button class="btn-export">
                <i class="fas fa-file-export"></i> Экспорт данных
            </button>
            </div>
        </div>
        </div>
</template>

<script>
    import { Chart } from 'chart.js';

    export default {
    name: 'AnalyticsBlock',
    data() {
        return {
        isChartExpanded: false,
        lastUpdated: '01.05.2025',
        operationsCount: 24,
        categoriesCount: 8,
        categories: [
            { name: 'Продукты', amount: '4,200', percentage: 42, color: '#00A876', icon: 'fa-shopping-basket' },
            { name: 'Транспорт', amount: '3,150', percentage: 31.5, color: '#00C191', icon: 'fa-bus' },
            { name: 'Кафе', amount: '2,100', percentage: 21, color: '#00D99E', icon: 'fa-utensils' },
            { name: 'Развлечения', amount: '1,500', percentage: 15, color: '#00F0AA', icon: 'fa-film' },
            { name: 'Жилье', amount: '1,500', percentage: 15, color: '#00FFB4', icon: 'fa-home' }
        ],
        chart: null
        };
    },
    mounted() {
        this.initChart();
    },
    methods: {
        initChart() {
        const ctx = this.$refs.financeChart.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: this.categories.map(c => c.name),
            datasets: [{
                data: this.categories.map(c => parseFloat(c.amount.replace(',', ''))),
                backgroundColor: this.categories.map(c => c.color),
                borderWidth: 0
            }]
            },
            options: {
            cutout: '70%',
            plugins: {
                legend: {
                display: false
                }
            }
            }
        });
        },
        toggleChartExpand() {
        this.isChartExpanded = !this.isChartExpanded;
        if (this.chart) {
            this.chart.options.cutout = this.isChartExpanded ? '60%' : '70%';
            this.chart.update();
        }
        }
    }
    };
</script>

<style>
    .analytics-block {
    margin-bottom: 30px;    
    }

    .chart-section {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 30px;
    }

    .chart-container {
    flex: 2;
    min-width: 300px;
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: var(--box-shadow);
    position: relative;
    transition: var(--transition);
    }

    .chart-container.expanded {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    z-index: 1000;
    max-width: 1000px;
    }

    .chart-toggle {
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--primary-light);
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--primary);
    transition: var(--transition);
    z-index: 10;
    }

    body.dark .chart-toggle {
    background: #3A4A54;
    color: var(--accent);
    }

    .chart-toggle:hover {
    background: var(--primary);
    color: white;
    }

    .chart-footer {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: #666;
    }

    body.dark .chart-footer {
    border-top-color: #3A4A54;
    color: #aaa;
    }

    .chart-stats {
    display: flex;
    gap: 15px;
    }

    .stat-item {
    text-align: center;
    }

    .stat-value {
    font-weight: bold;
    color: var(--primary);
    font-size: 1.1rem;
    }

    .stat-label {
    display: block;
    font-size: 0.7rem;
    color: #888;
    }

    body.dark .stat-label {
    color: #ccc;
    }

    .chart-legend {
    flex: 1;
    min-width: 250px;
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    }

    .legend-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    }

    .mobile-chart-toggle {
    display: none;
    background: var(--primary-light);
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--primary);
    transition: var(--transition);
    }

    body.dark .mobile-chart-toggle {
    background: #3A4A54;
    color: var(--accent);
    }

    .mobile-chart-toggle:hover {
    background: var(--primary);
    color: white;
    }

    .chart-legend h3 {
    color: var(--primary-dark);
    }

    body.dark .chart-legend h3 {
    color: var(--accent);
    }

    .category-list {
    list-style: none;
    margin: 20px 0;
    }

    .category-item {
    margin-bottom: 15px;
    }

    .category-info {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    }

    .category-color {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 10px;
    flex-shrink: 0;
    }

    .category-icon {
    width: 20px;
    text-align: center;
    margin-right: 8px;
    color: var(--primary-dark);
    }

    body.dark .category-icon {
    color: var(--accent);
    }

    .category-name {
    flex-grow: 1;
    font-weight: 500;
    }

    .category-amount {
    font-weight: 600;
    }

    .btn-export {
    background-color: var(--primary-light);
    color: var(--primary);
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    font-weight: 600;
    width: 100%;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    }

    body.dark .btn-export {
    background-color: #3A4A54;
    color: var(--accent);
    }

    .btn-export:hover {
    background-color: var(--primary);
    color: white;
    }

    @media (max-width: 992px) {
    .chart-section {
        flex-direction: column;
    }

    .chart-container,
    .chart-legend {
        width: 100%;
    }
    }
</style>
<template>
    <div class="summary-block">
      <h2 class="section-title">
        <i class="ri-line-chart-line"></i>Финансовая аналитика
      </h2>
  
      <div class="analytics-container">
        <div class="summary-card">
          <h3><i class="ri-wallet-line"></i> Общие расходы</h3>
          <div class="summary-value">{{ totalExpenses }} ₽</div>
          <p>за текущий месяц</p>
  
          <div class="summary-period">
            <button class="period-btn" :class="{ activePeriod: activePeriod === 'month' }"
              @click="setPeriod('month')">Месяц</button>
            <button class="period-btn" :class="{ activePeriod: activePeriod === 'week' }"
              @click="setPeriod('week')">Неделя</button>
            <button class="period-btn" :class="{ activePeriod: activePeriod === 'year' }"
              @click="setPeriod('year')">Год</button>
          </div>
        </div>
  
        <div class="summary-card">
          <h3><i class="ri-coins-line"></i> Общие доходы</h3>
          <div class="summary-value">{{ totalIncome }} ₽</div>
          <p>за текущий месяц</p>
          <div class="summary-period">
            <button class="period-btn" :class="{ activePeriod: activePeriod === 'month' }"
              @click="setPeriod('month')">Месяц</button>
            <button class="period-btn" :class="{ activePeriod: activePeriod === 'week' }"
              @click="setPeriod('week')">Неделя</button>
            <button class="period-btn" :class="{ activePeriod: activePeriod === 'year' }"
              @click="setPeriod('year')">Год</button>
          </div>
        </div>
  
        <div class="summary-card">
          <h2><i class="ri-piggy-bank-line"></i> Остаток бюджета</h2>
          <div class="summary-value">{{ budgetLeft }} ₽</div>
          <p>из {{ budgetTotal }} ₽</p>
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: budgetPercentage + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activePeriod: 'month',
        totalExpenses: '12,450',
        totalIncome: '45,000',
        budgetLeft: '27,550',
        budgetTotal: '40,000',
        budgetPercentage: 69
      }
    },
    methods: {
      setPeriod(period) {
        this.activePeriod = period;
      }
    }
  }
  </script>
  
  <style scoped>

  .summary-block {
    margin-bottom: 30px;
  }
  
  .analytics-container {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  
  .summary-card {
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: var(--box-shadow);
    flex: 1;
    min-width: 250px;
    transition: var(--transition);
  }
  
  .summary-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 168, 118, 0.15);
  }
  
  body.dark .summary-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  .summary-card h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    margin-bottom: 5px;
  }
  
  .summary-value {
    font-size: 2rem;
    font-weight: 700;
    margin: 10px 0;
    color: var(--primary);
  }
  
  .summary-period {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
  }
  
  .period-btn {
    background: var(--primary-light);
    border: none;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: var(--transition);
  }
  
  body.dark .period-btn {
    background: #3A4A54;
    color: white;
  }
  
  .period-btn.activePeriod {
    background: var(--primary);
    color: white;
  }
  
  .period-btn:hover:not(.activePeriod) {
    background: var(--secondary);
    color: white;
  }
  
  .progress-container {
    width: 100%;
    height: 8px;
    background-color: var(--primary-light);
    border-radius: 4px;
    margin-top: 10px;
    overflow: hidden;
  }
  
  body.dark .progress-container {
    background-color: #3A4A54;
  }
  
  .progress-bar {
    height: 100%;
    border-radius: 4px;
    background: var(--primary);
    transition: width 0.5s ease;
  }
  
  @media (max-width: 768px) {
    .analytics-container {
      flex-direction: column;
    }
  
    .summary-card {
      width: 100%;
    }
  }
  
  @media (max-width: 576px) {
    .summary-value {
      font-size: 1.8rem;
    }
  }
  </style>
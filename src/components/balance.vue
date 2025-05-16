<template>
    <!-- https://glidejs.com/docs/setup/ -->
    <div class="finance-slider">
        <div class="glide" ref="glide">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <li class="glide__slide" v-for="(currency, index) in currencies">
                        <div class="currency-slide">

                            <div class="finance-card">
                                <div class="finance-stats">
                                    <div class="stat-flex">
                                        <div class="stat-header">
                                            <i class="ri-arrow-right-down-box-line"></i>
                                            <span class="stat-title">Расходы</span>
                                        </div>
                                        <div class="summary-value negative">
                                            {{ currency.totalExpenses }} {{ currency.symbol }}
                                        </div>
                                    </div>

                                    <div class="stat-flex">
                                        <div class="stat-header">
                                            <i class="ri-arrow-right-up-box-line"></i>
                                            <span class="stat-title">Доходы</span>
                                        </div>
                                        <div class="summary-value positive">
                                            {{ currency.totalIncome }} {{ currency.symbol }}
                                        </div>
                                    </div>
                                </div>

                                <div class="summary-period">
                                    <button
                                        v-for="period in periods"
                                        :key="period.value"
                                        class="period-btn"
                                        :class="{ activePeriod: activePeriod === period.value }"
                                        @click="setPeriod(period.value)"
                                    >
                                        {{ period.label }}
                                    </button>
                                </div>
                            </div>

                            <div class="finance-card">
                                <div class="card-header">
                                    <h3 class="stat-title">
                                        <i class="ri-wallet-3-line"></i>
                                        Остаток бюджета
                                    </h3>
                                </div>

                                <div class="budget-display">
                                    <div class="budget-amount">
                                        <span class="summary-value">{{ currency.budgetLeft }} {{ currency.symbol }}</span>
                                        <span class="total">из {{ currency.budgetTotal }} {{ currency.symbol }}</span>
                                    </div>

                                    <div class="budget-progress">
                                        <div
                                            class="progress-bar"
                                            :style="{ width: currency.budgetPercentage + '%' }"
                                            :aria-valuenow="currency.budgetPercentage"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div>

                                    <div class="budget-percentage">
                                        {{ currency.budgetPercentage }}% использовано
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="glide__controls">
                <div class="glide__bullets" data-glide-el="controls[nav]">
                    <button
                        v-for="(_, index) in currencies"
                        :key="index"
                        class="glide__bullet"
                        :data-glide-dir="`=${index}`"
                    ></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'

export default {
    data() {
        return {
            activePeriod: 'month',
            periods: [
                { value: 'week', label: 'Неделя' },
                { value: 'month', label: 'Месяц' },
                { value: 'year', label: 'Год' }
            ],
            currencies: [
                {
                    label: 'Рубли',
                    symbol: 'RUB',
                    totalExpenses: '12,450',
                    totalIncome: '45,000',
                    budgetLeft: '27,550',
                    budgetTotal: '40,000',
                    budgetPercentage: 99  
                },
                {
                    label: 'Доллары США',
                    symbol: 'DOL',
                    totalExpenses: '1,050',
                    totalIncome: '3,000',
                    budgetLeft: '1,950',
                    budgetTotal: '2,500',
                    budgetPercentage: 78
                },
                {
                    label: 'Юани',
                    symbol: 'YEN',
                    totalExpenses: '800',
                    totalIncome: '2,300',
                    budgetLeft: '1,500',
                    budgetTotal: '2,000',
                    budgetPercentage: 75
                }
            ],
            glide: null
        }
    },
    mounted() {
        this.initGlide()
    },
    beforeDestroy() {
        if (this.glide) {
            this.glide.destroy()
        }
    },
    methods: {
        setPeriod(period) {
            this.activePeriod = period
        },
        initGlide() {
            this.glide = new Glide(this.$refs.glide, {
                type: 'slider',
                perView: 1,
                gap: 24,
                animationDuration: 500,
                breakpoints: {
                    768: {
                        gap: 16
                    },
                    480: {
                        gap: 12
                    }
                }
            }).mount()
        }
    }
}
</script>

<style src="/css/balance.css"></style>
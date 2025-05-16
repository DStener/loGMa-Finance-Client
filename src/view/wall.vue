<template>
    <balance />
    <analytics />
    <history />
</template>
<script>
import balance from '@/components/balance.vue';
import analytics from '../components/analytics.vue'
import history from '../components/history.vue'

export default {
    components: {
        balance,
        analytics,
        history
    },

}
</script>
<style></style>
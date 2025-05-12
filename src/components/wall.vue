<template>
    <hader/>
    <balance/>
    <history/>
    <groups/>
    <analytics/>
</template>

<script>
import balance from './components/balance.vue';
import analytics from './components/analytics.vue';
import history from './components/history.vue';
import groups from './components/groups.vue';
import hader from './components/hader.vue';

export default {

    components: {
        balance,
        analytics,
        history,
        groups,
        hader
    },
    data() {
        return {}; 
    },
    methods: {} 
    }
</script>

<style>

</style>
<template>
    <group-managment v-if="isAuth === true && isAdmin === true && isGroup === true"/>
    <balance />
    <analytics />
    <history />
</template>
<script>
import balance from '@/components/balance.vue';
import analytics from '../components/analytics.vue'
import history from '../components/history.vue'
import groupManagment from '@/components/group-managment.vue';

export default {
    components: {
        balance,
        analytics,
        history,
        groupManagment
    },
    data(){
        return{
            isAuth: true,
            isAdmin: true,
            isGroup: true
        }
    }

}
</script>
<style></style>
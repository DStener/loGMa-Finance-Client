<template>
    <hmenu/>
    <router-view />
</template>

<script>

import hmenu from './components/hmenu.vue';


export default {

    components: { 
        hmenu
    },
    data() {
        return {}; 
    },
    methods: {
        currentPath(path) {
            return window.location.pathname === path
        }

    } 
    }
</script>

<style>

</style>
<template>
    <hmenu />
    <router-view v-if="is404Status" />
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
    computed: {
        is404Status() {
            console.log("CONNECTED");
            console.log(window.performance.getEntries()[0].responseStatus);
            return true;
        },
    },


    methods: {
        currentPath(path) {
            return window.location.pathname === path
        }

    }
}
</script>

<style></style>
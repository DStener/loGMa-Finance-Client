<template>
    <!-- <hmenu />
    <router-view v-if="is404Status" /> -->
    <history/>
</template>

<script>

// import hmenu from './components/hmenu.vue';
import History from './components/history.vue';
import history from './components/history.vue';

export default {



    components: {
        // hmenu
        history
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
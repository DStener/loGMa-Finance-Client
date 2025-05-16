<template>
    <div v-if="isWindowShow" class="win-background">
        <div class="win-main">
            <button class="win-close-btn" @click="this.isWindowShow = false"><i class="ri-close-line"></i></button>
            <h1>Landing page</h1>
        </div>
    </div>
</template>

<style src="/css/window.css"></style>

<script>
export default {
    name: 'Window',
    data() {
        return {
            isWindowShow: true,
        }
    }
}
</script>
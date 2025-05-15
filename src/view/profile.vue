<template>
    <div class="block color-back">
        <div>
            <img :src="avatar"></img>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    data() {
        return {
            isWindowShow: true,
            avatar: "file:///C:/Users/ext/Documents/loGMa-Finance-Server/root/avatar.jpg",
        }
    }
}
</script>

<style>
    .big-avatar {
        
    }
</style>
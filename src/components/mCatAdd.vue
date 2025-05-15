<template>
    <div v-if="isWindowShow2" class="win-background">
        <div class="win-main">
            <button class="win-close-btn" @click="this.isWindowShow2 = false"><i class="ri-close-line"></i></button>
            <div class="win-main">
                <button class="win-close-btn" @click="this.isWindowShow2 = false"><i class="ri-close-line"></i></button>
                <h1>Добавить категорию</h1>
                <input type="text" v-model="categoryName" placeholder="Название">
                <input type="number" v-model="categoryLimit" placeholder="Задайте лимит">
                <button  @click=addCategory, isWindowShow2 = "false"  className="btn-add">добавить</button>
            </div>
        </div>
    </div>
</template>

<style src="/css/window.css">
    .btn-add {
    font-size: 18px;
    width: 100%;
    height: 30px;
    padding: 0 0 3px 0px;
    background-color: var(--color-background-soft);
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    color: var(--primary-dark);
    transition: var(--transition);
    align-items: center;
}

.btn-add:hover {
    background: var(--color-background-mute);
    color: var(--primary-light);
}
</style>

<script>
export default {
    data() {
        return {
            isWindowShow2: false,
            categotyName: '',
            categoryLimit: null,


        }
    },
    methods:{
        addCategory(){
            if (this.categotyName === '') {
                alert('Введите название категории');
                return;
            }
            
            if (this.categoryLimit === 0 || this.categoryLimit < 0) {
                alert('Лимит должен быть выше нуля');
                return;
            }
        }
    }
}
</script>
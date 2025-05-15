<template>
    <div class="block color-back"></div>

    <table><tbody>
        <template v-for="cluster in data">
        <tr class="table-date" colspan="3"><td>{{cluster.date}}</td></tr>
        <tr v-for="operation in cluster.list">
            <th v-if="operation.isAdding" class="table-value adding" width="160px">+{{operation.value}} {{operation.currency}}</th>
            <th v-if="!operation.isAdding" class="table-value" width="160px">{{operation.value}} {{operation.currency}}</th>

            <th class="table-category" align="left">
                <p class="table-line-jow">
                    <div class="table-color" :style="{'background-color' : operation.color }"></div>
                    <label>{{operation.category}}</label> 
                </p>
            </th>
            <th class="table-description" align="left">{{operation.description}} </th>
        </tr>
        </template>
    </tbody></table>

</template>

<script>
export default {
    name: 'Wall',
    data() {
        return {
            isWindowShow: true,
            data: [
                {date: "10.10.2025", list: [
                    {value: 2000, isAdding: true, currency: "RUB", description: "рапок р олакпол п оплдкп лд  рполкпрол  опклдп лдр лдкпрлдк рлдк плдкр шлд", category: "Электроника", color: "#000000"},
                    {value: 1000, isAdding: false, currency: "RUB", description: "", category: "Еда", color: "#101010"}
                ]},
                {date: "09.10.2025", list: [
                    {value: +400, isAdding: true, currency: "DOL", description: "", category: "Шоппинг", color: "#101010"}
                ]},
            ]
        }
    }
}
</script>

<style src="/css/wall.css"></style>
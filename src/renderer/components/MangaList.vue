<template>
    <div>
        <h2>漫画列表</h2>
        <ul>
            <li v-for="manga in mangas" :key="manga.id">{{ manga.title }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mangas: [
                { id: 1, title: '漫画 A' },
                { id: 2, title: '漫画 B' },
                { id: 3, title: '漫画 C' },
            ],
        };
    },
};
</script>

<style>
ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 5px;
    border-bottom: 1px solid #ddd;
}
</style>
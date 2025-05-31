<template>
    <div>
        <h1>漫画管理软件</h1>
        <nav>
            <a href="#">首页</a>
            <a href="#">我的漫画</a>
        </nav>
        <div>
            <button @click="scanMangas">扫描漫画</button>
            <!-- 这里将显示漫画列表 -->
            <manga-list />
        </div>
    </div>
</template>

<script setup>
import MangaList from './components/MangaList.vue'
import { onMounted } from 'vue';

function scanMangas(){
    window.electronAPI.scanMangas();
}

onMounted(window.electronAPI.onMangasUpdated((event, mangas) => {
    console.log('mangas updated', mangas)
}))

</script>


<style>
h1 {
    color: #333;
}

nav {
    margin: 10px 0;
}

nav a {
    margin-right: 10px;
}

button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
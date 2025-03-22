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

<script>
import MangaList from './components/MangaList.vue';
import { ipcRenderer  } from 'electron';

export default {
    components: {
        MangaList,
    },
};
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
</style>
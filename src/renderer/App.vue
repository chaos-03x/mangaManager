<template>
    <div>
        <h1>漫画管理软件</h1>
        <nav>
            <a href="#">首页</a>
            <a href="#">我的漫画</a>
        </nav>
        <div>
            <!-- 这里将显示漫画列表 -->
            <MangaList/>
        </div>
    </div>
</template>

<script>
import MangaList from './components/MangaList.vue'
import { onMounted } from 'vue';

export default {
    components: {MangaList}
}

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
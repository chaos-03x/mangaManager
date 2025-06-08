<template>
    <div>
        <input type="text" v-model="libraryPath" placeholder="输入漫画库路径" />
        <button @click="scanLibrary" :disabled="isLoading">
            {{ isLoading ? '扫描中...' : '开始扫描' }}
        </button>
        <div v-if="isLoading">
            正在扫描... {{ progress.processed }}/{{ progress.total }}
        </div>
        <div v-if="error">扫描出错: {{ error }}</div>
        <div v-if="authors.length > 0">
            <h3>扫描结果:</h3>
            <ul>
                <li v-for="author in authors" :key="author.name">
                    <h4>{{ author.name }} ({{ author.series.length }} 部作品)</h4>
                    <ul>
                        <li v-for="series in author.series" :key="series.id">
                            {{ series.name }} (ID: {{ series.id }}, {{ series.imageCount }} 页) - Path: {{ series.path }}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
defineOptions({name:'MangaList'})
import { ref, onMounted } from 'vue';

// const libraryPath = ref('F:/Test'); // 你的默认或测试路径
const libraryPath = ref('C:/Users/z.chaos/Downloads/Test')
const authors = ref([]);
const isLoading = ref(false);
const error = ref(null);
const progress = ref({ processed: 0, total: 0 });

const scanLibrary = async () => {
    if (!libraryPath.value) {
        alert('请输入漫画库路径！');
        return;
    }
    isLoading.value = true;
    authors.value = [];
    error.value = null;
    try {
        console.log(`准备调用 electronAPI.scanMangas, 路径: ${libraryPath.value}`);
        // 确保 window.electronAPI 已正确加载
        if (window.electronAPI && typeof window.electronAPI.scanMangas === 'function') {
            const result = await window.electronAPI.scanMangas(libraryPath.value);
            authors.value = result;
            console.log('扫描完成, 结果:', result);
        } else {
            throw new Error('electronAPI.scanMangas 不可用。请检查 preload.js 配置。');
        }
    } catch (err) {
        console.error('扫描漫画库时发生错误:', err);
        error.value = err.message || '发生未知错误';
    } finally {
        isLoading.value = false;
    }
};

// 在组件挂载时设置进度监听
onMounted(() => {
    if (window.electronAPI) {
        window.electronAPI.onScanProgress((event, progressData) => {
            progress.value = progressData;
        });
    }
});

defineExpose({
    scanLibrary
});

</script>

<style scoped>
/* 添加一些简单样式 */
input {
    margin-right: 10px;
    padding: 8px;
}

button {
    padding: 8px 15px;
}

ul {
    list-style-type: none;
    padding-left: 20px;
}
</style>
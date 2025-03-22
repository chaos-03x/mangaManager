/**
 * Description: 数据库的API接口，提供对漫画数据的增删改查操作。
 */

const mangaModel = require('../db/models/manga.js');
const metadataModel = require('../db/models/metadata.js');
const db = require('../db/index.js');

// 获取所有漫画
function getMangas() {
    return mangaModel.getAllMangas();
}

// 获取漫画详情
function getMangaDetails(id) {
    const manga = mangaModel.getMangaById(id);
    if (!manga) return null; // 如果没有找到漫画，返回null
    const metadata = metadataModel.getMetadataByMangaId(id);
    return { ...manga, metadata }; // 返回漫画和对应的元数据
}

// 添加新漫画
function addNewManga(data, metadata) {
    const { title, path, pages, size } = data;
    const { title: metaTitle, alt_title, language, category, group_name, character, hitomi_id, artist, parody, tags } = metadata || {};
    // 如果没有提供元数据，则使用默认值
    
    try {
        const transaction = db.transaction(() => {
            const mangaId = mangaModel.addManga(title, path, pages, size); // 添加漫画
    
            metadataModel.addMetadata(mangaId, metaTitle, alt_title, language, category, 
                group_name, character, hitomi_id, artist, parody, tags); // 添加元数据
                
            return mangaId;
        });
    
        return transaction(); // 执行事务并返回新添加的漫画ID
    } catch (error) {
        console.error('添加漫画失败:', error);
        throw error; 
    }

}


module.exports = {
    getMangas,
    getMangaDetails,
    addNewManga,
};
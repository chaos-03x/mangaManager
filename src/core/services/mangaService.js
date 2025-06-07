/**
 * Description: 数据库的API接口，提供对漫画数据的增删改查操作。
 */
// 需重构：
// - 从纯函数升级为类（便于扩展和依赖注入）。
// - 方法改为静态（无需实例化即可调用）。


const mangaModel = require('../db/models/manga.js');
const metadataModel = require('../db/models/metadata.js');
const db = require('../db/index.js');

/**
 * 获取所有漫画
 * @returns {Array} - 返回所有漫画的数组
 */
function getMangas() {
    return mangaModel.getAllMangas();
}

/**
 * 获取漫画的详细信息
 * @param {Number} id - 漫画表的ID
 * @returns {Object} - 返回指定ID的漫画和对应的元数据
 */
function getMangaDetails(id) {
    const manga = mangaModel.getMangaById(id);
    if (!manga) return null;
    const metadata = metadataModel.getMetadataByMangaId(id);
    return { ...manga, metadata };
}

/**
 * 添加新的漫画
 * @param {Object} data - 漫画的本地信息对象
 * @param {Object} metadata - 漫画的元数据对象
 * @returns {Number} - 新添加的漫画ID
 */
function addNewManga(data, metadata) {
    const { title, path, pages, size } = data;
    const { title: metaTitle, alt_title, language, category, group_name, character, hitomi_id, artist, parody, tags } = metadata || {};
    // 如果没有提供元数据，则默认使用空值
    
    try {
        const transaction = db.transaction(() => {
            const mangaId = mangaModel.addManga(title, path, pages, size); // 添加漫画
    
            metadataModel.addMetadata(mangaId, metaTitle, alt_title, language, category, 
                group_name, character, hitomi_id, artist, parody, tags); // 添加元数据
                
            return mangaId;
        });
    
        return transaction();
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
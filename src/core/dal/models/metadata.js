/**
 * Description: 封装对元数据表的增删改查操作。
 */

const db = require('../index.js');

// 获取指定ID的漫画元数据
function getMetadataByMangaId(mangaId) {
    const stmt = db.prepare('SELECT * FROM metadata WHERE manga_id = ?');
    return stmt.get(mangaId);
}

// 插入一部漫画的元数据
function addMetadata(manga_id, title, alt_title, language, category, group_name, character, hitomi_id, artist, parody, tags) {
    const stmt = db.prepare(`
        INSERT INTO metadata (manga_id, title, alt_title, language, category, group_name, character, hitomi_id, artist, parody, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(manga_id, title, alt_title, language, category, group_name, character, hitomi_id, artist, parody, tags);
    return info.lastInsertRowid;
}

// 更新指定ID的漫画元数据
function updateMetadata(id, updates) {
    const { title, alt_title, language, category, group_name, character, hitomi_id, artist, parody, tags } = updates;
    const stmt = db.prepare(`
        UPDATE metadata
        SET title = ?, alt_title = ?, language = ?, category = ?, group_name = ?, character = ?, hitomi_id = ?, artist = ?, parody = ?, tags = ?
        WHERE id = ?
    `);
    const info = stmt.run(title, alt_title, language, category, group_name, character, hitomi_id, artist, parody, tags, id);
    return info.changes;
}


module.exports = {
    getMetadataByMangaId,
    addMetadata,
    updateMetadata,
};
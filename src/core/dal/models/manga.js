/**
 * Description: 封装对漫画表的增删改查操作。
 */

const db = require('../index.js');

// 获取所有漫画
function getAllMangas() {
    const stmt = db.prepare('SELECT * FROM mangas');
    return stmt.all();
}

// 获取指定ID的漫画
function getMangaById(id) {
    const stmt = db.prepare('SELECT * FROM mangas WHERE id = ?');
    return stmt.get(id);
}

// 插入一部新的漫画
function addManga(title, path, pages, size) {
    const stmt = db.prepare(`
        INSERT INTO mangas (title, path, pages, size)
        VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(title, path, pages, size);
    return info.lastInsertRowid;
}

// 更新指定ID的漫画信息
function updateManga(id, updates) {
    const { title, path, pages, size } = updates;
    const stmt = db.prepare(`
        UPDATE mangas
        SET title = ?, path = ?, pages = ?, size = ?
        WHERE id = ?
    `);
    const info = stmt.run(title, path, pages, size, id);
    return info.changes;
}

// 删除指定ID的漫画
function deleteManga(id) {
    const stmt = db.prepare('DELETE FROM mangas WHERE id = ?');
    const info = stmt.run(id);
    return info.changes;
}

module.exports = {
    getAllMangas,
    getMangaById,
    addManga,
    updateManga,
    deleteManga,
};
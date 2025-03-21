// Description: 数据模型脚本，封装对应数据表的增删改查操作。

const db = require('../index.js');

function getAllMangas() {
    const stmt = db.prepare('SELECT * FROM mangas');
    return stmt.all();
}

function getMangaById(id) {
    const stmt = db.prepare('SELECT * FROM mangas WHERE id = ?');
    return stmt.get(id);
}
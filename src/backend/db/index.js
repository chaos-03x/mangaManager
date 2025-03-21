// Description: 数据库初始化脚本，创建SQLite数据库和表结构

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../manga.db'); // 数据库文件路径
const db = new Database(dbPath, { verbose: console.log }); // 创建数据库连接，启用日志输出

// 创建漫画表,存储漫画的本地数据和基本信息
db.exec(`
    CREATE TABLE IF NOT EXISTS mangas (
        id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自增主键
        title TEXT NOT NULL, -- 漫画标题
        path TEXT NOT NULL, -- 漫画文件路径
        pages INTEGER, -- 漫画页数
        size REAL -- 漫画文件大小 (单位: MB)
    );
`);

// 创建元数据表,与漫画表通过外键关联
db.exec(`
    CREATE TABLE IF NOT EXISTS metadata (
        id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自增主键
        manga_id INTEGER NOT NULL, -- 漫画ID, 外键关联mangas表
        
        title TEXT NOT NULL, -- 漫画标题
        alt_title TEXT, -- 漫画的其他标题
        language TEXT, -- 漫画语言
        category TEXT, -- 漫画分类
        group_name TEXT, -- 社团名
        character TEXT, -- 漫画中的角色

        hitomi_id INTEGER, -- 漫画在Hitomi上的ID
        -- 以下为冗余字段, 用于存储高频筛选条件，以提高查询效率
        artist TEXT, -- 作者名
        parody TEXT, -- 漫画的原作
        tags TEXT -- 漫画的标签
    )
`);

// 创建作者表,存储所有漫画作者
db.exec(`
    CREATE TABLE IF NOT EXISTS artists (
        id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自增主键
        name TEXT UNIQUE NOT NULL -- 作者名称, 唯一约束, 不允许重复
    )`
);

// 创建漫画-作者关联表，存储漫画和作者的多对多关系
db.exec(`
    CREATE TABLE IF NOT EXISTS manga_artists (
        id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自增主键
        manga_id INTEGER NOT NULL, -- 漫画ID, 外键关联mangas表
        artist_id INTEGER NOT NULL, -- 作者ID, 外键关联artists表
        FOREIGN KEY (manga_id) REFERENCES mangas(id), -- 外键约束, 关联mangas表
        FOREIGN KEY (artist_id) REFERENCES artists(id) -- 外键约束, 关联artists表
    )
`);

// 创建原作表，存储所有漫画原作
db.exec(`
    CREATE TABLE IF NOT EXISTS parody (
        id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自增主键
        name TEXT UNIQUE NOT NULL -- 原作名称, 唯一约束, 不允许重复
    )   
`);

// 创建漫画-原作关联表，存储漫画和原作的多对多关系
db.exec(`
    CREATE TABLE IF NOT EXISTS manga_parody (
        id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自增主键
        manga_id INTEGER NOT NULL, -- 漫画ID, 外键关联mangas表
        parody_id INTEGER NOT NULL, -- 原作ID, 外键关联parody表
        FOREIGN KEY (manga_id) REFERENCES mangas(id), -- 外键约束, 关联mangas表
        FOREIGN KEY (parody_id) REFERENCES parody(id) -- 外键约束, 关联parody表
    )
`);

// 创建标签表,存储所有标签
db.exec(`
    CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自增主键
        name TEXT UNIQUE NOT NULL -- 标签名称, 唯一约束, 不允许重复
    )
`);

// 创建漫画-标签关联表,存储漫画和标签的多对多关系
db.exec(`
    CREATE TABLE IF NOT EXISTS manga_tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自增主键
        manga_id INTEGER NOT NULL, -- 漫画ID, 外键关联mangas表
        tag_id INTEGER NOT NULL, -- 标签ID, 外键关联tags表
        FOREIGN KEY (manga_id) REFERENCES mangas(id), -- 外键约束, 关联mangas表
        FOREIGN KEY (tag_id) REFERENCES tags(id) -- 外键约束, 关联tags表
    )
`);
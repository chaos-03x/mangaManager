/**
 * Description: 漫画库的API接口，解析漫画目录结构
 */

const fileUtils = require('../utils/file.js');
const path = require('path');

/**
 * 获取指定目录下的所有作者及其漫画
 * @param {String} dirPath - 目录路径
 * @returns {Promise<object[]>} - 作者和漫画列表
 */
async function getArtistsAndMangas(dirPath) {
    const dirs = await fileUtils.getDirs(dirPath);
    const artists = [];
    for (const dir of dirs) {
        const artist = {
            name: path.basename(dir),
            mangas: await getMangas(dir)
        };
        artists.push(artist);
    }
    return artists;
}
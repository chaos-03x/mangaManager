/**
 * 漫画库扫描模型
 * 备注：需与数据库适配
 */

class MangaSeries {
  constructor(name, id, path, pageNum = 0) {
    this.name = name,
      this.id = id,
      this.path = path,
      this.pageNum = pageNum
  }
}

class AuthorEntry {
  constructor(author) {
    this.author = author,
      this.series = []
  }

  addSeries(series) {
    this.series.push(series)
  }

  hasSerise() {
    return this.series.length > 0
  }
}

module.exports = { MangaSeries, AuthorEntry }
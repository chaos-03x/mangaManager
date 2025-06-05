/**
 * 以下为占位例程
 */

class MangaSeries {
  constructor(name, id, path, imageCount = 0) {
    this.name = name
    this.id = id
    this.path = path
    this.imageCount = imageCount
  }
}

class AuthorEntry {
  constructor(name) {
    this.name = name
    this.series = []
  }

  addSeries(series) {
    this.series.push(series)
  }

  hasSeries() {
    return this.series.length > 0
  }
}

module.exports = { MangaSeries, AuthorEntry }
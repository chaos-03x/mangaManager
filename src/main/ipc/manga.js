const {ipcMain} = require('electron')
const path = require('path')
const fs = require('fs')

function scanMangas(libraryPath = "C:/Users/z.chaos/Downloads/Test"){
    try {
        
    } catch (error) {
        console.log('扫描失败：',error)
        throw new Error(`扫描失败：${error.message}`)
    }
}
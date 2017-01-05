const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = electron

let win

function createWindow() {
    // 创建窗口并加载页面
    win = new BrowserWindow({ 
        // 隐藏框架，即顶部的任务栏
        frame: false,
        width: 1200, 
        height: 600 
    })
    win.loadURL(`file://${__dirname}/index.html`)
    // win.loadURL(`http://127.0.0.1:8080/#/`)

    // 打开窗口的调试工具
    win.webContents.openDevTools()
    // 窗口关闭的监听
    win.on('closed', () => {
        win = null
    })
}
function reloadWindow() {
    win.webContents.reload()
}
//  创建窗体
app.on('ready', createWindow)
// 窗口关闭，退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
// ??
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
//
ipcMain.on('close-main-window', () => {
    app.quit()
})

ipcMain.on('reload-window', () => {
    reloadWindow()
})

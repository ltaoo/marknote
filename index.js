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
// 菜单
let template = [{
    label: '文件',
    submenu: [
        {
            label: '新建',
            accelerator: 'CmdOrCtrl+N',
            click: function (item, focusedWindow) {
                // console.log(win.webContents)
                win.webContents.webContents.send('new-note')
            }
        },
        {
            label: '保存',
            accelerator: 'CmdOrCtrl+S',
            click: function (item, focusedWindow) {
                // console.log(win.webContents)
                console.log('hello')
                win.webContents.webContents.send('save-note')
            }
        }
    ]
}, {
    label: '&View',
    submenu: [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
            win.webContents.reload()
        }
    }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
            win.setFullScreen(!win.isFullScreen());
        }
    }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
            win.toggleDevTools();
        }
    }]
}, {
    label: 'Window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'Ctrl+M',
        selector: 'performMiniaturize:'
    }]
}]

let menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)


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
ipcMain.on('quit-app', () => {
    app.quit()
})

ipcMain.on('reload-window', () => {
    reloadWindow()
})

const { app, BrowserWindow , ipcMain} = require('electron')
const path = require('path');
const fs = require('fs');

const pathCooke = path.join(app.getPath('home') , "AppData/Local/LopHocApp/cookie.json");
const pathSetting = path.join(app.getPath('home') , "AppData/Local/LopHocApp/setting.json");

var Cookie = {}
var Setting = {}

const createWindow = () => {
    const win = new BrowserWindow({
        title: "lop hoc",
        autoHideMenuBar: true,
        width: 1000,
        height: 600,
        minWidth: 700,
        maxHeight: 900,
        maxWidth: 1400,
        frame: false,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    
    // window_ipc ============================
    ipcMain.on("closeApp" , () => {
        win.close()
    })

    ipcMain.on("minimizeApp" , () => {
        win.minimize()
    })

    ipcInit()

    win.loadFile('./render/index.html')
}

app.whenReady().then(() => {

    if (fs.existsSync(pathCooke))
        Cookie = JSON.parse(fs.readFileSync(pathCooke))
    else 
        fs.writeFileSync(pathCooke, '{}')

    if (fs.existsSync(pathSetting)) 
        Setting = JSON.parse(fs.readFileSync(pathSetting))
    else
        fs.writeFileSync(pathSetting, '{}')

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (Cookie.Remenber) {
        const strCooke = JSON.stringify(Cookie);
        fs.writeFileSync(pathCooke, strCooke);
    }
    else {
        const strCooke = JSON.stringify({});
        fs.writeFileSync(pathCooke, strCooke);
    }

    fs.writeFileSync(pathSetting , JSON.stringify(Setting))
    if (process.platform !== 'darwin') app.quit()
})

function ipcInit() {
    // Cookie ipc ============================
    ipcMain.on("setCookie", (sender, data) => {    
        Cookie[data.key] = data.value;
    })

    ipcMain.on("setAllCookie", (sender, data) => {
        Cookie = data;
        console.log(data)
        const strCooke = JSON.stringify(Cookie);
        fs.writeFileSync(pathCooke, strCooke);
    })

    ipcMain.handle("logout", (sender) => {
        Cookie = {};
        const strCooke = JSON.stringify({});
        fs.writeFileSync(pathCooke, strCooke);
        return Cookie;
    })

    ipcMain.handle("getCookie", (event, key) => {
        return Cookie[key];
    })

    ipcMain.handle("getAllCookie", (event) => {
        return Cookie;
    })

    // setting ipc =============================
    ipcMain.on('setSetting', (sender, data) => {
        Setting[data.key] = data.value;
    }) 
    ipcMain.handle('getSetting' , (sender , key) => {
        return Setting[key]
    })
    ipcMain.handle('getAllSetting', (sender) => {
        return Setting
    })

    ipcMain.on('setAllSetting', (sender, data) => {
        Setting = data
        const str = JSON.stringify(Setting)
        fs.writeFileSync(pathSetting, str)
    })
}
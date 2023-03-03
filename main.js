const { app, BrowserWindow , ipcMain} = require('electron')
const path = require('path');
const fs = require('fs');

const path_ = path.join(process.env.Home , "AppData/Local/LopHocApp/cookie.json");


var Cookie = {}

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

    ipcMain.on("closeApp" , () => {
        if (Cookie.Remenber) {
            const strCooke = JSON.stringify(Cookie);
            fs.writeFileSync(path_, strCooke);
        }
        else {
            const strCooke = JSON.stringify({});
            fs.writeFileSync(path_, strCooke);
        }
        win.close()
    })

    ipcMain.on("minimizeApp" , () => {
        win.minimize()
    })

    ipcMain.on("set_cookie", (sender, data) => {    
        Cookie[data.key] = data.value;
    })

    ipcMain.on("set_allCookie", (sender, data) => {
        Cookie = data;
        console.log(data)
        const strCooke = JSON.stringify(Cookie);
        fs.writeFileSync(path_, strCooke);
    })

    ipcMain.handle("logout", (sender) => {
        Cookie = {};
        const strCooke = JSON.stringify({});
        fs.writeFileSync(path_, strCooke);
        return Cookie;
    })

    ipcMain.handle("get_cookie", (event, key) => {
        return Cookie[key];
    })

    ipcMain.handle("get_all_cookie", (event) => {
        return Cookie;
    })

    win.loadFile('./render/index.html')
}

app.whenReady().then(() => {
    createWindow()

    Cookie = JSON.parse(fs.readFileSync(path_))

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    console.log(Cookie.Remenber)
    
    if (process.platform !== 'darwin') app.quit()
})
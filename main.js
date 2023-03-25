const { app, BrowserWindow , ipcMain, dialog , remote} = require('electron')
const {download} = require("electron-dl")

const path = require('path');
const fs = require('fs');
const url = require('url');
const { start } = require('repl');

const pathAppLocal = path.join(app.getPath('home') , "AppData/Local/LopHocApp");

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
            webviewTag: true
        },
    })

    
    // window_ipc ============================
    ipcMain.on("closeApp" , () => {
        win.close()
    })

    ipcMain.on("minimizeApp" , () => {
        win.minimize()
    })

    // dow handl ===============================
    // infor 
    // {
    //     url: "URL is here",
    //     properties: {directory: "Directory is here"}
    // }
    ipcMain.on("download", (event, {id, info}) => {
        console.log(id , info)
        info.properties.onProgress = status => {
            win.webContents.send("download progress", {
                id: id,
                status: status
            })
        };
        download(BrowserWindow.getFocusedWindow(), info.url, info.properties)
            .then(dl => {
                win.webContents.send("download complete", id)
            });

    })

    ipcInit()

    // win.loadFile('./render/index.html')
    win.loadURL(url.format({
        pathname: path.join(__dirname, './render/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    const ws = win.webContents

    ipcMain.handle("export" , async (sender, path) => {
        // console.log(path)
        await ws.capturePage().then(image => {
            fs.writeFileSync(path, image.toPNG(), (err) => {if (err) return false})
        })

        return true
    })

    ipcMain.handle("showOpenDialog" , async (sender) => {
        const { canceled, filePaths } = await dialog.showOpenDialog(win , {
            properties: ['openDirectory']
        })

        if (canceled) {
            return
        } else {
            return filePaths[0]
        }
    })


}

app.whenReady().then(() => {

    if (!fs.existsSync(pathAppLocal)) {
        fs.mkdirSync(pathAppLocal)
    }

    if (fs.existsSync(pathAppLocal + '/cookie.json'))
        Cookie = JSON.parse(fs.readFileSync(pathAppLocal + '/cookie.json'))
    else
        fs.writeFileSync(pathAppLocal + '/cookie.json', '{}')

    if (fs.existsSync(pathAppLocal + '/setting.json')) 
        Setting = JSON.parse(fs.readFileSync(pathAppLocal + '/setting.json'))
    else
        fs.writeFileSync(pathAppLocal + '/setting.json', '{}')

    Setting["path"] = null
    if(process.argv.length >= 2) {
        let filePath = process.argv[1];
        Setting["path"] = filePath
    }

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (Cookie.Remenber) {
        const strCooke = JSON.stringify(Cookie);
        fs.writeFileSync(pathAppLocal + '/cookie.json', strCooke);
    }
    else {
        const strCooke = JSON.stringify({});
        fs.writeFileSync(pathAppLocal + '/cookie.json', strCooke);
    }

    fs.writeFileSync(pathAppLocal + '/setting.json' , JSON.stringify(Setting))
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
        fs.writeFileSync(pathAppLocal + '/cookie.json', strCooke);
    })

    ipcMain.handle("logout", (sender) => {
        Cookie = {};
        const strCooke = JSON.stringify({});
        fs.writeFileSync(pathAppLocal + '/cookie.json', strCooke);
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
        fs.writeFileSync(pathAppLocal + '/setting.json', str)
    })

    // export file img
}

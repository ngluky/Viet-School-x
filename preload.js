const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('CookieIpc', {
    set: (k , v) => {
        ipcRenderer.send("setCookie" , {key: k, value: v});
    },
    get: (key) => {
        return ipcRenderer.invoke("getCookie" , key);
    },

    all: () => {
        return ipcRenderer.invoke("getAllCookie");
    },

    setAll: (data) => {
        ipcRenderer.send('setAllCookie' , data)
    },

    clear : () => ipcRenderer.invoke('logout')
})

contextBridge.exposeInMainWorld('SettingIpc', {
    set: (k , v) => {
        ipcRenderer.send('setSetting', {key: k , value: v});
    },
    get: (k) => {
        return ipcRenderer.invoke('getSetting' , k)
    },

    getAll: () => {
        return ipcRenderer.invoke('getAllSetting')
    },

    setAll: (data) => {
        ipcRenderer.send('setAllSetting', data)
    }

}) 

contextBridge.exposeInMainWorld("App", {
    close : () => {
        ipcRenderer.send("closeApp")
    }, 

    minimize : () => {
        ipcRenderer.send('minimizeApp')
    }

})

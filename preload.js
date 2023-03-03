const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('Cookie_ipc', {
    set: (k , v) => {
        ipcRenderer.send("set_cookie" , {key: k, value: v});
    },
    get: (key) => {
        return ipcRenderer.invoke("get_cookie" , key);
    },

    all: () => {
        return ipcRenderer.invoke("get_all_cookie");
    },

    setAll: (data) => {
        ipcRenderer.send('set_allCookie' , data)
    },

    clear : () => ipcRenderer.invoke('logout')
})

contextBridge.exposeInMainWorld("App", {

    close : () => {
        ipcRenderer.send("closeApp")
    }, 

    minimize : () => {
        ipcRenderer.send('minimizeApp')
    }

})

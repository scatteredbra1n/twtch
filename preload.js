const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  toggleMaximizeWindow: () => ipcRenderer.send('toggle-maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  showNotification: (title, body) => ipcRenderer.send('show-notification', { title, body }),
  getOS: () => ipcRenderer.invoke('get-os')
});

window.addEventListener('DOMContentLoaded', () => {
  console.log("yeh")
  setTimeout(function() {
    document.querySelector("[aria-label=\"Pause (space/k)\"]").click()
  }, 1000);

  setTimeout(function() {
    document.querySelector(".front-page-carousel").remove();
  }, 2000)
  
});


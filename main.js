const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const notify = require('electron-main-notification')


let win
function createWindow () {
  win = new BrowserWindow({width: 1280, height: 900}) // load the dist folder from Angular
  win.loadURL(url.format({ pathname: path.join(__dirname, 'dist/index.html'), protocol: 'file:', slashes: true }))
  win.setMenu(null);

// Open the DevTools optionally:
// win.webContents.openDevTools()
  win.on('closed', () => { win = null })
}


app.setAppUserModelId('Hangman')
app.on('ready', createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit() } })
app.on('activate', () => { if (win === null) { createWindow() } })
app.on('ready', () => {
  notify('Welcome!', { body: 'This is Hangman in Electron!' }, () => {
    console.log('The notification got clicked on!')
  })
})

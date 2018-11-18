const electron = require('electron');
const { ipcRenderer } = electron;

let titleBar = document.querySelector('#title-bar');
let minimizeButton = document.querySelector('#minimize-btn');
let maximizeButton = document.querySelector('#maximize-btn');
let closeButton = document.querySelector('#close-btn');

minimizeButton.addEventListener('click', () => {
    ipcRenderer.send('minimize-main-window');
});

maximizeButton.addEventListener('click', () => {
    let icon = maximizeButton.querySelector('.material-icons');
    if (icon.textContent === 'fullscreen') {
        icon.innerHTML = 'fullscreen_exit';
    } else {
        icon.innerHTML = 'fullscreen';
    }

    ipcRenderer.send('maximize-main-window');
});

ipcRenderer.on('enter-full-screen', (value) => {
    titleBar.setAttribute('style', ' visibility: collapse; height: 0;');
});

ipcRenderer.on('leave-full-screen', (value) => {
    titleBar.setAttribute('style', '');
});

closeButton.addEventListener('click', () => {
    ipcRenderer.send('close-main-window');
});

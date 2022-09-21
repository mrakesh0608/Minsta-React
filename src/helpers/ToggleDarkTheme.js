let isDark = false;

const ToggleDarkTheme = () => {
    console.log('Theme Changed');

    if (isDark) {
        document.documentElement.style.setProperty('--bgColor', 'white');
        document.documentElement.style.setProperty('--textColor', 'black');
        document.documentElement.style.setProperty('--invertStrength', '0');
        document.documentElement.style.setProperty('--bgLightColor', 'gainsboro');
        document.documentElement.style.setProperty('--bgChatLeftColor', 'lightblue');
        document.documentElement.style.setProperty('--bgChatRightColor', 'lightgreen');
        document.documentElement.style.setProperty('--bgChatTimeColor', 'gray');
        document.documentElement.style.setProperty('--bgNotifLable', 'gainsboro');
        isDark = false;
        localStorage.removeItem('Dark-Theme');
    }
    else {
        document.documentElement.style.setProperty('--bgColor', 'black');
        document.documentElement.style.setProperty('--textColor', 'white');
        document.documentElement.style.setProperty('--invertStrength', '100%');
        document.documentElement.style.setProperty('--bgLightColor', 'gray');
        document.documentElement.style.setProperty('--bgChatLeftColor', '#111B21');
        document.documentElement.style.setProperty('--bgChatRightColor', '#176b5b');
        document.documentElement.style.setProperty('--bgChatTimeColor', '#FFFFFF99');
        document.documentElement.style.setProperty('--bgNotifLable', 'darkslategray');
        isDark = true;
        localStorage.setItem('Dark-Theme', true);
    }
}

export default ToggleDarkTheme;
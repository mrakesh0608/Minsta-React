let isDark=true;

const ToggleDarkTheme = () => {
    console.log('Theme Changed');

    if (isDark) {
        document.documentElement.style.setProperty('--bgColor', 'black');
        document.documentElement.style.setProperty('--textColor', 'white');
        document.documentElement.style.setProperty('--invertStrength', '100%');
        document.documentElement.style.setProperty('--bgLightColor' ,'gray');
        document.documentElement.style.setProperty('--bgChatLeftColor' ,'#111B21');
        document.documentElement.style.setProperty('--bgChatRightColor' ,'#176b5b');
        document.documentElement.style.setProperty('--bgChatTimeColor' ,'#FFFFFF99');
        isDark = false;
    }
    else {
        document.documentElement.style.setProperty('--bgColor', 'white');
        document.documentElement.style.setProperty('--textColor', 'black');
        document.documentElement.style.setProperty('--invertStrength', '0');
        document.documentElement.style.setProperty('--bgLightColor' ,'gainsboro');
        document.documentElement.style.setProperty('--bgChatLeftColor' ,'lightblue');
        document.documentElement.style.setProperty('--bgChatRightColor' ,'lightgreen');
        document.documentElement.style.setProperty('--bgChatTimeColor' ,'gray');
        isDark = true;
    }
}

export default ToggleDarkTheme;
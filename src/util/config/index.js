// noinspection Annotator
export  const Config = {};

// Config.RootPath = __URLMobile__;
// // noinspection Annotator
Config.IsDebug = true;
// noinspection Annotator
// Config.ServerURL = 'http://144.202.3.169:8080';
Config.ServerURL ='https://worldcupethbet.com/ajax'

Config.ua = navigator.userAgent.toLowerCase();

// Config.ua='worldcupapp';

Config.isWorldCupApp=()=>{
    return /(worldcupapp)/i.test(Config.ua)
}

export default Config;

export const gameStateText=(gameState)=>{
    switch (parseInt(gameState)){
        case 0:
            return '未开放';
        case 1:
            return '下注中';
        case 2:
            return '下注关闭';
        case 3:
            return '游戏结束';
        case 4:
            return '关闭'
    }
};

export const getCategoryNameByType = (type) => {
    switch (type) {
        case 1:
            return '上半场';
        case 2:
            return '下半场';
        case 3:
            return '全场';
        case 4:
            return '总比分';
        default:
            return null
    }
};

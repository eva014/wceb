//曼彻斯特联队、切尔西、利物浦、阿森纳、托特纳姆热刺、曼彻斯特城
export const Team0 = {
    name: '曼彻斯特联队'
};

export const Team1 = {
    name: '切尔西'
};


export const Team2 = {
    name: '利物浦'
};

const teamNames = ['曼彻斯特联队', '切尔西', '利物浦', '阿森纳', '托特纳姆热刺', '曼彻斯特城'];
export const createTeam = () => {
    const name = teamNames[parseInt(`${teamNames.length * Math.random()}`)];
    return {
        name
    }
};


export const createMatch = () => {
    return {
        league: '英超',
        matchId: '7538ebc37ad0917853e044b9b42bd8a4',
        start: 1521538327000,
        radiant: createTeam(),
        dire: createTeam()
    }
};

const betCategoryNames = ['全赛', '半场', '总进球',];

export const createMatchBetCategories = () => {
    const name = betCategoryNames[parseInt(`${betCategoryNames.length * Math.random()}`)];
    const category={
        name: name,
        tradingFee: '0.112 eth',
        serviceFee: '获利部分 5%',
        items: new Array(5).fill(createMatchBetItem())
    }
    return new Array(4).fill(category);
};

// |betId|string||
// | name | string  | 下注项目名字 |
// |returnRate|double| 0.1245 |
// |left|string|0时前台显示已买满 |
const BetItemNames = ['0-0', '1-0', '0-1', '1-1', '1-2', '3-1']
export const createMatchBetItem = () => {
    return {

        name: BetItemNames[parseInt(`${BetItemNames.length * Math.random()}`)],
        returnRate: Number(Math.random()).toFixed(4),
        left: parseInt(`${BetItemNames.length * Math.random()}`) % 2 === 0 ? 0 : parseInt(`${10000 * Math.random()}`)
    }
};

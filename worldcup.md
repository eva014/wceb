


### 1.获取比赛列表 - [/match/list] - GET

- 请求参数

| 参数   | 类型   | Optional | 备注          |
| ---- | ---- | -------- | ----------- |
| page | int  | O        |  |

- 返回参数

|  父级  |  参数  | 类型 | 备注          |
| ---- | ---- | -------- | ----------- |
|  | hasMore  | bool        |  |
|  | items  | Array([Match])        |  |


### 2.获取比赛详情 - [/match/detail] - GET

- 请求参数

| 参数   | 类型   | Optional | 备注          |
| ---- | ---- | -------- | ----------- |
| matchId | string  | M        |  |

- 返回参数

|  父级  |  参数  | 类型 | 备注          |
| ---- | ---- | -------- | ----------- |
|  | data  | Object([Match])  | 未结束返回部分字段，比赛结束返回完整的Match |



### 3.获取押注项目 - [/match/bets] - GET

- 请求参数

| 参数   | 类型   | Optional | 备注          |
| ---- | ---- | -------- | ----------- |
| matchId | string  | M        |  |

- 返回参数

|  父级  |  参数  | 类型 | 备注          |
| ---- | ---- | -------- | ----------- |
|  | data  | Array([BetCategory])        |  |


### 4.获取比赛结果 - [/match/result] - GET

> 调用 [/match/detail]



### 5.获取比赛历史列表 - [/match/history] - GET

- 请求参数

| 参数   | 类型   | Optional | 备注          |
| ---- | ---- | -------- | ----------- |
| page | int  | O        |  |
| days|int |O| 距离今天的天数,0表示今天,1表示昨天|

- 返回参数

|  父级  |  参数  | 类型 | 备注          |
| ---- | ---- | -------- | ----------- |
| data | items  | Array([Match])        |  |
| data | hasMore  | bool       |  |

### 6.下注 - [/match/order] - POST

- 请求参数

| 参数   | 类型   | Optional | 备注          |
| ---- | ---- | -------- | ----------- |
| betId | string  | M        |  |
|stake|string|M|下注金额|

- 返回参数

|  父级  |  参数  | 类型 | 备注          |
| ---- | ---- | -------- | ----------- |
| data | orderNo | string       | 订单号  |

### 7.订单详情 -[/match/orderdetail] -GET

- 请求参数

| 参数   | 类型   | Optional | 备注          |
| ---- | ---- | -------- | ----------- |
| orderNo | string  | M        |  |


- 返回参数

|  父级  |  参数  | 类型 | 备注          |
| ---- | ---- | -------- | ----------- |
|  | data | [Order]       | 订单详情  |


## Team

| 参数   | 类型   | 备注 |
| ---- | ---- | -------- |
| teamId | string  | |
| avatar | string  | 队标|
| name | string  | 队伍名字|

## Score

| 参数   | 类型   | 备注 |
| ---- | ---- | -------- |
| fullTime | int  | |
| firstHalf|int| |


## Match

| 参数   | 类型   | 备注 |
| ---- | ---- | -------- |
|league|string|英超|
| matchId | string  | |
| start| longlong||
| end |longlong||
| radiant  | Team  | 左边的队伍|
| dire | Team  | 右边的队伍|
| radiantScore  | Score  | |
| direScore | Score  | |



## BetCategory

| 参数   | 类型   | 备注 |
| ---- | ---- | -------- |
| name | string  | 全赛 or 半场 or 总进球... |
| tradingFee| string | 交易费(后台返回全文案)|
|  serviceFee| string |手续费(后台返回全文案) |
|  items| Array([BetItem]) |   |

## BetItem

| 参数   | 类型   | 备注 |
| ---- | ---- | -------- |
|betId|string||
| name | string  | 下注项目名字 |
|returnRate|double| 0.1245 |
|left|string|0时前台显示已买满 |


## Order

| 参数   | 类型   | 备注 |
| ---- | ---- | -------- |
|match| [Match]||
|orderTime|longlong||
|stake|string|下注金额|
|profit|string|利润金额|
|tradingFee|string|转账费|
|serviceFee|string|手续费|
|authFee|string|确权费|
|win|string|总收款|



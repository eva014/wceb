/**
 * Created by Kael on 2018/4/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Checkbox,List} from 'antd-mobile'
import {Button} from "antd-mobile";
import {createABet} from "../../../../util/api/manage";
import {checkBetId} from "../action";

class AddOptions extends React.Component {
    createTestBets=()=>{
        const {betCategory,matchId}=this.props;
        const {betCategoryId}=betCategory;
        if(betCategory&&betCategoryId&&matchId){
            const bets=[{
                name:'0-0',
                returnRate:0.8,
                stock:0,
            },{
                name:'0-1',
                returnRate:0.9,
                stock:0,
            },{
                name:'1-0',
                returnRate:1,
                stock:0,
            },{
                name:'1-1',
                returnRate:1.1,
                stock:0,
            }];
            (async ()=>{
                for(const bet of bets){
                    await createABet(matchId,betCategoryId,bet);
                }
                return true;
            })().then(res=>{
                location.reload()
            })
        }


    };


    render() {
        const {betCategory,gameState,checkPool} = this.props;
        if(!betCategory){
            return null;
        }
        const {categoryName,items}=betCategory;

        return (
            <div>
                <div>{categoryName}</div>
                {
                    items&&items.length===0?
                        <Button style={{marginTop: 4, marginLeft: 4, width: '80%'}} onClick={this.createTestBets}>
                            Test Create Bets
                        </Button>:
                        <div>
                            {items.map((bet,index)=>{
                                if(gameState===2){
                                    const {betItemId}=bet;
                                    const checked=!!checkPool[betItemId]
                                    return <List>
                                        <Checkbox.CheckboxItem key={index}
                                                               checked={checked}
                                                               onChange={(e) => {
                                                                   console.log(e)
                                                                   const {checkBetId}=this.props;
                                                                   checkBetId(betItemId,e.target.checked)
                                                               }}>
                                            <div>
                                                {
                                                    bet.name
                                                }
                                            </div>
                                        </Checkbox.CheckboxItem>
                                    </List>
                                }

                                return <div key={index}>
                                    {
                                        bet.name
                                    }

                                </div>
                            })}
                        </div>
                }

            </div>

        )
    }
}

const mapStateToProps = state => {
    const {betCategories,game,gameState,checkPool} = state;
    const {matchId}=game;
    return {betCategories,matchId,gameState,checkPool}
}

const mapDispatchToProps = {checkBetId}

export default connect(mapStateToProps, mapDispatchToProps)(AddOptions)

/**
 * Created by Kael on 2018/4/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {} from 'antd-mobile'
import {Button} from "antd-mobile";
import {createACategory} from "../../../../util/api/manage";
import AddOptions from "./AddOptions";

class AddCategories extends React.Component {
    createTestBetCategories=()=>{
        const {matchId}=this.props;
        const categoriesNames=['上半场','下半场','全场'];
        (async ()=>{
            for(const name of categoriesNames){
                await createACategory(matchId,name);
            }
            return true;
        })().then(res=>{
            location.reload()
        })
    };


    render() {
        const {betCategories} = this.props;
        if(!betCategories){
            return null
        }
        if(betCategories.length===0){
            return  <Button style={{marginTop: 4, marginLeft: 4, width: '80%'}} onClick={this.createTestBetCategories}>
                Test Create Categories
            </Button>
        }
        return (
            <div style={{marginTop:20}}>
                {
                    betCategories.map((betCategory,index)=>{
                        return <AddOptions key={index} betCategory={betCategory}/>
                    })
                }
            </div>

        )
    }
}

const mapStateToProps = state => {
    const {betCategories,game} = state;
    const {matchId}=game;
    return {betCategories,matchId}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategories)

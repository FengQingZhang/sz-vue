import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//1.state ：创建初始化状态
const state ={
    count:1,
    tabList:[]
}
//2.mutations:创建改变状态的方法
const mutations ={
    //状态变更函数一般大写
    ADD(state,n){
        state.count +=n;
    },
    ADDTAB(state,data){
        state.tabList.push(data);
    },
    CLEARTAB(state){
        state.tabList=[];
    }
}
//3. getter: 提供外部获取state
const gettes={
    count:function(state){
        return state.count;
    },
    getTabList(state){
        return state.tabList;
    }
}
// actions:创建驱动方法改变mutations
const actions = {
    //触发mutations中相应的方法一般小写
    add({commit},data){
        commit('ADD',data);
    },
    addTab({commit},data){
        commit('ADDTAB',data);
    },
    clearTab({commit}){
        commit('CLEARTAB');
    }
}
const store = new Vuex.Store({
    state,
    mutations,
    gettes,
    actions
})
export default store;
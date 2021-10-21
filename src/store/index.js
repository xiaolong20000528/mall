import {createStore} from "vuex"
const store=createStore({
  state:{
     cartList:[]
  },
  getters:{

  },
  mutations:{
    addCart(state,payload){
      state.cartList.push(payload);
    }
  },
  actions:{

  },
  modules:{

  }
})

export default store;
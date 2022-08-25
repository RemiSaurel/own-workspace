// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        itemsFinished: [],
        colorSelected: ""
    },
    getters: {
        itemsFinished(state) {
            return state.itemsFinished;
        },
        colorSelected(state) {
            return state.colorSelected;
        }
    },
    mutations: {
        addItemFinished(state, item) {
            state.itemsFinished.push(item);
        },
        setColorSelected(state, color) {
            state.colorSelected = color;
        }
    },
    actions: {
    }
});

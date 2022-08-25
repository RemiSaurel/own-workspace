// store/index.js


import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        itemsFinished: [],
        colorSelected: "",
        nbSessions: 0
    },
    getters: {
        itemsFinished(state) {
            return state.itemsFinished;
        },
        colorSelected(state) {
            return state.colorSelected;
        },
        nbSessions(state) {
            return state.nbSessions;
        }
    },
    mutations: {
        addItemFinished(state, item) {
            state.itemsFinished.push(item);
        },
        setColorSelected(state, color) {
            state.colorSelected = color;
        },
        setNbSessions(state) {
            state.nbSessions++;
        }
    },
    actions: {
    }
});

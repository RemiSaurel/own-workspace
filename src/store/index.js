// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        itemsFinished: [],
        colorSelected: "",
        nbSessions: 0,
        globalState: {
            currentItems: localStorage.getItem("currentItems") ? localStorage.getItem("currentItems") : JSON.stringify([]),
            nbItemsFinished: localStorage.getItem("nbItemsFinished") ? localStorage.getItem("nbItemsFinished") : 0,
            nbSessions: localStorage.getItem("nbSessions") ? localStorage.getItem("nbSessions") : 0,
            lastSong: localStorage.getItem("lastSong") ? localStorage.getItem("lastSong") : "XDh0JcxrbPM",
            currentSongIndex: localStorage.getItem("currentSongIndex") ? localStorage.getItem("currentSongIndex") : 0,
            themeColor: localStorage.getItem("themeColor") ? localStorage.getItem("themeColor") : "#fdde95",
        }
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
        },
        globalState(state) {
            return state.globalState;
        }
    },
    mutations: {
        addItemFinished(state, item) {
            state.itemsFinished.push(item);
        },
        setColorSelected(state, color) {
            state.colorSelected = color;
        },
        updateNbSessionsFinished(state) {
            state.nbSessions++;
        },
        resetStats(state) {
            state.globalState.nbItemsFinished = 0;
            state.globalState.nbSessions = 0;
        }
    },
    actions: {
    }
});

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { List } from 'ant-design-vue';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        packageList: [],
        // package: {},
    },
    getters: {
        getAllPackage(state) {
            console.log(4653235623);
            return state.packageList;
        },

    },
    mutations: {
        addPackage(state, newPackage) {
            let temp = [];
            state.packageList.forEach(element => {
                temp.push(element)
            });
            temp.push(newPackage);
            state.packageList = temp;
        },

        setPackageList(state) {


            // axios.get(`/cargoPackage`)
            //     .then(this.packageList = response.data)
            //     .catch(e => { this.errors.push(e) });

        },
        updatePackageList() {
            axios.post(`/`, {});
        }



    },
    actions: {

    }
})
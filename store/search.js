import { defineStore } from "pinia";
import http from 'http'

export const useSearchStore = defineStore('search',{
    state: () => {
        return{
            searchId: '',
            floorNum: 0,
        }
    },
});

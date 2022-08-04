import { defineStore } from "pinia";

export const useSearchStore = defineStore('search',{
    state: () => {
        return{
            searchId: '',
            floorNum: 0,
            navigation: false
        }
    },
});

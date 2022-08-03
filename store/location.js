import {defineStore} from "pinia";

export const useLocationStore = defineStore('location', {
    state: () => {
        return {
            locationX: 0,
            locationY: 0,
            callBackId: 0,
        }
    }
});

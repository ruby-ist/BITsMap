import {defineStore} from "pinia";

export const useDetailsBoxStore = defineStore('detailsBox', {
    state: () => {
        return {
            showBox: false,
            directionBox: false
        }
    }
});

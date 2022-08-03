import {defineStore} from "pinia";

export const useDirectionStore = defineStore('direction', {
    state: () => {
        return{
            directionTrigger: 0,
            fromId: "",
            toId: "",
            top: 0,
            left: 0,
            locationUsed: false,
        }
    },
    actions: {
        findRoute(){
            this.directionTrigger++;
        }
    }
});

import {defineStore} from "pinia";

export const useDirectionStore = defineStore('direction', {
    state: () => {
        return{
            directionTrigger: 0,
            fromId: "",
            fromName: "",
            toId: "",
            toName: "",
            myTop: 0,
            myLeft: 0,
            pinTop: 0,
            pinLeft: 0,
            locationUsed: false,
        }
    },
    actions: {
        findRoute(){
            this.directionTrigger++;
        }
    }
});

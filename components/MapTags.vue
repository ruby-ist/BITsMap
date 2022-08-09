<template>
    <div>
        <div v-for="tag in tags">
            <div :id="tag['id']" :style="{ top: tag['top'], left: tag['left'] }" class="tag"
                 @click="getDetails(tag['id'])">
                {{ tag["name"] }}
            </div>
        </div>

        <div v-show="details !== {}">
            <ShowBox :details="details" ref="showBox"/>
        </div>
    </div>
</template>

<script>
import {mapWritableState} from "pinia";
import {useDetailsBoxStore} from "@/store/detailsBox";

export default {
    props: ['level'],
    data() {
        return {
            tags: [],
            details: {}
        }
    },
    computed: {
        ...mapWritableState(useDetailsBoxStore, ['showBox'])
    },
    methods: {
        async getTags(level) {
            let response = await this.$http.$get(`https://geobits.herokuapp.com/map/tags/${this.level}`);
            this.tags = await response["tags"];
        },

        async getDetails(id) {
            this.details = await this.$http.$get(`https://geobits.herokuapp.com/map/details/${id}?level=${this.level}`);
            this.showBox = true;
        },
    },

    watch: {
        level(num) {
            this.getTags();
        }
    },

    mounted() {
        this.getTags();
    }
}
</script>

<style scoped>
.tag {
    position: absolute;
    font-weight: 400;
    font-size: 1rem;
    text-align: center;
    color: white;
    text-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;
    font-family: 'Inter', sans-serif;
    width: 60px;
    text-wrap: normal;
    z-index: 1;
    cursor: pointer;
}
</style>

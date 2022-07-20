<template>
    <div id="main" class="ui secondary menu">

        <a class="item ui huge header">
            GeoBITs
        </a>
        <div class="right menu">
            <div class="item">
                <SearchBar @custom="customHandler" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["find"],
    methods: {
        customHandler(id, f_no){
            this.$emit('find', id, f_no);
        }
    }
}
</script>

<style lang="scss" scoped>
#main {
    position: fixed;
    top: 0;
    z-index: 4;
    width: 103vw;
    height: 10vh;
    background: #EAF6F6;
    display: flex;
    border-bottom: 1px solid #16A89D;

    .header {
        color: #16A89D !important;
        padding-left: 6vw;
        background: transparent;
        font-weight: 600;
    }
}

</style>

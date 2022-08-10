<template>
    <div id="main" class="dark">
        <Nuxt keep-alive/>
    </div>
</template>

<script>
export default {
    mounted() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            let main = $('#main');
            if(event.matches){
                main.removeClass('light')
                main.addClass('dark');
            }
            else{
                main.removeClass('dark')
                main.addClass('light');
            }
        });
    }
}
</script>

<style lang="scss">
    :root{
        color-scheme: light dark;
    }

    .dark{
        --nav-background: #262626;
        --nav-border: #116CFF;
        --nav-bottom: #262626;
        --nav-placeholder: #116CFF;
        --nav-text: #757575;
        --nav-success-text: #116CFF;
        --nav-btn-bg: #116CFF;

        --compass: #116CFF;
        --compass-shadow: #000000;
        --button-background: #262626;
        --button-icon: #116CFF;

        --box-border: 4px;
        --box-background: #262626;
        --box-primary: #116CFF;
        --box-secondary: #757575;
        --box-menu-line: #75757555;
        --segment-border: #757575;
        --segment-shadow: #333335;

        --suggestion-bg: #F2F2F5;
        --selected: #B6D3F7;

        --tag-initial: #7a88ef;
        --tag-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;

        .tag:nth-child(2n){
            color: #ee9a25
        }

        .tag:nth-child(3n){
            color: #f27025;
        }

        .tag:nth-child(4n){
            color: #ab765e;
        }

        .tag:nth-child(5n){
            color: #d36db8;
        }

        .tag:nth-child(6n){
            color: #ed5d69;
        }

        .tag:nth-child(7n){
            color: #a083ff;
        }

        .tag:nth-child(8n){
            color: #35a470;
        }

        .tag:nth-child(9n){
            color: #419dd3;
        }

        .tag:nth-child(10n){
            color: #5a91fe;
        }
    }

    .light {
        --nav-background: #333335;
        --nav-border: #757575;
        --nav-bottom: #757575;
        --nav-placeholder: #757575;
        --nav-text: #757575;
        --nav-success-text: #116CFF;
        --nav-btn-bg: #116CFF;

        --compass: #262626;
        --compass-shadow: #FFFFFF;
        --button-background: #116CFF;
        --button-icon: #B6D3F7;

        --box-border: 6px;
        --box-background: #F2F2F5;
        --box-primary: #356dfa;
        --box-secondary: #757575;
        --box-menu-line: #75757555;
        --segment-border: #757575;
        --segment-shadow: #757575;

        --suggestion-bg: #F2F2F5;
        --selected:  #B6D3F7;

        --tag-initial: #ffffff;
        --tag-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;
    }

    body{
        background-color: var(--compass-shadow);
    }
</style>
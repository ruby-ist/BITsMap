export default {
    ssr: false,

    target: 'static',

    head: {
        title: 'GeoBITs',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=0"},
            {
                hid: "description",
                name: "description",
                content: "GeoBITs is an online map covering all the places and classes in Bannari Amman Institute of Technology. The idea was to help new students to get familiar with college campus and provide an overview of which department is where. The map have two layers, SVG and satellite, and four different zoom levels, you can double tap to zoom in the map. Searching functionality in the map can help the students to find the exam halls and venues of their special classes as it is frequently changing. Hope it helps to navigate the campus and saves your time"
            },
            {name:"color-scheme", content:"dark light"}
        ],
        link: [
            {
                rel: "stylesheet",
                type: "text/css",
                href: "https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/semantic.min.css"
            },
            {rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/tab.min.css"},
            {rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/popup.min.css"},
            {rel: "stylesheet",  href:"https://fonts.googleapis.com/css2?family=Yeon+Sung&family=Nunito+Sans:wght@300;400;500&family=Inter&family=Quicksand:wght@400;500;600&family=Overlock&family=Special+Elite&display=swap"}
            ],
        script: [
            {src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"},
            {src: "https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/semantic.min.js"},
            {src: "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/tab.min.js"},
            {src: "https://hammerjs.github.io/dist/hammer.min.js"},
            {src: "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/popup.min.js"}
        ]
    },

    modules: [
        '@nuxt/http'
    ],

    buildModules: [
        '@nuxtjs/composition-api/module',
        '@pinia/nuxt'
    ],

    http: {
        proxy: true
    },

    server: {
        port: 3000,
        host: '0.0.0.0'
    },

    components: true
}

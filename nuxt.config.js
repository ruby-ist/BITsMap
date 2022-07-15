export default {
  ssr: false,

  target: 'static',

  head: {
    title: 'GeoBITs',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "GeoBITs is an online map covering all the places and classes in Bannari Amman Institute of Technology. The idea was to help new students to get familiar with college campus and provide an overview of which department is where. The map have two layers, SVG and satellite, and four different zoom levels, you can double tap to zoom in the map. Searching functionality in the map can help the students to find the exam halls and venues of their special classes as it is frequently changing. Hope it helps to navigate the campus and saves your time"}
    ],
    link: [
      { rel: "stylesheet", type: "text/css", href: "https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/semantic.min.css" }
    ],
    script: [
      { src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/semantic.min.js"}
    ]
  },

  modules: [
    '@nuxt/http',
  ],

  http: {
    proxy: true
  },

  components: true,
}

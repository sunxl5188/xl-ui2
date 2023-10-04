import speakTts from './src/main.vue'
;(speakTts as any).install = (Vue: any): void => {
  Vue.component((speakTts as any).extendOptions.name, speakTts)
}

export default speakTts

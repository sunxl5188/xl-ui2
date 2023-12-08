<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Speech from 'speak-tts'

let speech: any = null

@Component({
  name: 'XlSpeakTts',
  components: {}
})
export default class XlSpeakTts extends Vue {
  @Prop({
    default: '您有新订单，请注意查看'
  })
  readonly text!: string

  private created() {
    speech = new Speech()
    if (speech.hasBrowserSupport()) {
      speech
        .init({
          volume: 1, // 音量
          lang: 'zh-CN', // 语言
          rate: 1, // 语速
          pitch: 1, // 音调
          splitSentences: true, // 在句子结束时暂停
          listeners: {
            // 事件
            onvoiceschanged: (voices: object) => {
              // console.log('事件声音已更改', voices);
            }
          }
        })
        .then((data: object) => {
          //console.log('语音已准备好，声音可用')
        })
        .catch((e: object) => {
          console.error('初始化时发生错误 : ', e)
        })
    } else {
      console.error('不支持语音合成')
    }
  }

  //调用方法播放声音
  public handleSpeech() {
    console.log('播报')
    speech.speak({ text: this.text })
  }
}
</script>

<style scoped></style>

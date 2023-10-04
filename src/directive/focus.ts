export default {
  inserted(el: any) {
    setTimeout(() => {
      el.children[0].focus()
    }, 0)
  }
}

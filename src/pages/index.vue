<template>
  <div class="mainBox">
    lol
  </div>
</template>
<script>
import { getAllHeroes } from '@/api'
export default {
  data () {
    return {
      msg: 'hello'
    }
  },
  methods: {
    getHeroes () {
      getAllHeroes({}).then(res => {
        console.log(res, 'res')
      })
    }
  },
  mounted () {
    this.getHeroes()
  }
}
</script>
<style scoped>
.mainBox {
  /* background: url('../../static/index.jpg'); */
  width: 100vw;
  height: 100vh;
}
</style>

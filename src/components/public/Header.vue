<template>
  <div class="header">
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
    <span>{{getCurUser}}</span>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'Header',
    data () {
      return {

      }
    },
    computed:{
      ...mapGetters('user',['getCurUser']),
    },
    methods:{
      ...mapActions('user',{
        setCurUsr: 'setCurUsr'
      }),
      changeIndexData(newData){
        this.setCurUsr(newData)
      }
    },
    created(){
      let axiosData = 'guest';
      this.changeIndexData(axiosData)
    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header{
  height: 60px;
}

</style>

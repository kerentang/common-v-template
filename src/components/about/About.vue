<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'About',
    data () {
      return {
        msg: 'i am about page'
      }
    },
    computed:{
      ...mapGetters(['getIndexData']),
      ...mapGetters('config',['getBaseData']),
      ...mapGetters('user',['getCurUser']),
    },
    methods:{
      ...mapActions({
        setIndexData: 'setIndexData'
      }),
      ...mapActions('config',{
        setBaseData: 'setBaseData'
      }),
      ...mapActions('user',{
        setCurUsr: 'setCurUsr'
      }),
      changeIndexData(newData){
        this.setIndexData(newData)
      }
    },
    created(){
      let axiosData = 'i am from axios to about';
      this.changeIndexData(axiosData)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import  "../../myStyle/index";
  h1{
    font-weight: normal;
  }
</style>

<template>
  <div class="footer">
    {{msg}}
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'Footer',
    data () {
      return {
        msg:'i am footer'
      }
    },
    computed:{

    },
    methods:{

    },
    created(){

    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .footer{
    height: 60px;
  }

</style>

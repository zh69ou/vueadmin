<template>
<div class="container">
	<view3d :images="bgimg" style="height:300px;"></view3d>
</div>
</template>
<script>
	import view3d from '~/components/view360.vue'
	import('~/assets/img/test.jpg')
export default {
  name: 'login',
  components:{
	view3d,
  },
  data() {
    return {
    	// bgimg:'/static/img/test.jpg'
    	bgimg:'http://test.kodo.esports168.com/os360.jpg'
    }
  },
  mounted() {
  },
}
</script>
<style scoped type="text/css" lang="scss">
	@import "~/config/pub.scss";
	.container{
		img{
			width: 100%;
		}
	}
</style>
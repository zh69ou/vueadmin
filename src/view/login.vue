<template>
<div class="container">
	<view3d :images="imglist"></view3d>
</div>
</template>
<script>
	import view3d from '~/components/img360.vue'
	[...Array(13)].map((_img,i)=>import('~/assets/img/'+(i+1)+'.png'))
	// const loadimg = ()=> [...Array(13)].map((_img,i)=>require('../assets/img/'+(i+1)+'.png'))
	const loadimg = ()=> {
		return [...Array(13)].map((_img,i)=>`/static/img/${i+1}.png`)
	}
export default {
  name: 'login',
  components:{
	view3d,
  },
  data() {
    return {
    	imglist:loadimg()
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
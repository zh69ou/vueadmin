<template>
<div class="container">
	<view3d></view3d>
</div>
</template>
<script>
	import view3d from '~/components/view3d.vue'
export default {
  name: 'login',
  components:{
	view3d,
  },
  data() {
    return {
    }
  },
  mounted() {
  },
}
</script>
<style scoped type="text/css" lang="scss">
	@import "~/config/pub.scss";
</style>
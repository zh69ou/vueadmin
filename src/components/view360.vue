<template>
  <div :id="domid" class="img-spinner" ref="contentbox"></div>
</template>
<script>
// import 'three'
import {Viewer} from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
export default {
  name: "View360",
  props: ["images"],
  data() {
    return {
      domid:'box360'
    };
  },
  created() {
  },
  mounted(){
    if(this.images){
      this.init()
    }
  },
  watch:{
    images:(nv,ov)=>{
      if(nv){
        this.init()
      }
    }
  },
  methods: {
    init(){
      let _this = this
      if(_this.images){
        new Viewer({
          container:document.getElementById(_this.domid),
          panorama:_this.images,
          size:{
            width:'100%',
            height:'300'
          },
          navbar:false
        })
      }
    }
  }
};
</script>
<style scoped type="text/css" lang="scss">
</style>
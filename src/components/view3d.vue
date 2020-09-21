<template>
  <div ref="showbox"></div>
</template>
<script>
  import * as THREE from 'three'
  export default {
    name: "view3d",
    components:{},
    data(){
      return{
        scene:null, //场景
        camera:null,  //相机
        renderer:null,  //渲染器
        cameraangle:45, //相机角度
        cameralwratio:window.innerWidth/window.innerHeight, //相机长宽比
        minsize:0.1,  //相机近距离
        maxsize:1000,   //相机远距离
      }
    },
    created(){
      let _this = this
      _this.$nextTick(()=>{
        _this.init()
      })
    },
    methods:{
      init(){
        let _this = this
        _this.scene = new THREE.Scene
        _this.camera = new THREE.PerspectiveCamera(_this.cameraangle,_this.cameralwratio,_this.minsize,_this.maxsize)
        _this.camera.position.x = -20
        _this.camera.position.y = 40
        _this.camera.position.z = 30
        _this.camera.lookAt(_this.scene.position)

        _this.renderer = new THREE.WebGLRenderer({antialias:true})
        _this.renderer.setSize(window.innerWidth,window.innerHeight-100)

        let axes = new THREE.AxisHelper(20) //坐标轴
        _this.scene.add(axes)

        let spotLight = new THREE.SpotLight(0xffffff)
        spotLight.position.set(-40,60,-10)
        spotLi

        _this.$refs.showbox.append(_this.renderer.domElement)
      }
    }
  }
</script>
<style lang="scss">

</style>
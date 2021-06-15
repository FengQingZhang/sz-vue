<template>
  <div style="width:100%">
  <div class="container" id="container" style="z-index:1;"></div>
  </div>
</template>
<script>
import AMap from 'AMap'
export default {
  name: "main",
  data() {
    return {
      center: [116.397428, 39.90923],
      zoom: 15,
      label: {
        content: "自定义标题",
        offset: [10, 12],
      },
      map:null,
      district:null,
      
    };
  },
  methods: {
    initMap() {
      let that = this;
      this.map = new AMap.Map('container',{
        center:that.center,
        resizeEnable:true,
        mapStyle:"amap://styles/9646e2516f7f886399c1dffc1f6a8e53",
        zoom:that.zoom,
      })
      this.drawBounds();
    },
    drawBounds(){
      var that = this;
      //加载行政区划插件
      if(!that.district){
        //实例化DistrictSearch
        var opts ={
          subdistrict:0,//获取边界不需要返回下级行政区
          extensions:"all",//返回行政区边界坐标组等具体信息
          level:"city"//查询行政级别为 市
        }
        that.district = new AMap.DistrictSearch(opts);
      }
      //行政区查询
      that.district.setLevel('province');
      that.district.search('北京市',function(status,result){
        var polygons=[];
        let bounds = result.districtList[0].boundaries;
        if(bounds){
          for(let i=0,l=bounds.length;i<l;i++){
            var polygon = new AMap.Polygon({
              strokeWeight:1,
              path:bounds[i],
              fillOpacity:0.4,
              fillColor:'#0E0E30',
              strokeColor:'#0091ea'
            })
            polygons.push(polygon)
          }
        }
        that.map.add(polygons);
        that.map.setFitView(polygons)
      })
    },
  },
  mounted(){
    this.initMap();
    // setTimeout(() => {
    //   this.drawBounds();
    // }, 200);
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height:100%;
}
</style>
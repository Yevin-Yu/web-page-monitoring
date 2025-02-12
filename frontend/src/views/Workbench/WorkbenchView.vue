<template>
  <div class="work-bench">
    <div id="map-container"></div>
    <div class="his-line">
      <LineHisView />
    </div>
    <div class="pie-chart">
      <ThreeDPieView />
    </div>
    <div class="read-book-view">
      <ReadBookView />
    </div>
    <div class="rader-view">
      <RaderView />
    </div>
  </div>

</template>
<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { ref, onMounted } from 'vue'
import LineHisView from './LineHisView.vue';
import ThreeDPieView from './ThreeDPieView.vue';
import ReadBookView from './ReadBookView.vue';
import RaderView from './RaderView.vue';
const initMap = () => {
  AMapLoader.load({
    key: "a746947369b56c4abbadd27235900e86",
    version: "2.0",
    plugins: [],
    Loca: {
      "version": '2.0.0'
    },
  }).then((AMap) => {
    var map = new AMap.Map('map-container', {
      zooms: [4, 8],
      zoom: 4.5,
      showLabel: false,
      viewMode: '3D',
      center: [105.425968, 35.882505],
      mapStyle: 'amap://styles/dark',
    });

    var loca = new Loca.Container({
      map,
      opacity: 1,
    });

    var geo = new Loca.GeoJSONSource({
      url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/cuisine.json',
    });

    var pl = window.pl = new Loca.PointLayer({
      zIndex: 10,
      blend: 'lighter',
    });

    var style = {
      radius: 3.5,
      unit: 'px',
      color: '#40E2F7',
      borderWidth: 0,
      blurWidth: 3.5,
    }
    pl.setSource(geo);
    pl.setStyle(style);
    loca.add(pl);

    pl.addAnimate({
      key: 'radius',
      value: [0, 1],
      duration: 500,
      easing: 'Linear',
      transform: 2000,
      random: true,
      delay: 8000,
      yoyo: true,
      repeat: 100000
    });
  }).catch(e => {
    console.error(e);
  })
}
onMounted(() => {
  initMap();
});
</script>
<style lang="less" scoped>
.work-bench {
  width: 100%;
  height: 100%;
  position: relative;

  #map-container {
    width: 100%;
    height: 100%;
  }

  .his-line {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40%;
    height: 45%;
  }
  .pie-chart{
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 40%;
    height: 45%;
  }
  .read-book-view{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40%;
    height: 45%;
  }
  .rader-view{
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 40%;
    height: 45%;
  }
}
</style>
<template>
  <div ref="threeDChart" class="three-d-chart"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount } from 'vue'
const threeDChart = ref()
let myChart
const init = function () {
  if (threeDChart.value) {
    myChart = echarts.init(threeDChart.value);
    let option = {
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 274, name: 'Union Ads' },
            { value: 235, name: 'Video Ads' },
            { value: 400, name: 'Search Engine' }
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#40E2F7',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    }
    myChart.setOption(option);
  }
}
const resizeChart = () => {
  if (myChart) {
    myChart.resize();
  }
};

onMounted(() => {
  init()
  window.addEventListener('resize', resizeChart);
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart);
  if (myChart) {
    myChart.dispose(); // 销毁图表实例，释放资源
  }
});
</script>
<style lang="less" scoped>
.three-d-chart {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div ref="linHisChart" class="line-his-chart">
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';
const linHisChart = ref()
let myChart
const init = function () {
  if (linHisChart.value) {
    myChart = echarts.init(linHisChart.value);
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      // legend: {
      //   data: ['Evaporation', 'Precipitation', 'Temperature']
      // },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Precipitation',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          },
        },
        {
          type: 'value',
          name: 'Temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: 'Evaporation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ],
          itemStyle: {
            borderRadius: [5, 5, 5, 5],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#195292" }, { offset: 1, color: "#0197A1" }
            ])
          }
        },
        {
          name: 'Precipitation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          ],
          itemStyle: {
            borderRadius: [5, 5, 5, 5],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#0372FB" }, { offset: 1, color: "#92C3FF" }
            ])
          }
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' °C';
            }
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          itemStyle: {
            color: '#1BD4E7'
          }
        }
      ]
    };
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
.line-his-chart {
  width: 100%;
  height: 100%;
}
</style>
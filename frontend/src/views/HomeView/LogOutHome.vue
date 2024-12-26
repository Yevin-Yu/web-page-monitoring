<template>
  <div class="logout-main">
    <div class="main-content">
      <p class="main-title">Frontend Analytics Platform</p>
      <div class="use-item">
        <div class="use-item-one"><mainLogo class="main-logo" /><span>实时流量监控<br/>Real-time Traffic Monitoring</span></div>
        <div class="use-item-one"><mainLogo class="main-logo" /><span>用户行为分析<br/>User Behavior Analysis</span></div>
        <div class="use-item-one"><mainLogo class="main-logo" /><span>热度分析<br/>Heatmaps and Clickmaps</span></div>
        <div class="use-item-one"><mainLogo class="main-logo" /><span>A/B 测试与实验管理<br/>A/B Testing and Experiment Management</span></div>
        <div class="use-item-one"><mainLogo class="main-logo" /><span>性能监测<br/>Performance Monitoring</span></div>
        <div class="use-item-one"><mainLogo class="main-logo" /><span>用户分群与个性化<br/>User Segmentation and Personalization</span></div>
        <div class="use-item-one"><mainLogo class="main-logo" /><span>报告与导出<br/>Reporting and Exporting</span></div>
        <div class="use-item-one"><mainLogo class="main-logo" /><span>API集成与扩展<br/>API Integration and Extensibility</span></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import mainLogo from '@/assets/images/mainLogo.vue';
</script>
<style lang="less" scoped>
.logout-main {
  width: 100%;
  height: 100%;
  background: url(@/assets/images/earth.png) no-repeat -40% 43%;
  background-size: 58% 73%;
  display: flex;
  justify-content: end;

  .main-content {
    padding-top: 100px;
    width: 50%;
    height: 100%;
    background: linear-gradient(45deg, #19ECFF, #fff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    .main-title {
      font-size: 3.5rem;
    }

    .use-item {
      margin-top: 40px;
      width: 100%;
      font-size: 1.2rem;
      display: grid;
      grid-template-columns: repeat(2,350px);
      grid-template-rows: repeat(4,140px);
      column-gap: 20px;
      .use-item-one {
        display: flex;
        height: 120px;
        background: #07455515;
        border: 2px solid #042938;
        border-radius: 5px;
        .main-logo{
          width: 32px;
          height: 32px;
          margin: 20px 10px;
        }
        span{
          margin: 10px;
        }
      }
    }
  }
}
</style>
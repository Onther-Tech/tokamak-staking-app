<template>
  <view class="power-layout">
      <view class="power-container">
      <text class="page-title">Win Power by staking TON</text>
      <text class="page-text"
        >Increase your chance of winning Power by</text>
        <text class="page-text page-text-last"
        >staking more TON.</text>
      </view>
      <winner-table class="table"/>
    </view>
</template>
<script>
import WinnerTable from "@/components/WinnerTable";
export default {
  components: {
    "winner-table": WinnerTable,
  },
  props: {
    navigation: {
      type: Object,
    },
  },
};
</script>
<style scoped>
.power-layout{ 
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAFBFC;

}
.power-container {
  flex: 1;
  align-self: stretch;
  display: flex;
  align-items: center;
  padding-top: 4.7%;
}
.page-title {
  font-size: 24px;
  color: #3e495c;
  font-weight: 700;
  margin-bottom: 2%;
}
.page-text {
  font-size: 12px;
  color: #86929d;
  text-align: center;
}

.table{
  /* margin-top: 26px; */
}
</style>

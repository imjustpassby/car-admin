<template>
  <div class="dashboard-container">
    <h1>优车助手汽车服务管理系统</h1>
    <div class="dashboard-quick">
      <div class="quick-func">
        <svg class="icon" aria-hidden="true" @click="push('/order/create-order')">
          <use xlink:href="#icon-gongdanguanli"></use>
        </svg>
        <router-link to="/order/create-order">创建订单</router-link>
      </div>
      <div class="quick-func">
        <svg class="icon" aria-hidden="true" @click="push('/storage/check-storage')">
          <use xlink:href="#icon-peijianjisong"></use>
        </svg>
        <router-link to="/storage/check-storage">库存盘点</router-link>
      </div>
      <div class="quick-func">
        <svg class="icon" aria-hidden="true" @click="push('/customers/cus-info')">
          <use xlink:href="#icon-icons-man-in-white-"></use>
        </svg>
        <router-link to="/customers/cus-info">会员资料</router-link>
      </div>
      <div class="quick-func">
        <svg class="icon" aria-hidden="true" @click="push('/report/report-finance')">
          <use xlink:href="#icon-balance"></use>
        </svg>
        <router-link to="/report/report-finance">收支情况</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
  computed: {
  },
  methods: {
    push(path) {
      this.$router.push({path:`${path}`});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$hoverblue: #1890ff;
$quick: #2c2c2c;
.dashboard {
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  &-container {
    margin: 20px;
    h1 {
      font-family: "weiruan";
      color: $quick;
      font-size: 36px;
      font-weight: 100;
      border-bottom: 1px solid $quick;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
    }
  }

  &-quick {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-end;
    .quick-func {
      width: 200px;
      height: 300px;
      padding: 20px;
      margin-top: 7%;
      border: 2px solid $quick;
      border-radius: 10px;
      font-size: 28px;
      text-align: center;
      &:hover {
        border: 1px solid $hoverblue;
        color: $hoverblue;
      }
    }
    svg {
      display: block;
      width: 120px;
      height: 120px;
      margin: 36px auto;
      cursor: pointer;
    }
    a {
      font-family: 'weiruan';
      line-height: 1;
      position: relative;
    }
    a::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      border-bottom: 2px solid $hoverblue;
      transition: 0.2s all linear;
      -webkit-transition: 0.2s all linear;
    }
    a:hover::before {
      width: 100%;
      left: 0;
      transition-delay: 0.1s;
      -webkit-transition-delay: 0.1s;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

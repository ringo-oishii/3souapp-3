<template>
    <div>
      <h1>{{ shop.name }}</h1>
      <p>ここにお店の詳細情報を表示します。</p>
      <router-link to="/">戻る</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        shop: null
      };
    },
    created() {
      const shopId = this.$route.params.id;
      const shop = this.$root.$data.shops.find(s => s.id === parseInt(shopId));
      this.shop = shop || { name: 'お店が見つかりませんでした' };
    }
  };
  </script>
  
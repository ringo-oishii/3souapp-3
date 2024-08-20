<template>
  <div>
    <h1>Shop Details</h1>
    <p>ID: {{ item.ID }}</p>
    <p>Name: {{ item.Name }}</p>
    <p>Area: {{ item.Area }}</p>
    <p>Category: {{ item.Category }}</p>
    <!-- 詳細情報の表示 -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      item: {}
    };
  },

  async created() {
    const id = this.$route.params.id;
    try {
      const response = await axios.get(`https://m3h-ikari-functionapp729.azurewebsites.net/api/DETAIL/${id}`);
      this.item = response.data;
    } catch (error) {
      console.error("詳細情報の取得に失敗しました", error);
    }
  },
};
</script>

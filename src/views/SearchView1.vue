<template>
  <div id="app" data-app="true">
    <HeaderView />
    <main>
      <v-container fluid>
        <!-- 検索フォーム -->
        <v-row class="mb-3 mt-3" align="center" justify="center">
          <v-col cols="12">
            <div class="search-container">
              <h2 class="text-center">🔍 Search from favorite 🔍</h2>
              <v-row class="mb-3 mt-3" align="center" justify="center">
                <v-col cols="12" md="2"></v-col>
                <v-col cols="12" md="4">
                  <v-select
                    label="📍 エリアを選択…"
                    v-model="selectedArea"
                    :items="areas"
                    :menu-props="{ top: true, offsetY: true }"
                    class="custom-select"
                    filled
                    dense
                    color="#6389d1"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    label="🏷️ カテゴリーを選択…"
                    v-model="selectedCategory"
                    :items="categories"
                    :menu-props="{ top: true, offsetY: true }"
                    class="custom-select"
                    filled
                    dense
                    color="#6389d1"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2"></v-col>
              </v-row>
              <v-btn
                class="ma-2"
                color="#6389d1"
                dark
                large
                @click="performSearch"
              >
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </main>
    <FooterView />
  </div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';

export default {
  name: 'SearchView',
  components: {
    HeaderView,
    FooterView,
  },
  data() {
    return {
      selectedArea: '',
      selectedCategory: '',
      areas: ['表参道', '渋谷', '自由が丘'], // エリアの例
      categories: ['カフェ', 'ランチ', 'ディナー', 'パン'], // カテゴリーの例
    };
  },
  methods: {
    performSearch() {
      // クエリパラメータとしてエリアとカテゴリーを設定し、SearchResultsビューへ移動
      this.$router.push({
        name: 'search-results', // ルート名は一致させる
        query: {
          area: this.selectedArea,
          category: this.selectedCategory
        }
      });
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Yomogi', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5d5d63;
}
</style>

<template>
  <div id="app" data-app="true">
    <HeaderView />
    <main>
      <v-container fluid>
        <v-row class="mb-3 mt-3" align="center" justify="center">
          <!-- 検索フォーム -->
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
      categories: ['カフェ', 'ランチ', 'ディナー', 'パン'],// カテゴリーの例
    };
  },

  computed: {
    // フィルタリングされた結果を返す
    filteredResults() {
      return this.dataList.filter((item) => {
        // 選択されたエリアとカテゴリーに基づいてフィルタリング
        const matchArea = this.selectedArea
          ? item.Area === this.selectedArea
          : true;
        const matchCategory = this.selectedCategory
          ? item.Category === this.selectedCategory
          : true;
        return matchArea && matchCategory;
      });
    },
  },

  methods: {
    performSearch() {
      // 検索条件をクエリパラメータにして検索結果ページにナビゲート
      this.$router.push({
        path: "/search-results",
        query: {
          area: this.selectedArea,
          category: this.selectedCategory,
        },
      });
    },
  },
};

  


  </script>

<style>

  .search-container {
    padding: 16px;
  }

  .text-center {
    margin: 15px 0;
  }

  .custom-select {
    background-color: #fff;
    padding: 8px;
  }
  
  .no-results {
    text-align: center;
    margin-top: 16px;
  }
  
  .ma-2 {
    margin:20px 0;
  }

  @media (max-width: 1200px) {
  .search-container {
    padding: 12px;
  }
  .search-button {
    font-size: 16px;
  }
}

  </style>
  
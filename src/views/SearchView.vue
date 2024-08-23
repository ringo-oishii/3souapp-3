<template>
  <div id="app" data-app="true">
    <HeaderView />
    <main>
      <section>
        <v-container fluid>
        <!-- 検索フォーム -->
          <v-row class="mb-3 mt-3" 
          align="center" 
          justify="center"
          no-gutters
          >
          <v-col 
            cols="12"
            class="d-flex flex-column align-center"
          >
            <div class="search-container">
              <h2 class="text-center">🔍 Search from favorite 🔍</h2>

              <v-select
                    label="📍 エリアを選択…"
                    :style="{ width: '400px' }"
                    v-model="selectedArea"
                    :items="areas"
                    :menu-props="{ top: true, offsetY: true }"
                    class="custom-select"
                    filled
                    dense
                    color="#6389d1"
                  ></v-select>

                  <v-select
                    label="🏷️ カテゴリーを選択…"
                    :style="{ width: '400px' }"
                    v-model="selectedCategory"
                    :items="categories"
                    :menu-props="{ top: true, offsetY: true }"
                    class="custom-select"
                    filled
                    dense
                    color="#6389d1"
                  ></v-select>

                  <v-btn
                class="button-search ma-2"
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
      </section>
    </main>
    <FooterView />
  </div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import axios from 'axios';
import { toKana } from 'wanakana'; 

export default {
  name: 'Search-View',
  components: {
    HeaderView,
    FooterView,
  },
  data() {
    return {
      selectedArea: '',
      selectedCategory: '',
      areas: [], // 初期値を空の配列に
      categories: [], // 初期値を空の配列
    };
  },

  created() {
    this.selectedAreas(); // コンポーネントが作成された時にエリアを取得
    this.selectedCategories(); // コンポーネントが作成された時にカテゴリーを取得
  },
  methods: {

    selectedAreas() {
      axios.get('https://m3h-ikari-functionapp729.azurewebsites.net/api/GetAreas')
        .then(response => {
          this.areas = response.data.sort((a, b) => {
          // 漢字をひらがなに変換してから比較
          const aKana = toKana(a);
          const bKana = toKana(b);
          return aKana.localeCompare(bKana, 'ja');
        });
      })        .catch(error => {
          console.error('エリアの取得に失敗しました:', error);
        });
    },
    selectedCategories() {
      axios.get('https://m3h-ikari-functionapp729.azurewebsites.net/api/GetCategories')
        .then(response => {
          this.categories = response.data.sort((a, b) => a.localeCompare(b, 'ja')); // あいうえお順にソート
        })
        .catch(error => {
          console.error('カテゴリーの取得に失敗しました:', error);
        });
    },

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

<style>
#app {
  font-family: 'Yomogi', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5d5d63;
}

.text-center {
  margin-bottom: 50px;
}

.no-results {
  text-align: center;
  margin-top: 16px;
}

.custom-select {
  cursor: pointer;
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-search {
  margin-top: 16px;
}

</style>

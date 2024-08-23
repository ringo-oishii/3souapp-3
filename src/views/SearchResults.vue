<template>
  <div id="app">
    <HeaderView />
    <main>
      <v-container>
        <section>
          <div class="search-contents">
            <h2>⭐ Let's go ⭐</h2>
            <!-- ローディング中のメッセージを表示 -->
            <div v-if="isLoading" class="loading">
            <p>読み込み中です...</p>
            </div>

            <!-- API結果がない場合のメッセージを表示 -->
            <div v-else-if="dataList.length === 0" class="no-results">
              <p>該当する結果が見つかりませんでした。</p>
            </div>
            
            <!-- 結果がある場合にリストを表示 -->
            <ul v-else class="favorite-list" justify="center">
              <li v-for="(item, index) in dataList" :key="index" class="list-card">
                  <div class="card-contents">
                    <span class="card-id"> {{ item.ID }}</span>
                    <span class="card-name"> {{ item.Name }}</span>
                    <span class="card-area"> {{ item.Area }}</span>
                    <span class="card-category"> {{ item.Category }}</span>
                  </div>
              </li>
            </ul>
          </div>
        </section>
      </v-container>
    </main>
    <FooterView />
  </div>
</template>
 
<script>
import axios from "axios";
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
 
export default {
  name: 'SearchResults',
  components: {
    HeaderView,
    FooterView,
  },
  data() {
    return {
      selectedArea: '',
      selectedCategory: '',
      dataList: [], // APIから取得したデータを格納する配列
      isLoading: false  // ここでプロパティを定義する
    };
  },
  created() {
    // クエリパラメータを取得
    this.selectedArea = this.$route.query.area || '';
    this.selectedCategory = this.$route.query.category || '';
    console.log("クエリパラメータ: ", this.selectedArea, this.selectedCategory);
 
    // 画面切り替え後にAPIを実行
    this.fetchResults();
  },
  methods: {
    async fetchResults() {
      this.isLoading = true;  // データ取得開始時にローディングを設定
      try {
        console.log("APIリクエストを開始します");
 
        const response = await axios.get(
          "https://m3h-ikari-functionapp729.azurewebsites.net/api/SELECT",
          {
            params: {
              area: this.selectedArea,
              category: this.selectedCategory,
            },
          }
        );
 
        console.log("APIレスポンスを受信:", response.data);
 
        if (response.data && response.data.List) {
          this.dataList = response.data.List;
          console.log("dataListが更新されました:", this.dataList);
        } else {
          console.error("APIから期待されるデータ形式が返されませんでした");
        }
 
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }finally {
        this.isLoading = false;  // データ取得終了後にローディングを解除
      }
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
 
main {
  padding: 0 80px;
  margin-top: 50px;
}
 
.favorite-list {
  display: flex; /* フレックスボックスを使用 */
  flex-wrap: wrap; /* カードが横に並びきらない場合に次の行に折り返す */
  justify-content: center; /* カードを中央に配置 */
  padding: 0;
  list-style: none;
  margin: 0 auto; /* リスト全体を中央揃え */
}
 
.list-card {
    background-color: #FBF9C2;
    border: 2px solid #F9DD5D;
    border-radius: 7px;
    padding: 10px;
    width: 100%; /* カードが親の幅いっぱいに広がるように */
    max-width: 300px; /* カードの最大幅を設定 */
    max-height: 200px;
    margin: 10px; /* カード間の余白 */
    font-family: 'M PLUS 1 Code', 'Comic Sans MS', 'Comic Sans', cursive, sans-serif;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}
 
.list-card:hover {
    transform: scale(1.05);
}
 
.card-contents {
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 15px;
    color: #4D4766;
    font-size: 18px;
}
 
.card-id,
.card-name,
.card-area,
.card-category {
    display: block;
    margin-bottom: 5px;
}
 
.card-id::before {
    content: '🆔 ';
}
 
.card-name::before {
    content: '🍴 ';
}
 
.card-area::before {
    content: '📍 ';
}
 
.card-category::before {
    content: '🏷️ ';
}
 
.favorite-list {
    margin-top: 20px;
    padding-left: 0;
    list-style: none;
}
 
.favorite-list li {
    padding: 10px;
    background: #f5f5f5;
    margin-bottom: 5px;
    border-radius: 5px;
}
 
footer {
  margin-top: 20px;
}
 
@media (max-width: 768px) {
  .list-card {
    width: calc(50% - 20px); /* タブレットサイズでは2枚並ぶようにする */
  }
}
 
@media (max-width: 480px) {
  .category-contents h2{
    font-size: 22px;
  }
  .list-card {
    width: calc(100% - 20px); /* スマートフォンサイズでは1枚ずつ並ぶようにする */
  }
}
</style>
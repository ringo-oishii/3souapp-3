<template>
    <div id="app">
      <HeaderView />
      <main>
        <v-container>
        <section>
            <div class="search-contents">
            <h2>⭐ Let's go ⭐</h2>
            <ul class="favorite-list">
                <v-col cols="12" md="4" 
                v-for="(item, index) in filteredResults"
                :key="index">
                    <li class="list-card">
                    <div class="card-contents">
                    <span class="card-id"> {{ item.ID }}</span>
                    <span class="card-name"> {{ item.Name }}</span>
                    <span class="card-area"> {{ item.Area }}</span>
                    <span class="card-category"> {{ item.Category }}</span>
                    </div>
                    </li>
                </v-col>
                <!-- 結果がない場合の表示 -->
                <v-col v-if="filteredResults.length === 0" cols="12">
                    <div class="no-results text-center">
                    <h3>結果がありません</h3>
                    <p>条件を変更して再検索してください。</p>
                    </div>
                </v-col>
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
      selectedArea: this.$route.query.area || '',
      selectedCategory: this.$route.query.category || '',
      dataList: [] // データ表示用配列
    };
  },

  computed: {
    filteredResults() {
      return this.dataList.filter((item) => {
        const matchArea = this.selectedArea ? item.Area === this.selectedArea : true;
        const matchCategory = this.selectedCategory ? item.Category === this.selectedCategory : true;
        return matchArea && matchCategory;
      });
    }
  },

  created() {
    console.log('SearchResults component created');
    this.fetchResults();
  },

  methods: {
  async fetchResults() {
    try {
      console.log("APIリクエスト開始");
 
      // API リクエストを作成
      const response = await axios.get(
        "https://m3h-ikari-functionapp729.azurewebsites.net/api/SELECT",
        {
          params: {
            area: this.selectedArea,
            category: this.selectedCategory,
          },
        });
 
      // APIレスポンスをコンソールに出力して構造を確認する
      console.log("APIレスポンス:", response.data);
 
      // レスポンスが期待通りか確認
    if (response.data && Array.isArray(response.data.List)) {
      this.dataList = response.data.List;
    } else {
      console.warn("期待するデータ構造ではありません");
      this.dataList = [];
    }

      console.log("dataListの内容:", this.dataList);
 
      // フィルタリング結果を確認
      console.log("フィルタリング結果:", this.filteredResults);
 
    } catch (error) {
      console.error("データの取得に失敗しました", error);
      alert("データの取得に失敗しました。ネットワーク接続を確認してください。");
    }
  },
},
  
};


</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
    width: calc(33.333% - 20px); /* 各カードの幅を設定して3枚並ぶようにする */
    max-height: 200px;
    margin: 10px; /* カード間の余白 */
    font-family: 'Comic Sans MS', 'Comic Sans', cursive, 'Rounded M+', 'Noto Sans JP', sans-serif;
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

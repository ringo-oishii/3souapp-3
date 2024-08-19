<template>
    <div id="app">
      <HeaderView />
      <main>
  
      <section>
        <div class="category-contents">
        <h2>⭐ Let's go ⭐</h2>
          <ul class="favorite-list">
              <div class="list-card">
                <div class="card-contents">
                  <span class="card-id"> {{ $route.query.ID }}</span>
                  <span class="card-name"> {{ $route.query.Name }}</span>
                  <span class="card-area"> {{ $route.query.Area }}</span>
                  <span class="card-category"> {{ $route.query.Category }}</span>
                </div>
              </div>
            </ul>    
          </div>
      </section>
  
      </main>
      <FooterView />
    </div>
  </template>

<script>
import axios from 'axios';
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';

export default {
  name: 'SaveResults',
  components: {
    HeaderView,
    FooterView,
  },


  data() {
    return {
      dataList: [], // 検索対象のデータリスト
    };
  },

    methods: {
    async fetchData() {
      // データを取得する処理
      try {
        const response = await axios.get('https://m3h-ikari-functionapp729.azurewebsites.net/api/SELECT');
        this.dataList = response.data.List;
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    }
  }
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
    font-family: 'M PLUS 1 Code', 'Comic Sans MS', 'Comic Sans', cursive, sans-serif;
    color: ;
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

<template>
  <div id="app">
    <HeaderView />
    <main>

    <section>
      <div class="category-contents">
      <h2>🎵😊 your favorite 😊🎵</h2>
      <ul class="favorite-list">
            <li v-for="(item, index) in dataList" :key="index" class="list-card">
              <div class="card-contents">
                <span class="card-id"> {{ item.ID }}</span>
                <span class="card-name"> {{ item.Name }}</span>
                <span class="card-area"> {{ item.Area }}</span>
                <span class="card-category"> {{ item.Category }}</span>
              </div>
            </li>
          </ul>    </div>
    </section>

    </main>
    <FooterView />
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';
import axios from 'axios';

export default {
  components: {
    HeaderView,
    FooterView,
  },

    data() {
      
    return {
        // Vue内部で使いたい変数は全てこの中に定義する
        ID: '', //パラメーター「ID」格納変数
        Name: '', //パラメーター「Name」格納変数
        Area: '', //パラメーター「Area」格納変数
        Category: '', //パラメーター「Category」格納変数
        dataList: [], // データ表示用配列
    };
  },


  methods: {
  async readData() {
    try {
      // APIリクエストを送信し、レスポンスを取得
      const response = await axios.get('https://m3h-ikari-functionapp729.azurewebsites.net/api/SELECT');
      console.log(response.data); // レスポンスデータをコンソールに出力

      // データが存在するか確認し、適切に格納
      if (response.data && response.data.List) {
        this.dataList = response.data.List;
      } else {
        console.error('レスポンスデータの構造が予期していません');
      }
    } catch (error) {
      console.error("データの取得に失敗しました", error); 
    }
  }
},    

     mounted() {
      this.readData(); // コンポーネントがマウントされたときにデータを取得
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
    background-color: #FBF9C2 !important;
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



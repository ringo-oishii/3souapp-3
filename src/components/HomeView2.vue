APIとつなげられてないコード
<template>
    <div id="app">
      <HeaderView />
      <main>
  
      <section>
        <div class="category-contents">
        <h2>🎵😊 your favorite 😊🎵</h2>
        <ul class="favorite-list">
          <div class="list-card">
            <div class="card-contents">
              <span class="card-id">ID: {{ ID }}</span>
              <span class="card-name">Name: {{ Name }}</span>
              <span class="card-area">Area: {{ Area }}</span>
              <span class="card-category">Category: {{ Category }}</span>
            </div>
          </div>
  
          <v-btn
            class="ma-2"
            color="#6389d1"
            dark
            large
            @click="readData"
          >
            button
          </v-btn>
  
        </ul>
      </div>
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
        // SELECT用のAPIを呼び出し
        try {
          const response = await axios.get('https://m3h-ikari-functionapp729.azurewebsites.net/api/SELECT');
          console.log(response.data);
          this.dataList = response.data.List;
        } catch (error) {
          console.error("データの取得に失敗しました", error); 
        }
        }
        
      },
      
  
      /* mounted() {
        this.fetchData(); // コンポーネントがマウントされたときにデータを取得
      }, */
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
    padding: 20px;
    margin-top: 50px;
  }
  
  .list-card {
      background-color: #FBF9C2;
      border: 2px solid #F9DD5D;
      border-radius: 7px;
      padding: 10px;
      max-width: 300px;
      font-family: 'Comic Sans MS', 'Comic Sans', cursive, 'Rounded M+', 'Noto Sans JP', sans-serif;
      color: ;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease-in-out;
      margin-bottom: 15px;
      margin: 0 auto; /* 中央揃え */
  }
  
  .list-card:hover {
      transform: scale(1.05);
  } 
  
  .card-contents {
      background-color: #;
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
  
  </style>
  
  
  
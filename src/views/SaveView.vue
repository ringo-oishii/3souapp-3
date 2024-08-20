<template>
<div id="app" data-app>
   <HeaderView />
    <main>

      <section>
      <v-container>
      <v-row class="mb-3 mt-3" align="center" justify="center">
        <!-- 保存フォーム -->
        <v-col cols="12">
          <div class="save-container">
            <h2 class="text-center"> 💖 Save your new favorite 💖 </h2>

            <v-row class="mb-3 mt-3" align="center" justify="center">
              <v-col cols="12" md="2"></v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="🆔 IDを入力…"
                  v-model="ID"
                  filled
                  dense
                  color="#6389d1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="🍴 お店の名前を入力…"
                  v-model="Name"
                  filled
                  dense
                  color="#6389d1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2"></v-col>
              <v-col cols="12" md="2"></v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="📍 エリアを入力…"
                  v-model="Area"
                  filled
                  dense
                  color="#6389d1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-combobox
                  label="🏷️ カテゴリーを選択または入力…"
                  v-model="Category"
                  :items="categories"
                  :menu-props="{ top: true, offsetY: true }"
                  filled
                  dense
                  color="#6389d1"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="2"></v-col>
            </v-row>
            <v-btn
              class="button-save"
              color="#6389d1"
              dark
              large
              @click="addData"
            >
              save
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
  import axios from 'axios';
  import HeaderView from '@/components/HeaderView.vue';
  import FooterView from '@/components/FooterView.vue';


  export default {
    name: 'Save-view',
    components: {
    HeaderView,
    FooterView,
    },

    data() {
    return {
      ID: '', // パラメーター「ID」格納変数
      Name: '', // パラメーター「Name」格納変数
      Area: '', // パラメーター「Area」格納変数
      Category: '',
      dataList: [], // データ表示用配列
      categories: ['カフェ', 'ランチ', 'ディナー', 'パン', 'レストラン', 'ビストロ', 'バー', '居酒屋', '食堂', 'その他']

    };
  },
  methods: {

    async addData() {
      // IDの入力チェック（空白か数字以外なら終了）
      if (!this.ID || isNaN(this.ID)) {
        console.log("IDに数値が入力されていません");
        return;
      }
      
      // POSTメソッドで送るパラメーターを作成
      const param = {
        ID: this.ID,
        Name: this.Name,
        Area: this.Area,
        Category: this.Category
      };
      
      try {
        // INSERT用のAPIを呼び出し
        const response = await axios.post('https://m3h-ikari-functionapp729.azurewebsites.net/api/INSERT', param);
        // 結果をコンソールに出力
        console.log(response.data);
        // 保存完了画面に遷移（パラメータをクエリとして渡す）
          const currentPath = this.$route.path;
          if (currentPath !== '/save-results') {
            this.$router.push({ name: 'save-results' ,
            query: {
            ID: this.ID,
            Name: this.Name,
            Area: this.Area,
            Category: this.Category
            }
          });
        }

      } catch (error) {
        console.error("データの追加に失敗しました", error);
      }

    }
  }
};

</script>
  
  <style>
  .main {
  font-family: 'Yomogi', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5d5d63;
  }



  .text-center {
    margin: 15px 0;
  }
  
  .no-results {
    text-align: center;
    margin-top: 16px;
  }
  
  v-list-item {
    cursor: pointer;
  }
  
  v-list-item:hover {
    background-color: #f1f1f1;
  }
  </style>
  
<template>
  <div id="app" data-app>
    <HeaderView />
    <main>
      <section>
        <v-container fluid>
          <v-row
            class="mb-3 mt-3"
            align="center"
            justify="center"
            no-gutters
          >
            <v-col
              cols="12"
              class="d-flex flex-column align-center"
            >
              <div class="save-container">
                <h2 class="text-center"> 💖 Save your new favorite 💖 </h2>

                <v-text-field
                      label="🆔 IDを入力…"
                      :style="{ width: '400px' }"
                      v-model="ID"
                      filled
                      dense
                      color="#6389d1"
                    ></v-text-field>

                <v-text-field
                      label="🍴 お店の名前を入力…"
                      :style="{ width: '400px' }"
                      v-model="Name"
                      filled
                      dense
                      color="#6389d1"
                    ></v-text-field>

                <v-text-field
                  label="📍 エリアを入力…"
                  :style="{ width: '400px' }"
                  v-model="Area"
                  filled
                  dense
                  color="#6389d1"
                ></v-text-field>

                <v-text-field
                  label="🏷️ カテゴリーを入力…"
                  :style="{ width: '400px' }"
                  v-model="Category"
                  filled
                  dense
                  color="#6389d1"
                ></v-text-field>

                <v-btn
                  class="button-save mt-4"
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
        };
      },   
methods: {
  async addData() {
    // IDの入力チェック（空白か数字以外なら終了）
    if (!this.ID || isNaN(this.ID)) {
      alert("IDに数値が入力されていません");
      return;
    }
    // 名前の入力チェック（空白なら終了）
    if (!this.Name) {
      alert("お店の名前を入力してください。");
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
      const response = await axios.post('https://m3h-ikari-functionapp729.azurewebsites.net/api/INSERT', param, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // 結果をコンソールに出力
      console.log('レスポンス:', response.data);
      // 保存完了画面に遷移（パラメータをクエリとして渡す）
      const currentPath = this.$route.path;
      if (currentPath !== '/save-results') {
        this.$router.push({ name: 'save-results',
          query: {
            ID: this.ID,
            Name: this.Name,
            Area: this.Area,
            Category: this.Category
          }
        });
      }

    } catch (error) {
      console.error("データの追加に失敗しました", error.response || error.request || error.message);
    }
  }
}}

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
  margin-bottom: 30px;
}

.no-results {
  text-align: center;
  margin-top: 16px;
}

.custom-combobox {
  cursor: pointer;
}

.save-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-save {
  margin-top: 16px;
}
</style>


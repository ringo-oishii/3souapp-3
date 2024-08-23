<template>
    <header>

      <div class="title">What do you eat?</div>
      <nav>

        <div class="button-style">
        <button class="button-home" @click="goToHome">Home</button>  |
        <button class="button-newsave" @click="goToSave">new save</button>  |
        <button class="button-search" @click="goToSearch">search</button>
        </div>

      </nav>

    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
      };
    },
    methods: {
      search() {
        // 検索機能の実装
        console.log('検索: ', this.searchQuery);
      },

      goToHome() { 
        const currentPath = this.$route.path;
        if (currentPath !== '/') {
          this.$router.push({ name: 'Home' });
        }
      },

      goToSave() { 
        const currentPath = this.$route.path;
        if (currentPath !== '/save-view') {
          this.$router.push({ name: 'save-view' });
        }
      },

      goToSearch() {
        const currentPath = this.$route.path;
        if (currentPath !== '/search-view') {
        this.$router.push({ name: 'search-view' });
        }
      },
    },
  };
  </script>
  
  <style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e45479;
    color: white;
    padding: 0 15px;
    height: 70px;
    width: 100%
  }

  .title {
    font-size: 20px;
  }
  
  nav a {
    margin-left: 15px;
    color: white;
  }

  .button-style {
    font-size: 20px;
    padding: 10px;
  }

  .button-home:hover {
    background-color: #f7a1c6;
  }

  .button-newsave:hover {
    background-color: #f7a1c6;
  }

  .button-search:hover {
    background-color: #f7a1c6;
  }

  </style>
  
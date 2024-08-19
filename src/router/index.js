import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../components/HomeView.vue';
import SaveView from '../views/SaveView.vue';
import SearchView from '../views/SearchView.vue';
import SaveResults from '../views/SaveResults.vue';
import SearchResults from '../views/SearchResults.vue'; // 正しいファイル名でインポート

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/save-view',
      name: 'save-view',
      component: SaveView,
      props: true
    },
    {
      path: '/search-view',
      name: 'search-view',
      component: SearchView,
      props: true
    },
    {
      path: '/save-results',
      name: 'save-results',
      component: SaveResults,
      props: true
    },
    {
      path: '/search-results',
      name: 'search-results',
      component: SearchResults, // インポートしたSearchResultsをルートに設定
      props: true
    }
  ]
});

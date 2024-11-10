import { createApp } from 'vue'
import './style.css'
import './index.scss'
import App from './App.vue'
import NaiveUI from 'naive-ui';

const app = createApp(App);
app.use(NaiveUI);
app.mount('#app');

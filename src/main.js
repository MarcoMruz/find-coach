import { createApp } from 'vue';

import router from './router';
import store from './store/index.js';

import App from './App.vue';
import VCard from './components/ui/VCard.vue';
import VBadge from './components/ui/VBadge.vue';
import VButton from './components/ui/VButton.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('VCard', VCard);
app.component('VButton', VButton);
app.component('VBadge', VBadge);

app.mount('#app');

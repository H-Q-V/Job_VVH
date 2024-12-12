import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";
import Toast from "primevue/toast";

import "./bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./tailwind.css";
import "./style.css";
import "./select.css";

// In main.js
// import "primevue/resources/themes/saga-blue/theme.css";
// import "primevue/resources/primevue.min.css";
// import "primeicons/primeicons.css";

const app = createApp(App);

app
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .use(ConfirmationService)
  .component("ConfirmPopup", ConfirmPopup)
  .component("Toast", Toast);
app.mount("#app");

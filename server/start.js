const {App} = require("./server/server");

const app = new App();
app.useCookies();
app.useCsrf();
app.useMongoDb();
app.run();
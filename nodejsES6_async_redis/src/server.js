import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

import routes from './routers';
app.use(routes);

app.listen(PORT, function () {
    console.log('app listening on port', PORT);
});

export { app }
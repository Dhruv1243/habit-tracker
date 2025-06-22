import express from "express"; //if you're using import just make sure that type is set to modul in package.json

const app = express(); //this is to make it run

app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});

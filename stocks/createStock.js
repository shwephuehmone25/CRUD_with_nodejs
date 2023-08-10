import axios from "axios";

axios
  .post("http://localhost:9000/api/stocks", {
    code: "P0003",
    name: "strawberry",
    price: 500,
  })
  .then((res) => {
    console.log(res);
  })
  .catch(console.log);

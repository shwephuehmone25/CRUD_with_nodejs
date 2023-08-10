import axios from "axios";

axios
  .put("http://localhost:9000/api/stocks/64d35aa5a9b274482bb47cc8", {
    code: "P0003",
    name: "strawberry",
    price: 600,
  })
  .then((res) => {
    console.log(res);
  })
  .catch(console.log);

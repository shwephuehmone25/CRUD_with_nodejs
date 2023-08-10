import axios from "axios";

axios.delete("http://localhost:9000/api/stocks/64d35aa5a9b274482bb47cc8")
  .then((res) => {
    console.log(res.data);
  })
  .catch(console.log);

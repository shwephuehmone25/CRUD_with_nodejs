import axios from "axios";

axios.get(`http://localhost:9000/api/stocks/64d35a148594f71e351c9138`)
  .then((res) => {
    console.log(res.data);
  })
  .catch(console.log);
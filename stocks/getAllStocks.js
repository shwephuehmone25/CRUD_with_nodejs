import axios from "axios";

const params = {
  page: 1,
  perpage: 10,
  search: "",
};

axios.get("http://localhost:9000/api/stocks", { params })
  .then((res) => {
    console.log(res.data);
  })
  .catch(console.log);

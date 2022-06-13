import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://expense-tracker-react-node.herokuapp.com/api/"
})
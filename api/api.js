import axios from "axios"
const api = async(formData) => {
    try {
        const res = await axios.post("http://localhost:3000/api", formData)
        return res.data 
    } catch (error) {
        console.log("🚀 ~ api ~ error:", error)  
    }
}

export default api

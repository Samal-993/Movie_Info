import React from 'react'
import axios from 'axios'



const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmM5ZDE0ZmQyMDBkNjRkMWU2OGNiNThlMjJhZGU1NSIsIm5iZiI6MTc0MDY3MjU3My4zLCJzdWIiOiI2N2MwOGUzZGMxNTNlY2UyZTJhMjQ5YTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-MtLYBIueMeLGnc0w8K858zigRm0lmLAQh2YQWpItxw'
      }
})


export default instance
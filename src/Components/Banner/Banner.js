import React, { useEffect , useState} from 'react'
import './Banner.css'
import axios from '../../axios'
import {API_KEY, imageURL} from '../../constants/constants'

function Banner() {
  const [movie, setMovie] = useState()
  useEffect(()=>{
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0])
      setMovie(response.data.results[Math.floor(Math.random() * 20)])
    })
  }, [])
  return (
    <div style={{backgroundImage: `url(${movie ? imageURL+movie.backdrop_path : ""})`}} className='banner'>
        <div className="content">
            <h1 className="title">{movie ? movie.title: ''}</h1>
            <div className="banner_buttons">
                <button className="button">Play</button>
                <button className="button">My list</button>
                <h2 className="description">{movie ? movie.overview: ''}</h2>
            </div>
        </div>
        <div className="fade"></div>
    </div>
  )
}

export default Banner

import React, {useEffect, useState} from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import {API_KEY, imageURL } from '../../constants/constants'

function RowPost(props) {
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      setMovies(response.data.results)
    })
  },)
  const [movies, setMovies] = useState()
  const [id, setId]= useState('')
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }}
  const handleMovie = (id)=>{
    console.log(id)
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`).then((response)=>{
      console.log(response.data.results[0])
      if (response.data.results.length!==0){
        setId(response.data.results[0].key)
      }
    }).catch(err=>{
    })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {
          movies ? movies.map((obj)=>
            <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? "smallPoster" : "poster"} src={`${imageURL+obj.backdrop_path}`} alt="poster" />
          ) : null
        }
        
        
      </div>
      {id && <YouTube opts={opts} videoId={id} />}
    </div>
  )
}

export default RowPost

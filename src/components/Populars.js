import React, { useState, useEffect ,useRef } from 'react'
import { CardGroup , Row} from 'react-bootstrap'
import Displaycards from './Displaycards'
import '../App.css'
function Populars(type) { 
  const [Data, setData] = useState([])
  useEffect(() => {
    console.log(type.type);
    var url ; 
    if(type.type === ""){
      url = "https://api.themoviedb.org/3/trending/movie/day?api_key=f9db248562d1bb5b6d81d352f937f435&page=1"
    }else{
      url = `https://api.themoviedb.org/3/search/movie?api_key=f9db248562d1bb5b6d81d352f937f435&language=en-US&query=${type.type}&page=1&include_adult=true`
    }
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        var ct =0; 
        var ar = []; 
        data.results.forEach(element => {
          ar[ct] = [element.title , element.overview , element.poster_path , element.release_date , element.adult
            ,element.adult , element.vote_average];
          ct++; 
        });
        setData([]); 
        setData(ar);  
      } catch (error){
        console.log(error);
      }
    }
    fetchData();
  },[type.type])
  return (
    <div >
      <Row xs={1} md={6} className="g-4">
        {
          Data.map((el)=>{  
            return(
              <Displaycards  key={el[0]} title={el[0]} img = {el[2]} desc ={el[1]} rld ={el[3]}  adlt = {el[4]} votes={el[5]} />
          )
          })
        }
      </Row>
    </div>
  )
}

export default Populars
import Auth from "./components/auth"
import {db} from "../src/config/Firebase"
import {getDocs, collection, addDoc} from "firebase/firestore"
import { useState } from "react"
import { useEffect } from "react"

function App() {

  const [movieList, setMovieList] = useState([])
  const [movieTitle, setMovieTitle] = useState("")
  const [movieReleasedOn, setMovieReleasedOn] = useState(0)
  const [movieWonOscar, setMovieWonOscar] = useState(false)

  const moviesCollectionRef = collection(db, "movies")

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: movieTitle,
        releasedOn: movieReleasedOn,
        wonOscar: movieWonOscar
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
      
    } 
    
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <Auth/>
      <input type="text" 
        placeholder="movie title"
        onChange={(e) => setMovieTitle(e.target.value)}
        required
      />

      <input type="number" 
        placeholder="movie release date"
        onChange={(e) => Number(setMovieReleasedOn(e.target.value))}
        required
      />

      <input type="checkbox" 
        placeholder="movie won oscar"
        checked={movieWonOscar}
        onChange={(e) => setMovieWonOscar(e.target.checked)}
        required
      />
      <label>Received an oscar</label>
      <button onClick={onSubmitMovie}>submit</button>

      {movieList.map((movie) => (
        <div>
          <h1 style={{color: movie.wonOscar ? "green" : "red"}}>
            {movie.title}
          </h1>
          <p> Date: {movie.releasedOn}</p>
        </div>
      ))}
    </>
  )
}

export default App

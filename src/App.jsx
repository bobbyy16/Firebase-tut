import Auth from "./components/auth"
import {db, auth, storage} from "../src/config/Firebase"
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react"
import { useEffect } from "react"

function App() {

  const [movieList, setMovieList] = useState([])
  const [movieTitle, setMovieTitle] = useState("")
  const [movieReleasedOn, setMovieReleasedOn] = useState(0)
  const [movieWonOscar, setMovieWonOscar] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies")

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: movieTitle,
        releasedOn: movieReleasedOn,
        wonOscar: movieWonOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);


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


  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };


  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
    <Auth />

    <div>
      <input
        placeholder="Movie title..."
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <input
        placeholder="Release Date..."
        type="number"
        onChange={(e) => setMovieReleasedOn(Number(e.target.value))}
      />
      <input
        type="checkbox"
        checked={movieWonOscar}
        onChange={(e) => setMovieWonOscar(e.target.checked)}
      />
      <label> Received an Oscar</label>
      <button onClick={onSubmitMovie}> Submit Movie</button>
    </div>
    <div>
      {movieList.map((movie) => (
        <div>
          <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
            {movie.title}
          </h1>
          <p> Date: {movie.releaseDate} </p>

          <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

          <input
            placeholder="new title..."
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button onClick={() => updateMovieTitle(movie.id)}>
            {" "}
            Update Title
          </button>
        </div>
      ))}
    </div>

    <div>
      <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
      <button onClick={uploadFile}> Upload File </button>
    </div>
  </div>
    
  )
}

export default App

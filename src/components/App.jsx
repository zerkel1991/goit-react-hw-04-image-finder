import {useState} from 'react';
import Searchbar from "./Searchbar/Searchbar";


const App = () =>{
  const [imageName, setImageName] = useState('');

 const handleSearchFormSubmit = imageName => {
    setImageName( imageName );

  };


return(
  <>
  <Searchbar onSubmit={handleSearchFormSubmit}/>
  </>
)







}
export default App;

import { useEffect } from "react";
import axios from "axios";
import { useDispatch , useSelector} from "react-redux";
import { addNewAlbums } from "../redux/discoverSlice";

const useNewRelease = () => {
  const dispatch = useDispatch();
  const albums = useSelector((store)=>store.discover.albums)



  useEffect(() => {
    const getNewReleases = async () => {
      const access_token = localStorage.getItem("token");

      try {
        const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            limit: 6,  
          }
        
        });

        const albumsWithTracks = await Promise.all(
          response.data.albums.items.map(async (album) => {
            const tracks = await axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
             
            });

            return { album, tracks: tracks.data.items };
          })
        );

        dispatch(addNewAlbums({albumsWithTracks}))

      } catch (err) {
      }
      
    };

    !Object.keys(albums).length  && getNewReleases();
  }, []);

};

export default useNewRelease;
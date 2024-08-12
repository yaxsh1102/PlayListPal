import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewAlbums, setLoading } from "../redux/discoverSlice";

const useNewRelease = () => {
  const dispatch = useDispatch();
  dispatch(setLoading(true));

  useEffect(() => {
    const getNewReleases = async () => {
      const access_token = localStorage.getItem("token");

      try {
        const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        
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
        console.error("Error fetching new releases:", err.response ? err.response.data : err.message);
      }
      finally{
        dispatch(setLoading(false));
      }
    };

    getNewReleases();
  }, []);

  return null;
};

export default useNewRelease;
import { useEffect } from "react";
import axios from "axios";
import { useDispatch , useSelector} from "react-redux";
import { addNewAlbums } from "../redux/discoverSlice";
import {getAlbumId} from "../utils/extractUrl";

const useNewRelease = () => {
  const dispatch = useDispatch();
  const albums = useSelector((store)=>store.discover.albums)



  useEffect(() => {
    const getNewReleases = async () => {


      const albumUrls = [
        "https://www.jiosaavn.com/album/kabir-singh/kLG-OKbVmvM_",
        "https://www.jiosaavn.com/album/love-aaj-kal/1rzXD7NU,fI_",
        "https://www.jiosaavn.com/album/aashiqui-2/-iNdCmFNV9o_",
        "https://www.jiosaavn.com/album/recovery/nsOYc1E5Cgc_",
        "https://www.jiosaavn.com/album/stree-2/VCjKuSJcwxs_"
      ];
      
      const access_token = localStorage.getItem("token");

      try {
        // const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {

        //   headers: {
        //     Authorization: `Bearer ${access_token}`,
        //   },
        //   params: {
        //     limit: 6,  
        //   }
        
        // });


        const albumData = await Promise.all(
          albumUrls.map(async (link) => {
         

            const jiosaavnResponse = await axios.get(`http://127.0.0.1:5100//result/?query=${link}`);


           

            const albums =  {name:jiosaavnResponse.data.name , image:jiosaavnResponse.data.image , artist:jiosaavnResponse.data.primary_artists.split(',')[0] }
            return { album:albums, tracks:jiosaavnResponse.data.songs };


          })
        );

       


        dispatch(addNewAlbums({albumData}))

      } catch (err) {
      }
      
    };

    !Object.keys(albums).length  && getNewReleases();
  }, []);

};

export default useNewRelease;
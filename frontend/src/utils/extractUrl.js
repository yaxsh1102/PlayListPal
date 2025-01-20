const extractPlaylistId = async (inputUrl) => {
    try {
  
      // Make a GET request to the URL using fetch
      const response = await fetch(inputUrl);
      const text = await response.text();
  
      // Define the marker to locate the playlist ID
      const marker = '"type":"playlist","id":"';
      const startIndex = text.indexOf(marker);
  
      if (startIndex === -1) {
        throw new Error('Playlist ID not found in response');
      }
  
      // Extract the playlist ID
      const relevantPart = text.slice(startIndex + marker.length);
      const playlistId = relevantPart.split('"')[0];
  
      console.log('Extracted Playlist ID:', playlistId);
      return playlistId;
    } catch (err) {
      console.error('Error extracting playlist ID:', err);
      return null;
    }
  };
  
  const getAlbumId = async (inputUrl) => {
    try {
      console.log('Fetching URL:', inputUrl);
  
      // Make a GET request to the URL using fetch
      const response = await fetch(inputUrl);
      const text = await response.text();
  
      // Use regex to locate the album ID
      const albumIdMatch = text.match(/"album_id":"([^"]+)"/);
      if (albumIdMatch && albumIdMatch[1]) {
        const albumId = albumIdMatch[1];
        console.log('Extracted Album ID:', albumId);
        return albumId;
      } else {
        throw new Error('Album ID not found in the response');
      }
    } catch (err) {
      console.error('Error extracting album ID:', err);
      return null;
    }
  };
  
  export { extractPlaylistId, getAlbumId };
  
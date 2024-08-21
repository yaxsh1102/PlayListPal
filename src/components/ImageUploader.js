import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function ImageCropper() {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [image, setImage] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = useCallback((img) => {
    setImage(img);
    return false; // Return false if you set crop state in here
  }, []);

  const onCropComplete = (cropPercentage, cropPixels) => {
    if (cropPixels.width && cropPixels.height) {
      makeClientCrop(cropPixels);
    }
  };

  const makeClientCrop = async (crop) => {
    if (image && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        image,
        crop,
        'cropped.jpg'
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        resolve(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  const handleUpload = () => {
    // Implement your upload logic here
    console.log('Uploading cropped image:', croppedImageUrl);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
        />
      )}
      {croppedImageUrl && (
        <div>
          <h3>Preview:</h3>
          <img alt="Crop preview" src={croppedImageUrl} />
          <button onClick={handleUpload}>Upload Cropped Image</button>
        </div>
      )}
    </div>
  );
}

export default ImageCropper;
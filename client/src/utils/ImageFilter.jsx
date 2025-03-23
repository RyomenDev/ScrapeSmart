// ! MULTIPLE IMAGES

export default async function validateImages(imageUrls) {
  const checkImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ url, valid: true });
      img.onerror = () => resolve({ url, valid: false });
    });
  };

  const results = await Promise.all(imageUrls.map(checkImage));
  return results.filter((img) => img.valid);
}

// ! SINGLE IMAGE
// import axios from "axios";

// export default async function findFirstValidImage(urls) {
//   for (const url of urls) {
//     try {
//       const res = await axios.get(url, { timeout: 5000 });
//       if (res.status === 200) return url; // Return first valid URL
//     } catch (error) {
//       continue; // Skip invalid URLs
//     }
//   }
//   return null; // No valid images found
// }

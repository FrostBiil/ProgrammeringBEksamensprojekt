// https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript - besøgt: 08/04-2024
export class ImageConverter {
  static convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      console.log(file);
    });
  }
}

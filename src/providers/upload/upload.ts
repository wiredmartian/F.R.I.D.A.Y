import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { UserfeedbackProvider } from '../userfeedback/userfeedback';

@Injectable()
export class UploadProvider {

  constructor(private camera: Camera, private feedback: UserfeedbackProvider) {

  }
  async selectImage(){
    try {
      const options: CameraOptions = {
        quality: 60,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true
      }
      const user = firebase.auth().currentUser;
      const result  = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      let filename = 'photo-' + user.uid + '.jpg';
      const profileImgRef = firebase.storage().ref(`users/images/${filename}`);
      profileImgRef.putString(image, 'data_url')
        .then((snapshot) => {
            let userRef = firebase.database().ref(`/users/${user.uid}`);
            userRef.update({
              photoURL: snapshot.downloadURL
            });
            this.feedback.toastMessage('uploaded successfully');
        })
    } catch(e){
      this.feedback.toastMessage('failed to upload');
    }
  }
}

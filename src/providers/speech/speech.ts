import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Injectable()
export class SpeechProvider {
  options: TTSOptions = {
    text: '',
    locale: 'en-US',
    rate: 0.75
  };
  constructor(private tts: TextToSpeech) {

  }

  speakMessage(text: string){
    this.options.text = text;
    return this.tts.speak(this.options);
  }

  stopMessage(){
    return this.tts.stop();
  }
}

export class TTSOptions{
  text: string;
  locale?: string;
  rate?: number;
}

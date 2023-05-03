import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})

export class HomePage implements OnInit{
  pressedButton: boolean = false;
  animals: boolean = true;
  numbers: boolean = false;
  colors: boolean = false;
  spanish: boolean = true;
  portuguese: boolean = false;
  english: boolean = false;
  language: string = '_esp';
  audioPath: string;
  sound: any;

  ngOnInit(): void {}
  
  constructor(private authSrv: AuthService, private router: Router) {}

  logout() {
    this.playSoundGreeting();
    this.authSrv.signOut().then((resp) => {
      this.router.navigate(['/login']);
    })
  }

  playSoundTheme(typeOfSound: string) {
    if (this.animals) {
      this.audioPath =
        '../../../assets/audios/audio_animals/' + typeOfSound + this.language + '.mp3';
      this.sound = new Audio(this.audioPath);
      this.sound.play();
    } else if (this.numbers) {
      this.audioPath =
        '../../../assets/audios/audio_numbers/' + typeOfSound + this.language + '.mp3';
      this.sound = new Audio(this.audioPath);
      this.sound.play();
    } else if (this.colors) {
      this.audioPath =
        '../../../assets/audios/audio_colors/' + typeOfSound + this.language + '.mp3';
      this.sound = new Audio(this.audioPath);
      this.sound.play();
    }
  }

  chooseLanguage(languageOption: number) {
    switch (languageOption) {
      case 1:
        this.spanish = false;
        this.portuguese = true;
        this.english = false;
        this.language = '_por';
        break;
      case 2:
        this.spanish = false;
        this.portuguese = false;
        this.english = true;
        this.language = '_eng';
        break;
      case 3:
        this.spanish = true;
        this.portuguese = false;  
        this.english = false;
        this.language = '_esp';
        break;
    }
    this.playSoundLanguageChange();
  }

  chooseTheme(themeOption: number) {
    this.pressedButton = true;
    setTimeout(() => {
      this.pressedButton = false;
      switch (themeOption) {
        case 1:
          this.animals = false;
          this.numbers = true;
          this.colors = false;
          break;
        case 2:
          this.animals = false;
          this.numbers = false;
          this.colors = true;
          break;
        case 3:
          this.animals = true;
          this.numbers = false;
          this.colors = false;
          break;
      }
      this.playSoundThemeChange();
    }, 2000);
  }

  chooseAnimal(animal: string) {
    this.playSoundTheme(animal);
  }

  chooseColor(color: string) {
    this.playSoundTheme(color);
  }

  chooseNumber(number: string) {
    this.playSoundTheme(number);
  }

  playSoundLanguageChange() {
    const path = '../../../assets/audios/extra/language' + this.language + '.mp3';
    const audio = new Audio(path);
    audio.play();
  }

  playSoundThemeChange() {
    if (this.animals) {
      const path = '../../../assets/audios/extra/animals' + this.language + '.mp3';
      const audio = new Audio(path);
      audio.play();
    } else if (this.numbers) {
      const path = '../../../assets/audios/extra/numbers' + this.language + '.mp3';
      const audio = new Audio(path);
      audio.play();
    } else if (this.colors) {
      const path = '../../../assets/audios/extra/colors' + this.language + '.mp3';
      const audio = new Audio(path);
      audio.play();
    }
  } 

  playSoundGreeting() {
    const path = '../../../assets/audios/extra/greeting' + this.language + '.mp3';
    const audio = new Audio(path);
    audio.play();
  }
}

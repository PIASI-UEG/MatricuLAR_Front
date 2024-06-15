import { Component } from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-home',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    providers: [NgbCarouselConfig],
})
export class HomePageComponent {
    images = [
        'assets/fotos_home/imagem2_home.jpg',
        'assets/fotos_home/imagem3-home.jpeg',
        'assets/fotos_home/imagem4_home.jpg'
    ];

    constructor(config: NgbCarouselConfig) {
        config.interval = 3000;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = false;
    }
}

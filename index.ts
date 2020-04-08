import { App } from './public-api';
import { Game } from './public-api';

window.onload = () => {
    const app = new App(new Game());

    app.initialize();
};

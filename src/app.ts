import { Game } from './game';

export class App {
    private game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    public initialize(): void {
        this.loop();
    }

    private loop(): void {
        // need to bind the current this reference to the callback
        requestAnimationFrame(this.loop.bind(this));
        this.game.tick();
    }
}

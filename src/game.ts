import { Grid } from './grid';
import { Renderer } from './renderer';

export const ALIVE: number = 1;
export const DEAD: number = 0;
export const CELL_SIZE: number = 6;

export class Game {
    private canvas: HTMLCanvasElement;
    private grid: Grid;
    private height: number = window.innerHeight;
    private renderer: Renderer;
    private width: number = window.innerWidth;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas.height = this.height;
        this.canvas.width = this.width;

        this.grid = new Grid(this.height, this.width);
        this.renderer = new Renderer(this.canvas);

        for (var i: number = 0; i < this.grid.hBound; i++) {
            for (var j: number = 0; j < this.grid.vBound; j++) {
                this.grid.cells[i][j] = this.coinFlip();
            }
        }
    }

    public tick(): void {
        this.renderer.render(this.grid);
        this.grid.mutate();
    }

    private coinFlip(): number {
        return Math.floor(Math.random() * 2);
    }
}

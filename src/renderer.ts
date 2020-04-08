import { CELL_SIZE, ALIVE } from './game';
import { Grid } from './grid';

const COLOR_ALIVE: string = '#00FF00';
const COLOR_DEAD: string = '#000000';
const CONTEXT_TYPE: string = '2d';
const GRID_LINE_SIZE: number = 1;

export class Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = <CanvasRenderingContext2D>this.canvas.getContext(CONTEXT_TYPE);
    }

    public render(grid: Grid): void {
        for (var i: number = 0; i < grid.hBound; i++) {
            for (var j: number = 0; j < grid.vBound; j++) {
                const state: number = grid.cells[i][j];

                if (state === ALIVE) {
                    this.context.fillStyle = COLOR_ALIVE;
                } else {
                    this.context.fillStyle = COLOR_DEAD;
                }

                const x: number = i * CELL_SIZE;
                const y: number = j * CELL_SIZE;

                this.context.fillRect(x, y, CELL_SIZE - GRID_LINE_SIZE, CELL_SIZE - GRID_LINE_SIZE);
            }
        }
    }
}

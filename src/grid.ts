import { CELL_SIZE, ALIVE, DEAD } from './game';

export class Grid {
    private height: number;
    private width: number;

    public cells: number[][] = [];
    public hBound: number;
    public vBound: number;

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
        this.hBound = Math.floor(this.width / CELL_SIZE) - 1;
        this.vBound = Math.floor(this.height / CELL_SIZE);

        this.cells = this.initializeCells();
    }

    public mutate(): void {
        let buffer: number[][] = this.initializeCells();

        for (var i: number = 0; i < this.hBound; i++) {
            for (var j: number = 0; j < this.vBound; j++) {
                const livingNeighbors: number = this.getLivingNeighbors(i, j, this.cells);
                buffer[i][j] = this.getNewCellState(this.cells[i][j], livingNeighbors);
            }
        }

        this.cells = buffer;
    }

    private initializeCells(): number[][] {
        const cells: number[][] = [];

        for (var i: number = 0; i < this.hBound; i++) {
            cells[i] = [];
            for (var j: number = 0; j < this.vBound; j++) {
                cells[i][j] = DEAD;
            }
        }

        return cells;
    }

    private getLivingNeighbors(x: number, y: number, board: number[][]): number {
        let count: number = 0;

        const neighbors: number[][] = [
            [x - 1, y],
            [x + 1, y],
            [x, y + 1],
            [x, y - 1],
            [x - 1, y + 1],
            [x + 1, y + 1],
            [x - 1, y - 1],
            [x + 1, y - 1]
        ];

        for (let i: number = 0; i < neighbors.length; i++) {
            let set: number[] = neighbors[i];
            let x: number = set[0];
            let y: number = set[1];

            if (x >= 0 && y >= 0 && x < this.hBound && y < this.vBound) {
                if (board[x][y] === ALIVE) {
                    count++;
                }
            }
        }

        return count;
    }

    private getNewCellState(current: number, livingNeighbors: number): number {
        let state: number = current;

        switch (current) {
            case ALIVE:
                if (livingNeighbors < 2 || livingNeighbors > 3) {
                    state = DEAD;
                }

                break;
            case DEAD:
                if (livingNeighbors === 3) {
                    state = ALIVE;
                }

                break;
            default:
                break;
        }

        return state;
    }
}

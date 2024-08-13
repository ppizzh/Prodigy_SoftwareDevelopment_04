document.addEventListener('DOMContentLoaded', generateGrid);

function generateGrid() {
    const grid = document.getElementById('sudoku-grid');
    for (let row = 0; row < 9; row++) {
        let tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            td.appendChild(input);
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }
}

function solveSudoku() {
    let grid = getGrid();
    if (solve(grid)) {
        setGrid(grid);
    } else {
        alert('No solution exists for the given Sudoku puzzle.');
    }
}

function getGrid() {
    let grid = [];
    let rows = document.querySelectorAll('tr');
    rows.forEach((tr, rowIndex) => {
        let row = [];
        let inputs = tr.querySelectorAll('input');
        inputs.forEach((input) => {
            let value = input.value ? parseInt(input.value) : 0;
            row.push(value);
        });
        grid.push(row);
    });
    return grid;
}

function setGrid(grid) {
    let rows = document.querySelectorAll('tr');
    rows.forEach((tr, rowIndex) => {
        let inputs = tr.querySelectorAll('input');
        inputs.forEach((input, colIndex) => {
            input.value = grid[rowIndex][colIndex] || '';
        });
    });
}

function solve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solve(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num || grid[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === num) {
            return false;
        }
    }
    return true;
}

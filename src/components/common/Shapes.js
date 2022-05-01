/* Possible shapes variants with their rotations */
export const shapes = [
    // none
    [[[0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]]],

    // I
    [[[0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]],

     [[0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]]],

    // T
    [[[0,0,0,0],
      [1,1,1,0],
      [0,1,0,0],
      [0,0,0,0]],

     [[0,1,0,0],
      [1,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],

     [[0,1,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],

     [[0,1,0,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],

    // L
    [[[0,0,0,0],
      [1,1,1,0],
      [1,0,0,0],
      [0,0,0,0]],

     [[1,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],

     [[0,0,1,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],

     [[0,1,0,0],
      [0,1,0,0],
      [0,1,1,0],
      [0,0,0,0]]],

    // J
    [[[1,0,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],

     [[0,1,1,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],

     [[0,0,0,0],
      [1,1,1,0],
      [0,0,1,0],
      [0,0,0,0]],

     [[0,1,0,0],
      [0,1,0,0],
      [1,1,0,0],
      [0,0,0,0]]],

    // Z
    [[[0,0,0,0],
      [1,1,0,0],
      [0,1,1,0],
      [0,0,0,0]],

     [[0,0,1,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],

    // S
    [[[0,0,0,0],
      [0,1,1,0],
      [1,1,0,0],
      [0,0,0,0]],

     [[0,1,0,0],
      [0,1,1,0],
      [0,0,1,0],
      [0,0,0,0]]],

    // O
    [[[0,1,1,0],
      [0,1,1,0],
      [0,0,0,0],
      [0,0,0,0]]]
  ]


  /**
   * Create a default state for the board width X height (fill the multidimensional array for nulls)
   * @param {*} width
   * @param {*} height
   * @returns {array[][]} Multidimensional array
   */
  export function createBoardstate(width, height) {
    let result = [];
    for (let i = 0; i < height; i++) {
        let row = new Array(width);
        row.fill(0);
        result.push(row);
    }
    return result;
  }

  /**
   * Get the random integer value in the given range
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
   function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.min(Math.floor(Math.random() * (max - min + 1) + min), max); //The maximum is inclusive and the minimum is inclusive
  }

  /**
   * Get the random shape (the next tetris block which will appear on the game board)
   * @returns arrray[][]
   */
  export const getRandomShape = () => {
    let color = getRandomInt(1,7);
    let shapeIndex = getRandomInt(1,7);
    let randomShape = shapes[shapeIndex];
    let shapeRotation = getRandomInt(0,randomShape.length-1);
    randomShape = randomShape[shapeRotation];
    // let result = randomShape.map( (row) => [...row]);
    // for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 4; j++ ) {
    //         result[i][j] = (result[i][j] === 1 ? color : 0);
    //     }
    // }
    return {/*result, */shapeIndex, shapeRotation, color};
  }

  /**
   * Get the shape by index and rotation index and color. Is used in NextBlock
   * @param {*} shapeIndex
   * @param {*} rotationIndex
   * @param {*} color
   * @returns
   */
  export const getShapeByIndexes = (shapeIndex, rotationIndex, color)=> {
    let newShape = shapes[shapeIndex][rotationIndex].map(row => row.map(item => item * color));
    return newShape;
  }

  /**
   * Detects does the comparing block has the intersection with the current block (to check the availability of the next state)
   * @param {array[][]} currentBlock
   * @param {array[][]} comparingBlock
   * @returns {boolean}
   */
  export const getIntersection = (currentBlock, comparingBlock) => {
      let height = currentBlock.length;
      let width = currentBlock[0].length;
      let result = false;
      for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            if (currentBlock[i][j] !== 0 && comparingBlock[i][j] === undefined) {
              result = true;
              break;
            }
            if (currentBlock[i][j] * comparingBlock[i][j] !== 0) {
                result = true;
                break;
            }
          }
      }
      return result;
  }

  /**
   * Get the part (square) of the board. Separate the length X length array from the grid from the x,y position
   * @param {number} x
   * @param {number} y
   * @param {number} length
   * @param {array[][]} grid
   * @returns {array[][]}
   */
  export const getPartOfBoard = (x, y, length, grid) => {
    let result = [];
    let endPoint = y + length;
    for (let i = y; i < endPoint; i++) {
        result.push(grid[i].slice(x, x + length));
    }
    return result;
  }

  /**
   * Check if the moving to the target part of the grid is possible
   * @param {int} shapeIndex Index of the shape
   * @param {int} rotationIndex Index of the rotation
   * @param {int} newPosX Target X position
   * @param {int} newPosY Target Y position
   * @param {array[][]} grid Grid in which we are going to move our block
   * @returns {boolean} If true - the block can be moved
   */
  export const checkMovingPossibility = (shapeIndex, rotationIndex, newPosX, newPosY, grid) => {
    let currentBlock = shapes[shapeIndex][rotationIndex];
    for (let i = 0; i < currentBlock.length; i++) {
      let targetRow = grid[i+newPosY];
      for (let j = 0; j < currentBlock[0].length; j++) {
        if (currentBlock[i][j] !== 0) {
          if (targetRow === undefined || targetRow[j + newPosX] === undefined || targetRow[j + newPosX] !== 0) return false;
        }
      }
    }
    return true;
  }

  /**
   * Adding block into the grid
   * @param {*} shapeIndex
   * @param {*} rotationIndex
   * @param {*} color
   * @param {*} xPosition
   * @param {*} yPosition
   * @param {*} grid
   */
  export const addBlockIntoGrid = (shapeIndex, rotationIndex, color, xPosition, yPosition, grid) => {
    let newGrid = grid.map(row => [...row]);
    let currentBlock = shapes[shapeIndex][rotationIndex];
    for (let i = yPosition; i < Math.min(yPosition + 4, grid.length); i++) {
      for (let j = xPosition; j < Math.min(xPosition + 4, grid[0].length); j++) {
        newGrid[i][j] = newGrid[i][j] === 0 ? currentBlock[i-yPosition][j-xPosition] * color : newGrid[i][j];
      }
    }
    return newGrid;
  }

  /**
   * Removing block from the grid - usable when checking the moving possibility
   * @param {*} shapeIndex
   * @param {*} rotationIndex
   * @param {*} posX
   * @param {*} posY
   * @param {*} grid
   * @returns {array[][]} Grid without shape
   */
  export const removeBlockFromGrid = (shapeIndex, rotationIndex, posX, posY, grid) => {
    let currentBlock = shapes[shapeIndex][rotationIndex];
    let newGrid = grid.map(row => [...row]);
    for (let i = 0; i < 4; i++) {
      if (i + posY >= grid.length) continue;
      for (let j = 0; j < 4; j++) {
        if (j + posX >= grid[i].length) continue;
        if (currentBlock[i][j] !== 0)
          newGrid[i + posY][j + posX] = 0;
      }
    }
    return newGrid
  }

  /**
   * Get next possible rotation of the shape. If it does not exist - returns the first rotation
   * @param {number} shapeIndex Current shape
   * @param {number} rotationIndex Current rotation index
   * @returns {number} New index of rotation of the shape
   */
  export const getNextRotation = (shapeIndex, rotationIndex) => {
    let shape = shapes[shapeIndex];
    return rotationIndex + 1 < shape.length ? rotationIndex + 1 : 0;
  }

  /**
   * Check if we can delete completed rows and increase score. IT MUTATES THE GRID PARAM!!!
   * @param {array[][]} grid Game state grid
   * @returns {number} Gathered points to increase the score
   */
  export const checkRows = (grid) => {
    // Points increase for each row completed
    // i.e. 40 points for completing one row, 100 points for two rows
    const points = [0, 40, 100, 300, 1200]
    let completedRows = 0
    for (let row = 0; row < grid.length; row++) {
      // No empty cells means it can't find a 0, so the row must be complete!
      if (grid[row].indexOf(0) === -1) {
        completedRows += 1
        // Remove the row and add a new empty one at the top
        grid.splice(row, 1)
        grid.unshift(Array(10).fill(0))
      }
    }
    return points[completedRows]
  }
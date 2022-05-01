import { addBlockIntoGrid, checkMovingPossibility, checkRows, createBoardstate, getNextRotation, getRandomShape, removeBlockFromGrid, removeLastRow } from "../../components/common/Shapes";
import { MOVE_DOWN, MOVE_RIGHT, MOVE_LEFT, ROTATE, MOVE_DOWN_FAST, PAUSE, RESUME, RESTART } from "../actions";

// Return the default state for the game
const defaultState = () => {
    return {
        // Create an empty grid 18x10
        grid: createBoardstate(10,18),
        // Get a new random shape
        currentShape: getRandomShape(),
        // set the 'x' position of the shape to 5 and y to -4, which puts the shape in the center of the grid, above the top
        currentShapeXPos: 4,
        currentShapeYPos: -4,
        // set the index of the next shape to a new random shape
        nextShape: getRandomShape(),
        // Tell the game that it's currently running
        isRunning: true,
        // Set the score to 0
        score: 0,
        // Set the default speed
        speed: 1000,
        // Game isn't over yet
        gameOver: false
    }
}

export const gameReducer = (state = defaultState(), action) => {
    switch (action.type) {
        case MOVE_DOWN_FAST : {
            return {
                ...state,
                speed: 100
            }
        }
        case PAUSE : {
            return { ...state, isRunning: false }
        }
        case RESUME : {
            return { ...state, isRunning: true }
        }
        case RESTART : {
            return { ...defaultState() }
        }
        case ROTATE : {
            let newGrid = removeBlockFromGrid(state.currentShape.shapeIndex, state.currentShape.shapeRotation, state.currentShapeXPos, state.currentShapeYPos, state.grid);
            let nextRotation = getNextRotation(state.currentShape.shapeIndex, state.currentShape.shapeRotation);
            if (checkMovingPossibility(state.currentShape.shapeIndex, nextRotation, state.currentShapeXPos, state.currentShapeYPos, newGrid)) {
                let resultGrid = addBlockIntoGrid(state.currentShape.shapeIndex, nextRotation, state.currentShape.color, state.currentShapeXPos, state.currentShapeYPos, newGrid);
                return {
                    ...state,
                    grid: resultGrid,
                    currentShape: {
                        ...state.currentShape,
                        shapeRotation: nextRotation
                    }
                }
            }
            return state;
        }
        case MOVE_DOWN : {
            let steps = action.steps || 1;
            let targetYPos = state.currentShapeYPos + steps;
            let newGrid;
            if (state.currentShapeYPos < 0) // we are trying to put the starting item to the top
                newGrid = state.grid.map( row => [...row]);
            else
                newGrid = removeBlockFromGrid(state.currentShape.shapeIndex, state.currentShape.shapeRotation, state.currentShapeXPos, state.currentShapeYPos, state.grid);
            if (checkMovingPossibility(state.currentShape.shapeIndex, state.currentShape.shapeRotation, state.currentShapeXPos, targetYPos, newGrid)) {
                let resultGrid = addBlockIntoGrid(state.currentShape.shapeIndex, state.currentShape.shapeRotation, state.currentShape.color, state.currentShapeXPos, targetYPos, newGrid);
                return {
                    ...state,
                    grid: resultGrid,
                    currentShapeYPos: targetYPos,
                }
            }
            else {
                let gatheredPoints = checkRows(state.grid);
                // It is time to add new item
                if (checkMovingPossibility(state.nextShape.shapeIndex, state.nextShape.shapeRotation, 4, 0, state.grid)) {
                    let resultGrid = addBlockIntoGrid(state.nextShape.shapeIndex, state.nextShape.shapeRotation, state.nextShape.color, 4, 0, state.grid);
                    return {
                        ...state,
                        grid: resultGrid,
                        currentShape: {...state.nextShape},
                        currentShapeXPos: 4,
                        currentShapeYPos: 0,
                        nextShape: getRandomShape(),
                        score: state.score + gatheredPoints,
                        speed: 1000
                    }
                }
                else { // We cannot add new item, so the game is over
                    return {
                        ...state,
                        gameOver: true
                    }
                }
            }
            return state;
        }
        case MOVE_LEFT : {
            let targetXPos = state.currentShapeXPos - 1;
            let newGrid = removeBlockFromGrid(state.currentShape.shapeIndex, state.currentShape.shapeRotation, state.currentShapeXPos, state.currentShapeYPos, state.grid);
            if (checkMovingPossibility(state.currentShape.shapeIndex, state.currentShape.shapeRotation, targetXPos, state.currentShapeYPos, newGrid)) {
                let resultGrid = addBlockIntoGrid(state.currentShape.shapeIndex, state.currentShape.shapeRotation, state.currentShape.color, targetXPos, state.currentShapeYPos, newGrid);
                return {
                    ...state,
                    grid: resultGrid,
                    currentShapeXPos: targetXPos
                }
            }
            return state;
        }
        case MOVE_RIGHT : {
            let targetXPos = state.currentShapeXPos + 1;
            let newGrid = removeBlockFromGrid(state.currentShape.shapeIndex, state.currentShape.shapeRotation, state.currentShapeXPos, state.currentShapeYPos, state.grid);
            if (checkMovingPossibility(state.currentShape.shapeIndex, state.currentShape.shapeRotation, targetXPos, state.currentShapeYPos, newGrid)) {
                let resultGrid = addBlockIntoGrid(state.currentShape.shapeIndex, state.currentShape.shapeRotation, state.currentShape.color, targetXPos, state.currentShapeYPos, newGrid);
                return {
                    ...state,
                    grid: resultGrid,
                    currentShapeXPos: targetXPos
                }
            }
            return state;
        }
        default: return state;
    }
}
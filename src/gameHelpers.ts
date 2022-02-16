import { PLAYER } from "./hooks/usePlayer";
import { STAGE } from "./hooks/useStage";
import { STAGE_WIDTH, STAGE_HEIGHT } from "./setup";
import { TETROMINOS } from "./setup";

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, "clear"]));

export const randomTetromino = () => {
  const tetrominos = [
    "I",
    "J",
    "L",
    "O",
    "S",
    "T",
    "Z",
    "K",
  ] as (keyof typeof TETROMINOS)[];
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

export const isColliding = (
  player: PLAYER,
  stage: STAGE,
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  // Using for loops to be able return (and break), not possible with forEach
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we are on an actual Tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. check that our move is inside the game areas height
          // That we are not moving through the bottom of the stage
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that our move is inside the areas width
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that the cell we're moving to isnt set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }

  // 5. If everything above is false
  return false;
};

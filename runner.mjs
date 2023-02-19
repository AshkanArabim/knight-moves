import knightFactory from "./knight.mjs";
import gameboardFactory from "./gameboard.mjs";

const gameboard = gameboardFactory();
const knight = knightFactory(gameboard);

console.log(knight.getPosition());
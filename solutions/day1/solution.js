const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()
  const directions = input.split(',').map(n => n.trim()).filter(n => n).map(parseDirectionCode)

  await solveForFirstStar(directions)
  await solveForSecondStar(directions)
}

function parseDirectionCode(code) {
  return {
    turnDirection: code.charAt(0) === 'L' ? -1 : 1,
    distance: Number.parseInt(code.charAt(1))
  }
}

const North = { dx: 0, dy: 1 }
const East = { dx: 1, dy: 0 }
const South = { dx: 0, dy: -1 }
const West = { dx: -1, dy: 0 }

async function solveForFirstStar(directions) {
  const compass = [North, East, South, West]
  let facing = 0
  let position = { x: 0, y: 0 }
  directions.forEach(direction => {
    facing = facing + direction.turnDirection
    if (facing < 0) {
      facing = facing + compass.length
    }
    direction.facing = compass[facing % compass.length]
    direction.position = {
      x: position.x + (direction.facing.dx * direction.distance),
      y: position.y + (direction.facing.dy * direction.distance)
    }
    position.x = direction.position.x
    position.y = direction.position.y
  })

  let solution = Math.abs(position.x) + Math.abs(position.y)
  report('Solution 1:', solution, position)
}

async function solveForSecondStar(input) {
  let solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()

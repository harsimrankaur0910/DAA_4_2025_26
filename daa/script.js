const ROWS = 10;
const COLS = 20;

let grid = [];
let startNode;
let endNode;

// ---------------- CREATE GRID ----------------
function createGrid() {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";

  grid = [];

  for (let r = 0; r < ROWS; r++) {
    let row = [];

    for (let c = 0; c < COLS; c++) {
      const nodeElement = document.createElement("div");
      nodeElement.className = "node";

      const node = {
        row: r,
        col: c,
        distance: Infinity,
        visited: false,
        isWall: false,
        weight: 1,
        previous: null,
        element: nodeElement,
      };

      // click wall toggle
      nodeElement.onclick = () => {
        if (node === startNode || node === endNode) return;

        node.isWall = !node.isWall;
        nodeElement.classList.toggle("wall");
      };

      gridElement.appendChild(nodeElement);
      row.push(node);
    }

    grid.push(row);
  }

  setRandomStartEnd();
}

// ---------------- RANDOM START / END ----------------
function setRandomStartEnd() {
  let sr = Math.floor(Math.random() * ROWS);
  let sc = Math.floor(Math.random() * COLS);

  let er = Math.floor(Math.random() * ROWS);
  let ec = Math.floor(Math.random() * COLS);

  startNode = grid[sr][sc];
  endNode = grid[er][ec];

  startNode.element.classList.add("start");
  endNode.element.classList.add("end");
}

// ---------------- RANDOM WALLS ----------------
function addRandomWalls(prob = 0.25) {
  for (let row of grid) {
    for (let node of row) {
      if (node === startNode || node === endNode) continue;

      if (Math.random() < prob) {
        node.isWall = true;
        node.element.classList.add("wall");
      }
    }
  }
}

// ---------------- DIJKSTRA ----------------
function runDijkstra() {
  let unvisited = [];

  for (let row of grid) {
    for (let node of row) {
      node.distance = Infinity;
      node.visited = false;
      node.previous = null;
      node.element.classList.remove("visited", "path");

      unvisited.push(node);
    }
  }

  startNode.distance = 0;

  while (unvisited.length > 0) {
    unvisited.sort((a, b) => a.distance - b.distance);

    let current = unvisited.shift();

    if (current.isWall) continue;
    if (current.distance === Infinity) return;

    current.visited = true;
    current.element.classList.add("visited");

    if (current === endNode) {
      drawPath();
      return;
    }

    updateNeighbors(current);
  }
}

// ---------------- NEIGHBORS ----------------
function updateNeighbors(node) {
  const neighbors = getNeighbors(node);

  for (let n of neighbors) {
    if (!n.visited && !n.isWall) {
      let newDist = node.distance + n.weight;

      if (newDist < n.distance) {
        n.distance = newDist;
        n.previous = node;
      }
    }
  }
}

// ---------------- GET NEIGHBORS ----------------
function getNeighbors(node) {
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let result = [];

  for (let d of dirs) {
    let r = node.row + d[0];
    let c = node.col + d[1];

    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
      result.push(grid[r][c]);
    }
  }

  return result;
}

// ---------------- PATH ----------------
function drawPath() {
  let current = endNode;

  while (current.previous) {
    current = current.previous;

    if (current !== startNode) {
      current.element.classList.add("path");
    }
  }
}

// ---------------- RESET ----------------
function resetGrid() {
  createGrid();
  addRandomWalls();
}

// ---------------- NEW MAP ----------------
function generateNewMap() {
  createGrid();
  addRandomWalls();
}

// INIT
createGrid();
addRandomWalls();
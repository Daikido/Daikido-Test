function Block(chunk) {
    this.chunk = chunk;
    this.isBomb = null;
    this.nearBombs = null;

    this.openned = false;
    this.flag = false;

    this.player = null;
    this.data = "";
}

function Chunk(map) {
    this.map = map;
    this.blocks = [];
    this.initBlocks = function (w, h) {
        blocks = [...Array(w)], map(
            x => [...Array(h)].map(
                y => new Block(this)));
    }
    this.get = function (x, y) {
        return blocks[x][y];
    }
}
function Map() {
    this.Columns = {};
    this.ChunkWidth = 32;
    this.ChunkHeight = 32;
    this.chunkExists = function (chunkX, chunkY) {
        if (!this.Columns[chunkX] || !this.Columns[chunkX][chunkY]) return false;
        return true;
    }
    this.create = function (chunkX, chunkY) {
        this.Columns[chunkX] = {};
        this.Columns[chunkX][chunkY] = new Chunk(this);
        this.Columns[chunkX][chunkY].initBlocks(32, 32);
    }
    this.get = function (chunkX, chunkY) {
        if (!this.chunkExists()) this.create(chunkX, chunkY);
        return this.Columns[chunkX][chunkY];
    }
    this.getBlock = function (chunkX, chunkY, blockX, blockY) {
        while (blockX < 0) {
            chunkX--;
            blockX += this.ChunkWidth;
        }
        while (blockY < 0) {
            chunkY--;
            blockY += this.ChunkHeight;
        }
        chunkX += Math.floor(blockX / this.ChunkWidth);
        chunkY += Math.floor(blockY / this.ChunkHeight);
        blockX %= this.ChunkWidth;
        blockY %= this.ChunkHeight;
    }
}
modules.exports = function () {
    this.map = new Map();
    this.get = function (x, y) {
        return this.map.getBlock(0, 0, x, y).data;
    }
    this.set = function (x, y, data) {
        this.map.getBlock(0, 0, x, y).data = data;
    }
}
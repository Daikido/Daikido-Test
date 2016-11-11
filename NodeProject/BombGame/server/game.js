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
        this.blocks = [...Array(w)].map(
            x => [...Array(h)].map(
                y => new Block(this)));
    }
    this.get = function (x, y) {
        return this.blocks[x][y];
    }
    this.pack = function (getter) {
        return this.blocks.map(x => x.map(getter));
    }
}

function Map() {
    this.Columns = {};
    this.ChunkWidth = 32;
    this.ChunkHeight = 32;
    this.chunkExists = function (chunkX, chunkY) {
        if (
            this.Columns[chunkX] == undefined ||
            this.Columns[chunkX][chunkY] == undefined) return false;
        return true;
    }
    this.create = function (chunkX, chunkY) {
        this.Columns[chunkX] = {};
        this.Columns[chunkX][chunkY] = new Chunk(this);
        this.Columns[chunkX][chunkY].initBlocks(32, 32);
    }
    this.get = function (chunkX, chunkY) {
        if (!this.chunkExists(chunkX, chunkY)) this.create(chunkX, chunkY);
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

        return this.get(chunkX, chunkY).get(blockX, blockY);
    }
    this.pack = function (startChunkX, startChunkY, width, height, getter) {
        var output = {};
        for (var i = 0; i < width; i++) {
            var chunkX = i + startChunkX;
            if (this.Columns[chunkX] == undefined) continue;
            var row = {};
            for (var j = 0; j < height; j++) {
                var chunkY = j + startChunkY;
                if (this.Columns[chunkX][chunkY] == undefined) continue;
                row[chunkY] = this.Columns[chunkX][chunkY].pack(getter);
                output[chunkX] = row;
            }
        }
        return output;
    }
}

module.exports = function () {
    this.map = new Map();
    this.get = function (x, y) {
        return this.map.getBlock(0, 0, x, y).data;
    }
    this.set = function (x, y, data) {
        this.map.getBlock(0, 0, x, y).data = data;
    }
    this.pack = function (startChunkX, startChunkY, width, height, getter) {
        return this.map.pack(startChunkX, startChunkY, width, height, getter);
    }
}
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onEnable() {
        this.node.on('touchstart', this.touchstart, this)
        this.node.on('touchmove', this.touchmove, this)
        this.node.on('touchend', this.touchend, this)
    },

    onDisable() {
        this.node.off('touchstart', this.touchstart, this)
        this.node.off('touchmove', this.touchmove, this)
        this.node.off('touchend', this.touchend, this)
    },

    touchstart(e) {
        this.node.opacity = 120
        this.node.zIndex = 1

        this.startPos = this.node.position
    },

    touchmove(e) {
        let delta = e.getDelta()
        this.node.x += delta.x
        this.node.y += delta.y
    },

    touchend(e) {
        this.node.opacity = 255
        this.node.zIndex = 0

        let endPos = this.blockToIndex(this.node.position)
        let endBlock = game.blocksArr[endPos.i][endPos.j]
        if (endBlock) {
            this.node.position = endBlock.position
            endBlock.position = this.startPos

            let startPos = this.blockToIndex(this.startPos)
            game.blocksArr[startPos.i][startPos.j] = endBlock
            game.blocksArr[endPos.i][endPos.j] = this.node

            game.checkOver()
        } else {
            this.node.position = this.startPos
        }
    },

    setBlock(texture, pos) {
        this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture, cc.rect(pos.x * game.blockSize, pos.y * game.blockSize, game.blockSize, game.blockSize))
    },

    blockToIndex(block) {
        let i = Math.abs(Math.round(block.y / game.blockSize))
        let j = Math.abs(Math.round(block.x / game.blockSize))

        return { i: i, j: j }
    },
});

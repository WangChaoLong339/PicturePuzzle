cc.Class({
    extends: cc.Component,

    properties: {
        tipImg: cc.Node,
        bg: cc.Node,
        block: cc.Prefab,
    },

    onLoad() {
        window.game = this
        this.node.onenter = this.onenter.bind(this)
    },

    onenter(idx) {
        this.bg.removeAllChildren()
        this.blocksArr = []
        this.blockSize = 175
        this.count = this.bg.height / this.blockSize
        cc.loader.loadRes(`texture/${idx}.png`, cc.Texture2D, null, (err, texture) => {
            if (err) { return cc.error(err) }
            this.tipImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
            for (let i = 0; i < this.count; i++) {
                this.blocksArr[i] = []
                for (let j = 0; j < this.count; j++) {
                    let block = cc.instantiate(this.block)
                    block.parent = this.bg
                    block.tag = { i: i, j: j }
                    block.width = this.blockSize
                    block.height = this.blockSize
                    block.getComponent('block').setBlock(texture, { x: j, y: i })
                    block.setPosition(j * this.blockSize, -i * this.blockSize)
                    this.blocksArr[i][j] = block
                }
            }
            this.randomBlock()
        })
    },

    randomBlock() {
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                let desIndex = {
                    i: parseInt(Math.random() * this.count),
                    j: parseInt(Math.random() * this.count)
                }
                let srcBlock = this.blocksArr[i][j]
                let desBlock = this.blocksArr[desIndex.i][desIndex.j]
                if (srcBlock.tag.i != desBlock.tag.i || srcBlock.tag.j != desBlock.tag.j) {
                    let srcPos = srcBlock.position
                    let desPos = desBlock.position
                    srcBlock.setPosition(desPos)
                    desBlock.setPosition(srcPos)

                    this.blocksArr[desIndex.i][desIndex.j] = srcBlock
                    this.blocksArr[i][j] = desBlock
                }
            }
        }
    },

    checkOver() {
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                let block = this.blocksArr[i][j]
                if (block.tag.i != i || block.tag.j != j) {
                    return
                }
            }
        }
        setTimeout(() => { this.node.active = false }, 1000)
    },
});

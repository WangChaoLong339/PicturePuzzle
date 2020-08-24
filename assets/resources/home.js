cc.Class({
    extends: cc.Component,

    properties: {
        game: cc.Prefab,
        layout: cc.Node,
        btnItem: cc.Node,
    },

    onLoad() {
        cc.loader.loadResDir('texture', cc.Texture2D, (err, textures) => {

            for (let i = 0; i < textures.length; i++) {
                let btnItem = cc.instantiate(this.btnItem)
                btnItem.parent = this.layout
                btnItem.children[0].getComponent(cc.Label).string = `第${i + 1}张`
                btnItem.idx = i
            }

            let game = cc.instantiate(this.game)
            game.active = false
            game.parent = this.node
        })
    },

    btnCheckpoint(e) {
        let idx = e.target.idx
        let game = cc.find('Canvas/game')
        game.active = true
        game.onenter(idx)
    },
});

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(-3)
    scene.cameraShake(2, 200)
    numberOfConsecutivePins += 1
    numberOfConsecutivePins = 0
    consecutive.setText("" + numberOfConsecutivePins)
})
info.onScore(300, function () {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(5)
    numberOfConsecutivePins += 1
    consecutive.setText("" + numberOfConsecutivePins)
})
let z2 = 0
let spr: Sprite = null
let pin: Sprite = null
let z = 0
let shouldSpawn = 0
let numberOfConsecutivePins = 0
let consecutive: TextSprite = null
scene.setBackgroundImage(assets.image`bg`)
let top = 30
let bottom = 90
let player = sprites.create(assets.image`ball`, SpriteKind.Player)
animation.runImageAnimation(
player,
assets.animation`rolling`,
80,
true
)
consecutive = textsprite.create("" + numberOfConsecutivePins, 15, 1)
consecutive.setPosition(10, 10)
player.setFlag(SpriteFlag.StayInScreen, true)
player.setPosition(30, 50)
game.onUpdate(function () {
    if (controller.up.isPressed()) {
        player.vy += -5
    } else if (controller.down.isPressed()) {
        player.vy += 5
    }
    // Off the lane:
    if (player.y > bottom || player.y < top) {
        player.startEffect(effects.fire)
    } else {
        effects.clearParticles(player)
    }
    // Bonus points
    if (numberOfConsecutivePins >= 10) {
        numberOfConsecutivePins = 0
        info.changeScoreBy(100)
        effects.confetti.startScreenEffect(500)
    }
})
game.onUpdateInterval(1000, function () {
    // Pins:
    if (shouldSpawn > 6) {
        z = Math.randomRange(top + 5, bottom - 5)
        pin = sprites.create(assets.image`pin`, SpriteKind.Food)
        pin.setPosition(160, z)
        pin.z = z
        pin.setVelocity(-50, 0)
        pin.setFlag(SpriteFlag.AutoDestroy, true)
    }
    // Reduce score
    if (player.y < top || player.y > bottom) {
        info.changeScoreBy(-1)
    }
})
game.onUpdateInterval(500, function () {
    shouldSpawn = Math.randomRange(0, 10)
    // Bad things:
    if (shouldSpawn > 3) {
        spr = sprites.create(assets.image`obstacle`, SpriteKind.Projectile)
        z2 = Math.randomRange(top + 5, bottom - 5)
        spr.setPosition(160, z2)
        spr.z = z2
        spr.setVelocity(-50, 0)
        spr.setFlag(SpriteFlag.AutoDestroy, true)
    }
})

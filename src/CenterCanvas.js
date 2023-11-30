import React, { useEffect } from 'react';
import Phaser from 'phaser';

const CenterCanvas = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-container',
      width: 500,
      height: 500,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false, // Set to true to enable physics debugging
        },
      },
      scene: {
        preload: function () {

        this.load.image('ball', './ball.png');
          this.cameras.main.setBackgroundColor('#add8e6');
        },
        create: function () {

        const ball = this.physics.add.sprite(250, 250, 'ball');
          ball.setScale(0.1);
          ball.setCollideWorldBounds(true);
          ball.setBounce(1);

          this.input.keyboard.on('keydown-SPACE', function () {
            ball.setVelocity(Phaser.Math.Between(-200, 200), -300);
          });

          this.createButton = function (x, y, text) {
            const button = this.add.text(x, y, text, {
              backgroundColor: '#3498db',
              padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5,
              },
            });

            button.setInteractive();

            button.on('pointerdown', () => {

                const buttonCenterX = x + button.width / 2;
              const buttonCenterY = y + button.height / 2;

              const angleToButton = Phaser.Math.Angle.BetweenPoints(ball, { x: buttonCenterX, y: buttonCenterY });
              const speed = 800;

              ball.setVelocity(Math.cos(angleToButton) * speed, Math.sin(angleToButton) * speed);
            });
          };

          this.createButton(0, 50, 'Button 1');
          this.createButton(0, 395, 'Button 2');
          this.createButton(50, 475, 'Button 3');
          this.createButton(350, 475, 'Button 4');
          this.createButton(400, 400, 'Button 5');
          this.createButton(400, 50, 'Button 6');
          this.createButton(50, 0, 'Button 7');
          this.createButton(350, 0, 'Button 8');
        },
        // update: function () {
        // },
      },
    };

    const game = new Phaser.Game(config);

    const phaserContainer = document.getElementById('phaser-container');
    phaserContainer.style.display = 'flex';
    phaserContainer.style.justifyContent = 'center';
    phaserContainer.style.alignItems = 'center';

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-container" style={{ width: '100vw', height: '100vh' }}></div>;
};

export default CenterCanvas;

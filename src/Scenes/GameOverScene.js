import 'phaser';
import ApiHandling from '../Objects/ApiHandling';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.myScore = this.add.text(
      config.width / 2 - 300,
      150,
      `Score: ${this.sys.game.globals.score}`,
      {
        fontSize: '40px',
        fill: '#ffffff',
      },
    );

    this.restartButton = new Button(this, config.width/2, config.height/2 - 50, 'blueButton1', 'blueButton2', 'Restart', 'Game');

    this.menuButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Main Menu', 'Title');
  }
}
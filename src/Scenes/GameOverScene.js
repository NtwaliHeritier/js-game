import 'phaser';
import ApiHandling from '../Objects/ApiHandling';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.restartButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Restart', 'Game');

    this.menuButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Main Menu', 'Title');
  }
}
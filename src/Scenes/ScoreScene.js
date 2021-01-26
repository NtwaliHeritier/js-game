import 'phaser';
import ApiHandling from '../Objects/ApiHandling';
import config from '../Config/config';

class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  async create() {
    try {
      const data = await ApiHandling.showScores();
      const { result: results } = data;
      console.log(results);
      let k = 0;
      for (const row of results) {
        this.add.text(
          config.width / 2,
          config.height / 2 + k,
          `${row.user}: ${row.score}`,
          {
            fontSize: '40px',
            fill: '#ffffff',
          },
        );
        k += 50;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default ScoreScene;

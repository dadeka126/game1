/**
 * Created by 大的卡 on 2018/5/21.
 */
//创建游戏对象
//游戏对象拥有food对象和snake对象
;(function () {
  var timeid;

  function Game() {
    this.snake = new Snake();
    this.food = new Food();
  }

  //方法 游戏开始
  Game.prototype.start = function () {
    this.food.render();
    this.snake.render();
    timeid = setInterval(function () {
      this.snake.move();
      var snakeHead = this.snake.body[0];
      var maxx = map.offsetWidth / this.snake.width - 1;
      var maxy = map.offsetHeight / this.snake.height - 1;
      if (snakeHead.x < 0 || snakeHead.x > maxx || snakeHead.y < 0 || snakeHead.y > maxy) {
        clearInterval(timeid);
        alert('game over');
        return;
      }
      //判断吃掉食物
      var foodx = this.food.x;
      var foody = this.food.y;
      var snakeHeadx = snakeHead.x * this.snake.width;
      var snakeHeady = snakeHead.y * this.snake.height;
      if (snakeHeadx == foodx && snakeHeady == foody) {
        this.food.render();
        //蛇变长
        var last = this.snake.body[this.snake.body.length - 1];
        this.snake.body.push({
          x: last.x,
          y: last.y,
          bgc: last.bgc
        })
      }
      this.snake.render();
    }.bind(this), 200)
    //通过按下键盘操控蛇
    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 37:
          if (this.snake.direction === 'right') return;  //防止蛇原地掉头
          this.snake.direction = 'left';
          break;
        case 38:
          if (this.snake.direction === 'bottom') return;
          this.snake.direction = 'top';
          break;
        case 39:
          if (this.snake.direction === 'left') return;
          this.snake.direction = 'right';
          break;
        case 40:
          if (this.snake.direction === 'top') return;
          this.snake.direction = 'bottom';
          break;
      }
    }.bind(this);

  }

  window.Game = Game;
})();
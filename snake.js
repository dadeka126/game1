/**
 * Created by 大的卡 on 2018/5/20.
 */
//new snake蛇实例对象
(function () {
  var arr = [];//存储蛇的每节
  //属性
  function Snake(option) {
    option = option || {};
    this.width = option.width || 20;
    this.height = option.height || 20;
    this.body = [
      {x: 3, y: 2, bgc: 'red'},  //蛇头坐标
      {x: 2, y: 2, bgc: 'blue'},//蛇节坐标
      {x: 1, y: 2, bgc: 'blue'},
    ];
    this.direction = option.direction || 'right';
  }

  //方法 自己动态渲染到map上
  Snake.prototype.render = function () {
    //为了防止多个snake出现重复渲染,清除之前创建的蛇
    for (var i = 0; i < arr.length; i++) {
      map.removeChild(arr[i]); //清除页面上的真正的蛇节
    }
    arr.splice(0, arr.length); //清除存储蛇节的数据
    this.body.forEach(function (item, index) {
      var snakeNode = document.createElement('div');
      arr.push(snakeNode);
      snakeNode.style.width = this.width + 'px';
      snakeNode.style.height = this.height + 'px';
      snakeNode.style.position = 'absolute';
      snakeNode.style.left = item.x * this.width + 'px';
      snakeNode.style.top = item.y * this.height + 'px';
      snakeNode.style.backgroundColor = item.bgc;
      map.appendChild(snakeNode);
    }.bind(this));
  }
  //蛇移动的方法  //移动修改的是蛇在页面的坐标数据
  Snake.prototype.move = function () {
    //蛇身体移动的位置
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;  //最后一个的上一个开始,将上一个坐标赋值给最后一个
      this.body[i].y = this.body[i - 1].y;
    }
    //蛇头移动位置,向右加1
    //this.body[0].x += 1;
    switch (this.direction) {
      case 'left':
        this.body[0].x -= 1;
        break;
      case 'right':
        this.body[0].x += 1;
        break;
      case 'top':
        this.body[0].y -= 1;
        break;
      case 'bottom':
        this.body[0].y += 1;
        break;
    }
  }

  window.Snake = Snake;
})();
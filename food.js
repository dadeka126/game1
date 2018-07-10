/**
 * Created by 大的卡 on 2018/5/20.
 */
//创建食物实例对象,存储页面上food的数据
//使用自调用函数,为了防止全局变量污染
(function () {
  var contianer; //用来存储渲染的food

  function Food(option) {
    option = option || {};
    this.width = option.width || 20;
    this.height = option.height || 20;
    this.bgc = option.bgc || 'green';
    this.x = option.x || 0;
    this.y = option.y || 0;
  }

//方法  把自己动态渲染到map上(这里才是真正的food)
  Food.prototype.render = function () {
    //判断变量是否存储了food,如果存储了在每次渲染前移除上一个清除的
    if (contianer) {
      map.removeChild(contianer);
    }
    var food = document.createElement('div');
    contianer = food;
    food.style.width = this.width + 'px';
    food.style.height = this.height + 'px';
    food.style.backgroundColor = this.bgc;
    //让食物在最小和最大坐标之间的距离随机出现
    this.x = Tool.getRandom(0, (map.offsetWidth / this.width - 1)) * this.width;
    this.y = Tool.getRandom(0, (map.offsetHeight / this.height - 1)) * this.height;
    food.style.position = 'absolute';
    food.style.left = this.x + 'px';
    food.style.top = this.y + 'px';
    map.appendChild(food);
  }
  window.Food = Food;
})();
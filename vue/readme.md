### vue中的那些坑

1. vue实例对于复杂对象监听时常会监听不到,尤其是数组嵌套对象的情况
  ```
  //_.eq(val, oldVal) 用来比较字面上的值是否是相等的
  watchObj: {
       handler: function (val, oldVal) {
         if (!(_.eq(val, oldVal))) {
                // to do
            }
       },
       deep: true
   },
  ```
2. Array.indexOf(Obj)不能用来用来判断Object对象
  ```
  this.tableData = [
      {name:'1#机器人',co:'67',template:'23',ch4:'23',time:'2018-09-12 09:11:11',_checked:false},
      {name:'1#机器人',co:'67',template:'23',ch4:'23',time:'2018-09-12 09:11:11',_checked:false},
      {name:'1#机器人',co:'67',template:'23',ch4:'23',time:'2018-09-14 09:11:11',_checked:false},
      {name:'1#机器人',co:'67',template:'23',ch4:'23',time:'2018-09-13 09:11:11',_checked:false},
      {name:'1#机器人',co:'67',template:'23',ch4:'23',time:'2018-09-15 09:11:11',_checked:false},
      {name:'3#机器人',co:'67',template:'23',ch4:'23',time:'2018-09-15 09:11:11',_checked:false},
      {name:'3#机器人',co:'67',template:'23',ch4:'23',time:'2018-09-15 09:11:11',_checked:false},
      {name:'2#机器人',co:'67',template:'23',ch4:'23',time:'2018-09-15 09:11:11',_checked:false},
      {name:'1#机器人',co:'67',template:'23',ch4:'23',time:'2018-09-15 09:11:11',_checked:false},
  ]
  ```
  不能使用 this.filterName.indexOf(tempObj) < 0 来判断。结果会将所有的name都至于filterName对象中。
  下面的对象中一共有几个机器人

  ```
  this.filterName = [];
  this.tableData.forEach((item,index) =>{
      let tempObj = {
          value:item.name,
          label:item.name
      }
      if(index === 0){
          this.filterName.push(tempObj)
      }else{
          if(this.filterName.map(item =>{ return item.value}).indexOf(item.name) <0 ){
              this.filterName.push(tempObj)
          }
      }
  })
  ```

3. require 使用实例
  for循环中使用require，由于js异步将会造成实际结果都是最后一个。所以在使用的过程中，最好是在for循环中使用function。在function中再使用require。
  在 D3渲染时：
   require('@/assets/power' + item.src)
    ```
    let animateGroup = this.svg.select("#animate-area")
                 .html('')

     data.forEach(item => {
         if (item.anime && item.isShow) {
         let currentImage = animateGroup.append('image')
         currentImage.attr("x", item.x)
             .attr("y", item.y)
             .attr("width", item.width)
             .attr("height", item.height)
             .attr('xlink:href', require('@/assets/power' + item.src))
             .attr("transform", item.rotate ? `rotate(${item.rotate}, ${item.x+item.width/2}, ${item.y+item.height/2})` : '')
             .transition()
                 .on('start', function repeat() {
                     d3.active(this)
                         .duration(item.anime.duration || 3000)
                         .ease(d3.easeLinear)
                         .attr("x", item.anime.x)
                         .attr("y", item.anime.y)
                     .transition()
                         .duration(0)
                         .attr("x", item.x)
                         .attr("y", item.y)
                     .transition()
                         .on('start', repeat)
                 })
     }
 })
```
PIXI.JS
```
drawImage: function(){
        let self = this;
        self.topologyList.image_list.forEach((item,index) =>{
            createDevice(item.x,item.y,item)
        })
        function createDevice(x, y,item) {
            let texture = PIXI.Texture.fromImage(require('@/assets/power' + item.src));
            // Scale mode for pixelation
            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            // create our little device friend..
            let device = new PIXI.Sprite(texture);

            // enable the device to be interactive... this will allow it to respond to mouse and touch events
            device.interactive = true;

            // this button mode will mean the hand cursor appears when you roll over the device with your mouse
            device.buttonMode = true;

            // center the device's anchor point
            device.anchor.set(0.5);

            // make it a bit bigger, so it's easier to grab
            device.scale.set(item.scale || 0.7);

            // setup events for mouse + touch using
            // the pointer events
            if(item.allow_click){
                device
                    .on('click', ondeviceClick)
            }

            device.x = x;
            device.y = y;
            device.name = item.index;
            /* device.alpha = index;
             device.blendMode = index;*/

            // add it to the stage
            self.app.stage.addChild(device);
        }

        function ondeviceClick(e){
            //console.log(e)
            console.log("=====设备被点击了=====")
            self.$emit('clickDeviceInstance',{instance:self.topologyList.image_list[this.name],type:'device'})
        }
    },

  ```
4.

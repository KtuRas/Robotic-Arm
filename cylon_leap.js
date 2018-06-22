var Cylon = require('cylon');

var portOpened = true;


//cylong js framework' u
Cylon.robot({
  connections: {
    leapmotion: { adaptor: 'leapmotion' },
    arduino: { adaptor: 'firmata', port: 'COM16' }
  },

  devices: {
    leapmotion: { driver: 'leapmotion' },
    led: { driver: 'led', pin: 13 , connection : "arduino" },
    servo1: { driver: 'servo', pin: 3 , connection: "arduino"},
    servo2: { driver: 'servo', pin: 5 , connection: "arduino"},
    servo3: { driver: 'servo', pin: 6 , connection: "arduino"},
    servo4: { driver: 'servo', pin: 10 , connection: "arduino"},
    servo5: { driver: 'servo', pin: 11 , connection: "arduino"}
  },

  
  work: function(my) {
    var angle1 = 20;
    var angle2 = 20;
    var angle3 = 20;
    var fingerDistance = 60;
    var lastAngle1 = 80, lastAngle2 = 80, lastAngle3 = 80;
    var s_data = false;
    var samples = 20;

    //leap motion' dan her el verisi geldiğinde değeri al
    my.leapmotion.on('hand', function(hand) {
      //console.log(hand["ringFinger"]);
     //console.log(hand.palmPosition[0] + " " + hand.palmPosition[1]);
     angle1 = hand.palmPosition[0];
     angle2 = hand.palmPosition[1];
     angle3 = hand.palmPosition[2];

     var sumAngle1 = 0, sumAngle2 = 0, sumAngle3 = 0;
     for(var i = 0; i < samples ; i++)
     {
      sumAngle1 += angle1;
      sumAngle2 += angle2;
      sumAngle3 += angle3;
     }

     angle1 = parseInt(sumAngle1 / samples);
     angle2 = parseInt(sumAngle2 / samples);
     angle3 = parseInt(sumAngle3 / samples);

     //console.log(hand["thumb"]["positions"]);
     s_data = true;
    });

    my.leapmotion.on('frame', function(frame){

      //kıskaç hareketi için başparmak ve işaret parmağı arasındaki
      //mesafeyi hesapla
      if(frame.pointables.length > 1)
      {
        var f1 = frame.pointables[0];
        var f2 = frame.pointables[1];

        fingerDistance = distance(f1.tipPosition[0],f1.tipPosition[1],f1.tipPosition[2],f2.tipPosition[0],f2.tipPosition[1],f2.tipPosition[2]);
        fingerDistance = parseInt(fingerDistance);

        //console.log(fingerDistance);

        fingerDistance = 170 - fingerDistance;

        s_data = true;
      }
    });
    
    //her 30 ms' de bir servo değerlerini güncelle
    every((30), function() {
      angle1 = (angle1 + 160) / 2;
      if(angle1 < 10) angle1 = 10;
      if(angle1 > 160) angle1 = 160;

      angle2 = (angle2) / 4;
      if(angle2 < 10) angle2 = 10;
      if(angle2 > 160) angle2 = 160;

      angle3 = (angle3 + 160) / 2;
      if(angle3 < 10) angle3 = 10;
      if(angle3 > 160) angle3 = 160;

      //angle2 = 160 - angle2;

      if(!s_data)
      {
        angle1 = 80;
        angle2 = 80;
        angle3 = 80;
      }

      //console.log(Math.floor(angle1) + "\t" + Math.floor(angle2) + "\t" + Math.floor(angle3));
      if(angle1 > lastAngle1) lastAngle1++;
      if(angle1 < lastAngle1) lastAngle1--;

      if(angle2 > lastAngle2) lastAngle2++;
      if(angle2 < lastAngle2) lastAngle2--;

      if(angle3 > lastAngle3) lastAngle3++;
      if(angle3 < lastAngle3) lastAngle3--;

      //servoların sırası leapmotion' dan alınan verilere göre değiştirilebilir
      //servo bağlantıları yapılmadan önce konsoldan açıların sırası kontrol edilmelidir.
      my.servo1.angle(lastAngle3);
      my.servo2.angle(lastAngle2);
      my.servo3.angle(lastAngle1);
      my.servo4.angle(10);
      my.servo5.angle(fingerDistance);
      

      //açıları konsola yazdır
      console.log("#|" + lastAngle1 + "|" + lastAngle2 + "|" + lastAngle3 + "|" + "10|" + fingerDistance  + "\n\r");

      s_data = false;
    });
  }

}).start();

function distance(x1,y1,z1,x2,y2,z2) {
  return Math.sqrt(square(x2-x1)+square(y2-y1)+square(z2-z1));
}

function square(x) {
  return x*x;
}


<h1>Leap Motion Kontrollü Robotik Kol</h1>

<p>Bu projede 5 Eksen robot kolun kontrolü Leap Motion sensör kullanılarak kablosuz olarak gerçekleştirilmiştir.</p>
<p>Projede amaç el hareketlerinin kumandaya göre daha hassas olarak roota aktarılmsadır.</p>

<p>Leap Motion' dan 3 boyutlu eksende alınan elin konumu kinematik denklemler kullanılmadan robot kola aktarılmıştır. 
    Hareketlerin esnek olması için oransal değişim kullanılmıştır. Kısakaç hareketi için baş ve işaret parmak arasındaki 
    mesafe ölçülerek kıskaca açı ddeğeri olarak aktarılmıştır.
</p>

## Projede kullanılan yazılımlar
<ul>
    <li>Arduino
    </li>
    <li>Nodejs</li>
</ul>

## Projede kullanılan donanımlar
<ul>
    <li>Arduino Mega</li>
    <li>Leap Motion</li>
    <li>xBee (2 Adet)</li>
    <li>xBee Usb Adaptör</li>
    <li>5 Eksen Robot Kol</li>
    <li>5V 50A SMPS</li>
</ul>

<p>Projede Xbee Cylon.js ile Arduino' da yüklü olan firmata' yı kablosuz olarak haberleştirmek
     için kullanılmıştır. Xbee Explorer' ın bağlı olduğu seri port' u "cylon_leap.js" isimli dosyadaki 
    port name değişkenine yazmanız haberleşme için yeterli<b>(*)</b> olacaktır.
</p>

<p> <b>(*)</b> Projede xbee kullanımı opsiyoneldir. Arduino' yu kablo ile doğrudan biligsayarınıza bağlarsanız 
    yazılım sorunsuz çalışacaktır. Xbee kullanacaksanız da ayarlarının doğru yağıldığından ve iki Xbee' nin 
    aralarında sorunsuz haberleştiğinden emin olmalısınız
</p>

<center>
    <img src="/images/arm.jpg" alt="" height="300" width="300">
</center>

...
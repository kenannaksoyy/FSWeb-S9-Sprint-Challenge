import React,{useState} from 'react'
import axios from 'axios';



export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
    const [oyuncu, setOyuncu] = useState({
    initialMessage : '',
    initialEmail : '' ,
    initialSteps :0,
    initialIndex : 4 //  "B" nin bulunduğu indexi
  });

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    let x,y;
    x=oyuncu["initialIndex"]%3+1;
    y=parseInt(oyuncu["initialIndex"]/3)+1;
    return [x,y];
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    const [x,y]=getXY();
    return `Kordinatlar (${x},${y})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setOyuncu({
      initialMessage : '',
      initialEmail : '' ,
      initialSteps :0,
      initialIndex : 4 //  "B" nin bulunduğu indexi
    });
    console.log("Resetlendi");
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    let kontrol=false;
    let [x,y]=getXY();
    let maliyet=0;
    if(yon==="Yukari" && y-1>0){
      kontrol=true;maliyet=-3;
    }
    if(yon==="Asagi" && y+1<4){
      kontrol=true;maliyet=3;
    }
    if(yon==="Sol" && x-1>0){
      kontrol=true;maliyet=-1;
    }
    if(yon==="Sag" && x+1<4){
      kontrol=true;maliyet=1;
    }

    if(kontrol){
      ilerle(maliyet);
    }
    else{
      setOyuncu({
        ...oyuncu,
        ["initialMessage"]:`${yon} yone dogru gidemezsin`
      });
    }
  }

  function ilerle(index) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    setOyuncu(previousInputs => ({ ...previousInputs,["initialIndex"]:oyuncu["initialIndex"]+(index)}));
    setOyuncu(previousInputs => ({ ...previousInputs,["initialSteps"]:oyuncu["initialSteps"]+1 }));
    setOyuncu(previousInputs => ({ ...previousInputs,["initialMessage"]:"" }));
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setOyuncu({
      ...oyuncu,
      ["initialEmail"]:evt.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let [x,y]=getXY();
    const obje = {
      "x": x, "y": y, "steps": oyuncu["initialSteps"], "email": oyuncu["initialEmail"]
    }
    axios
    .post("http://localhost:9000/api/result",obje)
    .then(res =>{
        console.log(res.data);
        reset();
    })
    .catch(err => {
        console.error('Sunucu İsleyemedi', err);
    });
};

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{oyuncu["initialSteps"]} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === oyuncu["initialIndex"] ? ' active' : ''}`}>
              {idx === oyuncu["initialIndex"] ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{oyuncu["initialMessage"]}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={()=>{sonrakiIndex("Sol")}}>SOL</button>
        <button id="up" onClick={()=>{sonrakiIndex("Yukari")}}>YUKARI</button>
        <button id="right" onClick={()=>{sonrakiIndex("Sag")}}>SAĞ</button>
        <button id="down" onClick={()=>{sonrakiIndex("Asagi")}}>AŞAĞI</button>
        <button id="reset" onClick={()=>{reset()}}>reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input id="email" type="email" placeholder="email girin" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

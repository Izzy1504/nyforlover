import React, { useState } from 'react';
import Slide from './components/Slide';
import Countdown from './components/Countdown';
import Fireworks from './components/Fireworks';
import BackgroundMusic from './components/BackgroundMusic';
import './App.css';

function App() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(-1);
    const [startMusic, setStartMusic] = useState(false);
    const slides = [
        {content: "Chúc Mừng Năm Mới 2024! 🎊"},
        {content: "Bắt đầu một năm mới thật nhiều hạnh phúc và sự trưởng thành sau 1 năm đã qua ✨"},
        {content: "Sau một năm qua, chúng ta đã trải qua bao nhiêu thăng trầm và mệt mỏi cũng như các lần cãi nhau . Tuy nhiên đó chỉ là những khó khăn mà anh hay em phải gặp trong chuyến hành trình này nèee :3 .Nhờ đó chúng ta cũng trưởng thành hơn, yêu nhau hơn và càng thấu hiểu nhau.! 🌟"},
        {content: "Tuy trong hành trình này bản thân anh và em cũng có nhiều sai sót và lỗi lầm. Năm mới đến chúng ta cùng nhau xoá bỏ mọi chuyện cũ nhen bé iuu , đừng để những vết thương đó tồn tại sâu trong tâm mà hãy xem nó là những mảnh ghép để đưa anh và em đến cái kết siuu có hậu là đám cưới lunn nạaa :3 🌈"},
        {content: "Anh mong là chúng ta sẽ có thật nhiều hạnh phúc và đón năm mới tới già cùng nhau nha vợ iuuu :3 🎆 🎇 🎆 🎀"},
        {content: "Chúc mừng năm với vợ yêu của anhh :3"},
        {content: "Năm mới anh chúc em bé tuổi mới thật là trưởng thành, vui vẻ hong bị sầu, buồn và đặc biệt phải ở bên anh mãi nheee :3"},
        {content: "Àaa còn nữa, emm phải học giỏi nè, điểm A thật nhìu và có cơ hội việc làmmm siu cấp đỉnh nóc kịch trần nhenn :3"},
        {content: "Anhh yêu vợ anh nhất trên đời này luôn ❤ ❣ ☼ ❤️‍🔥 😻  💖 🧧 🎇 , chúc em có một năm mới thật nhiều niềm vui và hạnh phúc nhaaa ❤️‍🔥 🎇 🎆 🎉"},


    ];

    const handleSlideChange = () => {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }

    const onCountdownComplete = () => {
      setCurrentSlideIndex(0);
      setStartMusic(true);
    }

    return (
        <div className="app" style={{
          position: 'relative', 
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '10px'
        }}>
          <BackgroundMusic playOnMount={startMusic} />
          <Fireworks />
          {currentSlideIndex === -1 ?
            <Countdown targetDate={new Date(new Date().getFullYear(), 11, 31, 23, 59, 59)} onComplete={onCountdownComplete}/>
            :
          <>
            {
              slides.map((slide, index) => (
                <div 
                  key={index}
                  className="slides-container" 
                  style={{
                    display: currentSlideIndex === index ? 'block' : 'none',
                    maxWidth: '90vw',
                    margin: '0 auto',
                    wordBreak: 'break-word'
                  }}
                >
                  <Slide 
                    content={slide.content} 
                    duration={25} 
                    onSlideChange={handleSlideChange}
                  />
                </div>
              ))
            }
          </>
        }
        </div>
    );
}

export default App;
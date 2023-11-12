import React, { useState, useRef } from "react";
import axios from "axios";
import styled from 'styled-components';
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
import ScrollReveal from "scrollreveal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Title = styled.h1`
/* デスクトップ向けのスタイル */
@media (min-width: 1300px) {
  font-size:50px;
  margin-bottom: 10px;
}
/* スマホ向けのスタイル */
@media (max-width: 1300px) {
  font-size:20px;
}
  font-family:'Roboto', sans-serif;
  color: #333;
`;



const Description = styled.p`
/* スマホ向けのスタイル */
@media (max-width: 1300px) {
  display: none;
}
  font-size: 16px;
  font-family:'Roboto', sans-serif;
  color: #777;
  text-align: center;
`;




const Container = styled.div`
  /* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 80vw;
    margin: 0px auto;
    margin-top: 20px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const Container2 = styled.div`

  /* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    // max-width: 55vw;
    max-width: 1040px;
    margin: 0px auto;
    margin-top: 80px;
    margin-bottom: 50px;
    padding: 50px;
    max-height: 60vh;
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 90vw;
    margin: 0px auto;
    margin-top: 20px;
    margin-bottom: 50px;
    padding-bottom: 30px;
    max-height: 90vh;
  }
  position: relative;
  border-radius: 30px;
  display: flex;
  align-items: top;
  justify-content: center;
  background: #fff;
`;

const Container3 = styled.div`
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    flex-direction: column;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container4 = styled.div`
  /* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    max-width: 1040px;
    padding: 50px;
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 90vw;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  border-radius: 30px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6); // 軽く透明な背景
`;


const Containerchar = styled.div`
  /* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    max-width: 1040px;
    padding: 50px;
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 90vw;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  border-radius: 30px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255 ,255, 255); // 軽く透明な背景
`;



const Container5 = styled.div`
/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    max-width: 1040px;
    padding: 50px;
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 90vw;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 20px;
    margin-left: 20px;
  }
  border-radius: 30px;
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(5, 5, 5, 0.2); // 軽く透明な背景
`;

const Container6 = styled.div`
/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    max-width: 1040px;
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 100vw;
  }
  border-radius: 30px;
  // max-width: 1300px;
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const Container7 = styled.div`
  /* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 80vw;
    margin: 0px auto;
    margin-top: 20px;
  }
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100vw;
  
`;


const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
  color: #5b5b5b;
  cursor: pointer;
  transition: all 1000ms;
  overflow: hidden;
  &:disabled {
    color: #848484;
    background-color: #bebebe;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    color: #333;
    transform: scale(1.1);
    outline: 1px solid #333;
    box-shadow: 4px 5px 17px -4px #268391;
  }
  &:not(:disabled)::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: #cff7e8;
    transform: skewX(45deg);
    z-index: -1;
    transition: width 1000ms;
  }
  &:not(:disabled):hover::before {
    width: 150%;
  }
`;


const ButtonSetting = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
  color: #5b5b5b;
  cursor: pointer;
  transition: all 1000ms;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0px;
  zIndex: 999;

  &:disabled {
    color: #848484;
    background-color: #bebebe;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    color: #333;
    transform: scale(1.1);
    outline: 1px solid #333;
    box-shadow: 4px 5px 17px -4px #268391;
  }
  &:not(:disabled)::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: #cff7e8;
    transform: skewX(45deg);
    z-index: -1;
    transition: width 1000ms;
  }
  &:not(:disabled):hover::before {
    width: 150%;
  }
`;



const LoadingIndicator = styled.div`
  margin: 20px 0;
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top: 4px solid #000;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;


const ZundamonImage = styled.img`

/* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 30vw;
    display: none;
  }
  width: 600px;  // 必要に応じて画像のサイズを調整します
  height: 600px;
  animation: floatAnimation 2s infinite alternate;

  @keyframes floatAnimation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-40px);
    }
  }
`;

const ZundamonImageMobile = styled.img`

/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    display: none;
  }

  max-height: 30vh;  // 必要に応じて画像のサイズを調整します
  animation: floatAnimation 2s infinite alternate;

  @keyframes floatAnimation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-40px);
    }
  }
`;

const Images = styled.img`

/* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 20vw;
  }
  margin: 20px;
  max-height:20vh;
  // max-height: 300px;
  //丸める
  border-radius: 30%;
  display: block;
`;

const Images2 = styled.img`
/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    max-width: 1040px;
  }
/* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 95vw;
  }
  // display: block;
`;


const ZundamonImageSelif = styled.img`

  /* スマホ向けのスタイル */
    @media (max-width: 1300px) {
      max-width: 30vw;
      // display: none;
  }
  max-width: 300px;  // 必要に応じて画像のサイズを調整します
  animation: floatAnimation 2s infinite alternate;

  @keyframes floatAnimation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
`;


const StyledHeader = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  text-align: center;
  color: #333;
  // border-bottom: 2px solid #333;
  padding-bottom: 8px;
  margin-bottom: 20px;
`;

const StyledParagraph = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #555;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto; // センタリング
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 軽い影
`;

const SelifParagraph = styled(StyledParagraph)`
/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    width: 400px;
    padding-right: 40px; // 吹き出しの部分のスペースを確保
    &:after {
      content: "";
      position: absolute;
      top: 20%;
      right: -20px; // 三角形のベースの位置
      transform: translateY(-50%);
      border-left: 20px solid rgba(255, 255, 255, 0.9); // 吹き出しの背景色である白色を指定
      border-top: 0px solid transparent;
      border-bottom: 20px solid transparent;
    }
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 70vw;
    margin-right: 10px;
    margin-left: 10px;
    &:after {
      content: "";
      position: absolute;
      top: 20%;
    }
  }
  position: relative;
  margin : 50;
`;


const FadeInSection = styled.div`
  transform: translateY(${props => (props.isVisible ? '0' : '50px')});
  opacity: ${props => (props.isVisible ? '1' : '0')};
  transition: transform 1s, opacity 1s;
`;

const FadeInSection2 = styled.div`
  transform: translateY(${props => (props.isVisible ? '0' : '50px')});
  opacity: ${props => (props.isVisible ? '1' : '0')};
  transition: transform 1s, opacity 1s;
`;

class TtsQuestV3Voicevox extends Audio {
  constructor(speakerId, text, ttsQuestApiKey) {
    super();
    var params = {};
    params['key'] = ttsQuestApiKey;
    params['speaker'] = speakerId;
    params['text'] = text;
    const query = new URLSearchParams(params);
    this.#main(this, query);
  }
  #main(owner, query) {
    if (owner.src.length>0) return;
    var apiUrl = 'https://api.tts.quest/v3/voicevox/synthesis';
    fetch(apiUrl + '?' + query.toString())
    .then(response => response.json())
    .then(response => {
      if (typeof response.retryAfter !== 'undefined') {
        setTimeout(owner.#main, 1000*(1+response.retryAfter), owner, query);
      }
      else if (typeof response.mp3StreamingUrl !== 'undefined') {
        owner.src = response.mp3StreamingUrl;
      }
      else if (typeof response.errorMessage !== 'undefined') {
        throw new Error(response.errorMessage);
      }
      else {
        throw new Error("serverError");
      }
    });
  }
}



const App = () => {
  const [recording, setRecording] = useState(false);
  const [frist, setFrist] = useState(true);
  const [audioData, setAudioData] = useState(null);
  const [audioDatas, setAudioDatas] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [sagemakerAudio, setSagemakerAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(6);
  const [selectchar, setselectchar] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("man");
  const [text, setText] = useState("")
  const countdownIntervalRef = useRef(); // setIntervalのIDを保存するためのref
  const countdownTimeoutRef = useRef();  // setTimeoutのIDを保存するためのref
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  const [backgroundColor, setBackgroundColor] = useState('#cff7e8');

  // 指定された色に背景色を変更する関数
  const changeBackgroundColor = (newColor) => {
    setBackgroundColor(newColor);
  };

  // バックグラウンドスタイル
  const backgroundStyle = {
    transition: 'background-color 1s ease', // 1秒かけて背景色が変わる
    backgroundColor: backgroundColor, // 現在の背景色
    height: '100%', // 画面全体をカバー
    width: '99vw',
    position: "relative",
    top: 0,
    left: 0,
    overflow:"hidden"
  };

  // コンポーネントがマウントされた後、特定の色に変更

  const AudioButton = (props) => {
    // オーディオと再生状態を管理するための状態
    const [audio] = useState(new Audio(props.audio));
    const [isPlaying, setIsPlaying] = useState(false);
  
    // ボタンをクリックしたときの動作
    const togglePlay = () => {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying); // 状態を反転させる
    };

    // オーディオが終了したときのイベントリスナーをセットアップ
    React.useEffect(() => {
      const handleAudioEnd = () => setIsPlaying(false);
      audio.addEventListener('ended', handleAudioEnd);
      // クリーンアップ関数
      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
      };
    }, [audio]);

  
    return (
      <button onClick={togglePlay} className="audio-button">
        {isPlaying ? '■' : '▶'}
      </button>
    );
  };

  const AudioButtonDL = (props) => {
    // オーディオと再生状態を管理するための状態
    
    const togglePlay = () => {
      const audio = new TtsQuestV3Voicevox(3, props.selif, "w58_55m7T_e_110");
      audio.play();
      setText("")
    };

    

    return (
      <button onClick={togglePlay} className="audio-button2">
        ▶
      </button>
    );
  };


  const MainPage = (props) => { 
    return (
      <>
<Container2>
  
  <Container>
    <ButtonSetting >詳細設定</ButtonSetting>
    <Title>AI {props.name}</Title>
    {!recording && !loading && <ZundamonImageMobile src={props.png} alt={props.name} />}
    {recording && !loading && <ZundamonImageMobile  src={props.png_r} alt={props.name} />}
    {!recording && loading && <ZundamonImageMobile  src={props.png_s} alt={props.name} />}
        <Description>
          録音ボタンをクリックして録音を開始 
        </Description>
        <Description>
          停止ボタンをクリックして録音を停止
        </Description>     
        <Description>
          その後、サーバーへ送信して{props.name}になってください。
        </Description>

        <Container3>
        <Button onClick={handleStartRecording} disabled={recording}>
            録音ボタン 
        </Button>

        <Button onClick={handleStopRecording} disabled={!recording}>
            録音停止ボタン
        </Button>
        <Button onClick={handleSendToAPIGateway} disabled={!audioData}>
            AIで{props.name}
        </Button>

          <div className="mydict">
      <div>
        <label>
          <input type="radio" name={props.name} value="man" onChange={handleOptionChange} checked={selectedOption === 'man'}/>
          <span>男性</span>
        </label>
        <label>
          <input type="radio" name={props.name} value="woman" onChange={handleOptionChange} checked={selectedOption === 'woman'}/>
          <span>女性</span>
        </label>
      </div>
    </div>

        </Container3>
        {recording && <LoadingIndicator />}
        {recording && <div>残り時間: {countdown}秒</div>}
        {loading && <LoadingIndicator />}

        {audioData && <audio src={audioData} controls />}
        {sagemakerAudio && (
            <div>
                
                <audio src={sagemakerAudio} controls  />
            </div>
        )}
  </Container>
    {!recording && !loading && <ZundamonImage src={props.png} alt={props.name} />}
    {recording && !loading && <ZundamonImage src={props.png_r} alt={props.name} />}
    {!recording && loading && <ZundamonImage src={props.png_s} alt={props.name} />}
</Container2>



</>
    );
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 100) { // 例: 100pxスクロールしたら表示
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  React.useEffect(() => {
    const handleScroll2 = () => {
      const position = window.scrollY;
      if (position > 700) { // 例: 100pxスクロールしたら表示
        setIsVisible2(true);
      } else {
        setIsVisible2(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll2);
  
    return () => {
      window.removeEventListener('scroll', handleScroll2);
    };
  }, []);

  
  const Scroll = ({ children }) => {

    const sectionRef = useRef();
    React.useEffect(() => {
      if (sectionRef.current) {
        ScrollReveal().reveal(sectionRef.current, {
          reset: true,
          delay: 200,
          opacity: 0,
          distance: "40px",
          viewFactor: 0.36,
        });
      }
    },[]);
  
    return (<section ref={sectionRef}>{children}</section>)
  }

  const ScrollScale = ({ children }) => {

    const sectionRef = useRef();
    React.useEffect(() => {
      if (sectionRef.current) {
        ScrollReveal().reveal(sectionRef.current, {
          reset: true,
          delay: 70,
          scale: 0.5,
          opacity: 0,
          distance: "40px",
          viewFactor: 0.36,
        });
      }
    },[]);
  
    return (<section ref={sectionRef}>{children}</section>)
  }





  const handleStartRecording = async () => {
    //二回目以降の録音のために初期化
    if(frist === true){
      await register(await connect());
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream , { mimeType: 'audio/wav' });
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setAudioData(URL.createObjectURL(audioBlob));
      setAudioDatas(audioBlob);
    };

    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    setRecording(true);
    console.log(selectedOption);
    
    setCountdown(4); // カウントダウンをリセット
    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // 6秒後に録音を自動的に停止する
    countdownTimeoutRef.current = setTimeout(() => {
      handleStopRecording();
    }, 4000);
    
  };

  const handleStopRecording = () => {
    clearInterval(countdownIntervalRef.current);
    clearTimeout(countdownTimeoutRef.current);
    setFrist(false);
    mediaRecorderRef.current.stop();
    setRecording(false);
    
  };


  const getCharName = (selectchar) => {
    switch (selectchar) {
      case 0:
        return "zunda";
      case 1:
        return "metan";
      case 2:
        return "kiritan";
      default:
        return "zunda";
    }
  };


  const handleSendToAPIGateway = async () => {
    if (audioData) {
      setLoading(true); 
      const charname = getCharName(selectchar);
      console.log(charname);
      const formData = new FormData();
      formData.append('audio', audioDatas); // 'audio' はバックエンドでの受け取りキーと一致する必要があります
        // FileReaderを使用してオーディオデータをBase64にエンコード
      const reader = new FileReader();
      reader.readAsDataURL(audioDatas); // audioDatasはBlobまたはFileオブジェクト
      reader.onloadend = async () => {
        const base64Audio = reader.result;
        const audio2 = base64Audio.split(",")[1];
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "audio/wav",  
            },
            responseType: 'blob',
        };

            // 性別とモデル名をJSONオブジェクトとして追加
      
      const additionalData = {
        gender: selectedOption, // または適切な変数
        modelName: charname, // モデル名を指定
        audioDataa: audio2,
      };

        try {
          if(selectedOption === "man"){
            console.log("mamamamama");
            const randomint = Math.floor( Math.random() * 2 ) ;
            console.log(randomint);
            if(randomint === 0){
              const response = await axios.post("https://t3o2ikhypd.execute-api.ap-southeast-2.amazonaws.com/zunda", additionalData, config);
              const audioURL = URL.createObjectURL(response.data);
              setSagemakerAudio(audioURL);
            }
            else
            {
              const response = await axios.post("https://t3o2ikhypd.execute-api.ap-southeast-2.amazonaws.com/zunda", additionalData, config);
              const audioURL = URL.createObjectURL(response.data);
              setSagemakerAudio(audioURL);
            }

          }
          else{
            console.log("wawawawawa");  
            const response = await axios.post("https://6kpyevi158.execute-api.ap-southeast-2.amazonaws.com/woo", additionalData, config);
            const audioURL = URL.createObjectURL(response.data);
            setSagemakerAudio(audioURL);      
          }

        } catch (error) {
            console.error("Error sending data to API Gateway:", error);
        } finally {
            setLoading(false);
        }

        reader.onerror = () => {
          console.error("Error reading audio file");
          setLoading(false);
      };
    }
    }
};

return (
  <div style={backgroundStyle}>
  <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={true}
      realIndex
      noSwiping = "input"
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(swiper) => {
        console.log(swiper.realIndex)
        setselectchar(swiper.realIndex)
        if(swiper.realIndex === 0)
          changeBackgroundColor('#cff7e8');
        else if(swiper.realIndex === 1)
          changeBackgroundColor('#eebbcb');
        else if(swiper.realIndex === 2)
          changeBackgroundColor('#b28c6e');
          
      }}
    >
      <SwiperSlide>
      <MainPage name="ずんだもん" png="/zunda.png" png_r="/zunda_recording.png" png_s="/zunda_server.png" ></MainPage>        
        <FadeInSection isVisible={isVisible}>

        <Containerchar>
        <ZundamonImageSelif src="/zunda.GIF" alt="Zundamon" />
          <Container7> 
            
              <div className="mydict">
            <Title>ずんだもん   </Title>
            <AudioButton audio="/zunda1.wav"></AudioButton>
            </div>
              <h3>ずんだ餅の精。やや不幸属性が備わっており、ないがしろにされることもしばしば。　
                最近はYouTubeでよく見かけるようになった。語尾に「なのだ」をつけるのが口癖。　 　
                　もともとは、音声合成ソフトのキャラクターであり、文字を音声に変換する。
              </h3>
              <Container3>
              <input  placeholder="セリフを入力"  className="input" value ={text} 
              onChange={(event) => setText(event.target.value)} 
              />
              <AudioButtonDL selif = {text}></AudioButtonDL>
              </Container3>

              
            

          </Container7>
        
      </Containerchar>
      </FadeInSection>
      </SwiperSlide>


      <SwiperSlide>
        <MainPage name="めたん" png="/metan.png" png_r="/metan_recording.png" png_s = "/metan_server.png" ></MainPage>

      </SwiperSlide>

      <SwiperSlide>
        <MainPage name="きりたん" png="/kiritan.png" png_r="/kiritan_recording.png" png_s = "/kiritan_server.png"></MainPage>

      </SwiperSlide>




    </Swiper>

    <FadeInSection2 isVisible={isVisible2}>

  <StyledHeader>AIずんだもんの作り方</StyledHeader>
      <Container4>
      <SelifParagraph>
        ずんだもんなのだ。今日はAIずんだもんの作り方を解説するのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_teage.png" alt="Zundamon" />
    
      </Container4>
      </FadeInSection2>

      <ScrollScale>
      <Container5>
        <Images src="/react.jpg" alt="Zundamon" />
        <Images src="/rvc.webp" alt="Zundamon" />
        <Images src="/sagemaker.png" alt="Zundamon" />
      </Container5>
      </ScrollScale>


      <Scroll>
      <Container4>
      <SelifParagraph>
      使用した技術はこんな感じなのだ！ひとつずつ解説するのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_yubisasi.png" alt="Zundamon" />
    
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <Images src="/rvc.webp" alt="Zundamon" />
      <SelifParagraph>
      こいつはRVCという音声変換機械学習モデルなのだ。ざっくりいうとユーザの声を変換するAIなのだ。今回はこのRVCを使ってずんだもんの声を作ったのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_server.png" alt="Zundamon" />
    
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <Images src="/sagemaker.png" alt="Zundamon" />
      <SelifParagraph>
      上のRVCをAWS上で動かすためにSageMakerというサービスを使ったのだ。SageMakerは機械学習モデルをデプロイできるサービスなのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_recording.png" alt="Zundamon" />
        
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <SelifParagraph>
      より具体的に言うと、SageMakerでデプロイしたエンドポイントはリアルタイム推論になるように設定したのだ。
      ml.m4.xlargeというインスタンスを使っているのだ。料金が時間あたりに0.2ドルほどかかるからインスタンスの数を5に設定すると、1時間あたり1ドルほどかかるのだ。
      チームといえど法人じゃないので、この出費は痛いのだ。需要はあると思うので，マネタイズの方法を考えているのだ。
      AWSから移行して、GCPのAI Platformに移行するのも考えているのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_jito.png" alt="Zundamon" />
        
      </Container4>
      </Scroll>
      <Scroll>
      <Container6>
        <Images2 src="/apiflow.png" alt="Zundamon" />
       </Container6>
      </Scroll>
      <Scroll>
      <Container4>
      <SelifParagraph>
      上の図のように、より詳しく言うとSageMakerでデプロイしたエンドポイントとAPI GateWayを組み合わせてAPIを作ったのだ。このAPIにリクエストを送るのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda.png" alt="Zundamon" />
        
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
    
      <SelifParagraph>
      API Gatewayには30秒制限という、ユーザーにパケットが返ってくるまでの時間の制限があるのだ。
      だから今回は録音時間を4秒に設定しているのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_nae.png" alt="Zundamon" />
        
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <Images src="/react.jpg" alt="Zundamon" />
      <SelifParagraph>
      最後にReactなのだ。これは、このサイトを作るために使ったフレームワークなのだ。ReactはJavaScriptのライブラリなのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_teage.png" alt="Zundamon" />
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <Images src="/atom.png" alt="Zundamon" />
      <SelifParagraph>
      styled-componentsを使って、CSSを書いているのだ。Reactを使った理由は大規模になった時に、コンポーネントを使って管理しやすいからなのだ。
      より技術的なことは、Qiitaに後日まとめる予定なのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_jito.png" alt="Zundamon" />
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <SelifParagraph>
      ここに挙げたすべての技術は、今回使うのが初めてだったのだ．．．だから完成させるのが大変だったのだ。でも、なんとか公開まですることができたのだ！
      特にAWSの知識がなかったので、AWSのドキュメントを読み漁ったのだ。大変だったのだ．．．
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_kosi.png" alt="Zundamon" />
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <SelifParagraph>
      説明動画の<a href="https://youtu.be/-wveWR9qSKw?si=6_TLZzJgWTqbN4jy" target= "blank" >リンク</a>を貼っておくのだ。よかったら見てほしいのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_yubisasi.png" alt="Zundamon" />
      </Container4>
      </Scroll>
      
  </div>
);
};

export default App;
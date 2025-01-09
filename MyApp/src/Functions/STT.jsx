import {useState,useEffect} from "react";


function SpeechToText(){
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition 
    const recognition = new SpeechRecognition();

    useEffect(()=>{
        recognition.interimResults = true;
        recognition.continuous =true;

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results).map((result) => result[0].transcript).join("");
            setText(transcript);
        };

        recognition.onend = () => {
            if (isListening) {
              recognition.start(); // Restart listening if stopped unintentionally
            }
        };

        return () => {
            recognition.stop();
          };
    }, [isListening, recognition])

    const handleOnRecord = () => {
        if (!isListening) {
          setIsListening(true);
          recognition.start();
          console.log("working")
        }
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    return text;
}

export default SpeechToText;
//export {handleOnRecord,stopListening};
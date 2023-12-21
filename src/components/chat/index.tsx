import { useEffect, useState } from 'react';
import './chat.css';
import { TChatProps } from './types';
import { startConversation } from './helpers';

export const Chat = ({ socket, authToken, purposeId }: TChatProps) => {
    const [chatConfig, setChatConfig] = useState({
        name: '',
        salute: '',
        conversationId: null,
        purpose: purposeId,
        token: authToken
    })

    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const chatMessage = {
        type: "user",
        text: prompt,
        imageB64: "",
    }
    // const [messages, setMessages] = useState([])


    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to server');
        })

        socket.on('hello', () => {
            console.log('Server says hello');
        })

        const getConversationInitialData = async () => {
            const data = await startConversation(purposeId, authToken)
            return data
        }

        getConversationInitialData().then((data) => {
            const startData = {
                purpose: purposeId,
                token: authToken,
                conversationId: data.conversation_id
            }
            handleChange({ salute: data.salute, name: data.name, conversationId: data.conversation_id })
            socket.emit('start', startData)
        });




        return () => {

        }

    }, [])

    useEffect(() => {
        socket.on("sources", (message) => {
            console.log("response", message);
        });

        socket.on("response", (message) => {
            console.log("response", message);
        });

        return () => {
            socket.off("response");
        }
    }, [loading]);

    const handleChange = (modifications: object) => {
        setChatConfig((prev) => (
            {
                ...prev,
                ...modifications
            }
        ))
    }

    const handleSubmission = () => {
        console.log("Sending message");
        setLoading(true)
        socket.emit('message', getMessageData())
        setLoading(false)
    }

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    }


    const getMessageData = () => {
        const data = {
            "message": chatMessage,
            "data": {
                "conversationID": chatConfig.conversationId,
                "purpose": chatConfig.purpose,
                "token": chatConfig.token
            }
        }
        return data
    }

    return (
        <div className="chat-container">
            <section className='chat-header'>
                <h1>{chatConfig.name}</h1>
                <p>{chatConfig.salute}</p>
            </section>
            <section className='chat-messages'>
            </section>
            <section className='chat-input'>
                <textarea name="chat-input" id="" onChange={handlePromptChange}></textarea>
                <button onClick={handleSubmission}>Send Message</button>

            </section>
        </div>
    );
}
import { Chat } from "./components/chat"
import { io } from "socket.io-client";
function Home() {
  const innerSocket = io("http://localhost:8000");

  return (
    <>
      <Chat socket={innerSocket} purposeId={21} authToken="f32c1c940d05b66af2d97c3c26c04aa2def31433" />
    </>
  )
}

export default Home

import { Socket } from "socket.io-client"

export type TChatProps = {
    socket: Socket
    purposeId: number
    authToken: string
}
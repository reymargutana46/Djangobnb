'use client';

import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket, {ReadyState} from 'react-use-websocket';

interface ConversationDetailProps {
    userId: string;
    token: string;
    conversation: ConversationType;
}
const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    conversation
}) => {
    const myUser = conversation.users?.find((user) => user.id == userId)
    const otherUser = conversation.users?.find((user) => user.id != userId)

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`), {
        share: false,
        shouldReconnect: () => true,
    },

    useEffect(() => {
        console.log("Connection state changed", readyState);
    }, [readyState])
    

    return (
        <>
            <div className="max-h-[400px] overflow-auto flex-col space-y-4">
                {conversation.messages?.map((message: any) => {
                    const isCurrentUser = message.created_by.id === userId;
                    return (
                        <div 
                            key={message.id}
                            className={`w-[80%] py-4 px-6 rounded-xl bg-gray-200 ${isCurrentUser ? 'ml-[20%]' : ''}`}
                        >
                            <p className="font-bold text-gray-500">{message.created_by.name}</p>
                            <p>{message.body}</p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 py-6 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                />

                <CustomButton 
                    label='Send'
                    onClick={() => console.log('Clicked')}
                    className="w-[100px]"
                />
            </div>
        </>
    )
}

export default ConversationDetail;

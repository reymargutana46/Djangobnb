import { getUserId, getAccessToken } from "../lib/actions";
import apiService from "../services/apiService";
import Conversation from "../components/inbox/Conversation";

export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
}

export type ConversationType = {
    id: string;
    users: UserType[];
}

const InboxPage = async () => {
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    let conversations = [];
    try {
        const response = await apiService.get(`/api/chat/`);
        conversations = Array.isArray(response) ? response : [];
        

    } catch (error) {
        console.error('Error fetching conversations:', error);
        conversations = [];
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <h1 className="my-6 text-2xl">Inbox</h1>

            {conversations.length > 0 ? (
                conversations.map((conversation: ConversationType) => {
                    return (
                        <Conversation 
                            userId={userId}
                            key={conversation.id}
                            conversation={conversation}
                        />
                    )
                })
            ) : (
                <p>No conversations found.</p>
            )}
        </main>
    )
}

export default InboxPage;   

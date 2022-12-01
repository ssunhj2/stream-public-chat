import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Window } from "stream-chat-react";

//import './layout.css';

const client = StreamChat.getInstance("MY_KEY");

function App() {
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    (async () => {
      await client.setGuestUser({
          id: String(Math.floor(Math.random() * Date.now())),
          name: "Anonymous",
      });
      const channel = await client.channel("public-chat", "blabla", {
        name: "Bla Bla channel",
      });
      setChannel(channel);
    })();
    return () => {
      client.disconnectUser();
    };
  }, []);
  if(!channel) {
    return null;
  }
  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}
export default App;
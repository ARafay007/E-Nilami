import {useState, useEffect, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, List, ListItem, ListItemButton, ListItemText, Typography, TextField, Button} from '@mui/material';
// import io from 'socket.io-client';
import {UserContext} from '../ContextAPI/userContext';
import ChatDB from '../utils/firebase';
import { ref, onValue, child, get, set, update } from 'firebase/database';

// const socket  = io.connect('http://localhost:3005');

const Chat = () => {
  const [msg, setMsg] = useState('');
  const [contactList, setContactList] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedJoinId, setSelectedJoinId] = useState('');
  const [receiver, setReceiver] = useState('');
  const {user: {data: activeUser}, isChatExist, storeChat} = useContext(UserContext);
  const {state} = useLocation();
  const {sellerDetail} = state;

  useEffect(() => {
    getChatsName();
  }, []);

  // useEffect(() => {
  //   socket.on('recieveMsg', (data) => {
  //     const chat = JSON.parse(sessionStorage.getItem('chat'));

  //     const newMsgsList = chat.map(el => {
  //       if(el.joinId === data.joinId){
  //         el.msgs.push({userId: data.userId, text: data.message});
  //       }
  //       return el;
  //     });

  //      sessionStorage.setItem('chat', JSON.stringify(newMsgsList));
  //      setContactList(newMsgsList);
  //   })
  // }, [socket]);

  const getChatsName = async () => {
    const chatRef = ref(ChatDB, activeUser.name)

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      console.log('active user contact list', data);

    });

    // const chatIDs = activeUser.chats.map(el => el.chatId);

    // const resp = await fetch(`http://localhost:3005/api/v1/chat/chatList`, {
    //   method: 'POST',
    //   headers: {'Content-Type': 'Application/json'},
    //   body: JSON.stringify(chatIDs)
    // });

    // const {data} = await resp.json();

    // if(data.length){
    //   const list = data.map(el => {
    //     const obj = {joinId: el.joinId};
    //     obj.name = el.users[0].userId === activeUser._id ? el.users[1].name : el.users[0].name;
    //     obj.msgs = el.msgs;
    //     return obj;
    //   });

    //   sessionStorage.setItem('chat', JSON.stringify(list));
    //   setContactList(list);
    // }
  };

  const sendMsg = async () => {
    console.log(activeUser, sellerDetail);
    
    let joinId = selectedJoinId || `${activeUser._id}${sellerDetail._id}`;
    
    // First check chat record exist in context API or not
    if(isChatExist[joinId]){
      
    }
    else{
      const dbRef = ref(ChatDB);

      const chat = await get(child(dbRef, joinId));
      
      // Check if relative chat data exist in Firebase then update chat else create new chat
      if(chat.exists()) {
        console.log(chat.val());
      }
      else{
        // get active user contact list
        const msgSenderData = await get(child(dbRef, activeUser.name));
        // get seller contact list
        const sellerData = await get(child(dbRef, sellerDetail.name));

        // check sender contact list exist or not
        if(msgSenderData.exists()){
          const contactList = msgSenderData.val();

          const updateConnectionList = {
            [`connection_${contactList.contactsCount + 1}`]: {
              chatKey: joinId,
              name: sellerDetail.name,
            },
            contactsCount: contactList.contactsCount + 1,
          };

          const personRef = ref(ChatDB, activeUser.name);

          await update(personRef, updateConnectionList);
        }
        else{
          set(ref(ChatDB, activeUser.name), {
            connection_1: {
              chatKey: joinId,
              name: sellerDetail.name,
            },
            contactsCount: 1,
          });
        }

        // check seller contact list exist or not
        if(sellerData.exists()){
          const contactList = sellerData.val();

          const updateConnectionList = {
            [`connection_${contactList.contactsCount + 1}`]: {
              chatKey: joinId,
              name: activeUser.name,
            },
            contactsCount: contactList.contactsCount + 1,
          };

          const personRef = ref(ChatDB, sellerDetail.name);

          await update(personRef, updateConnectionList);
        }
        else{
          set(ref(ChatDB, sellerDetail.name), {
            connection_1: {
              chatKey: joinId,
              name: activeUser.name,
            },
            contactsCount: 1,
          });
        }

        set(ref(ChatDB, joinId), {
          [`${activeUser.name}_1`]: msg,
          msgsCount: 1,
        });

        // store chat in context API.
        storeChat({
          [joinId]: {
            [`${activeUser.name}_1`]: msg,
            msgsCount: 1,
          }
        });
      }
    }
  };

  const onChatSelect = (joinId, chatWith) => {
    setShowChat(true);
    setSelectedJoinId(joinId);
    setReceiver(chatWith);
  };

  const renderChatList = () => {
    return contactList?.map((el, index) => (
      <ListItem key={index} disablePadding onClick={() => onChatSelect(el.joinId, el.name)}>
        <ListItemButton>
          <ListItemText primary={el.name} />
        </ListItemButton>
      </ListItem>
    ));
  };

  const renderMsgs = () => {
    const contact = contactList?.filter(el => {
      if(el.joinId === selectedJoinId){
        return el;
      }
    });

    return contact[0]?.msgs?.map((el, index) => {
      return (
          <div key={index}>
            <div className={el.userId === activeUser._id ? "msg-box-sender" : 'msg-box-reciever'}>
              <div className={el.userId === activeUser._id ? 'msg' : 'msg2'}>
              {el.text}
              </div>
            </div>
          </div>
        );
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item sm={4} style={{border: '1px solid lightBlue', overflow: 'auto'}}>
        Chat List
        <List>
          {
            // renderChatList()
          }
        </List>  
      </Grid>
      <Grid item sm={8} style={{border: '1px solid lightBlue', padding: 0}}>
        <Box sx={{
          width: '100%',
          height: '500px',
        }}>
          <Box className='chatBox-conversation'>
            <Typography sx={{ pb: '10px' }}>{sellerDetail?.name || receiver}</Typography>
            {/* <Typography className='receiverName'>{sellerDetail?.name || receiver}</Typography> */}
            <Box style={{flexGrow: 8}} className='conversation'>
              {/* {showChat && renderMsgs()} */}
            </Box>
            <Box sx={{ display: 'flex'}}>
              <TextField placeholder='message...' sx={{ width: '87%'}} onChange={event => setMsg(event.target.value)} />
              <Button sx={{width: '10%'}} variant='outlined' onClick={sendMsg}>Send</Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Chat;
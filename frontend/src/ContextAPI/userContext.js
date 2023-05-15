import { useContext, createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
  const [ads, setAds] = useState({});
  const [user, setUser] = useState({});
  const [chat, setChat] = useState([]);

  const defineUser = (userObj) => setUser(userObj);
  const storeAds = adsObj => setAds(adsObj);
  const storeChat = chatData => setChat(chatData);

  return(
    <UserContext.Provider value={{user, defineUser, ads, storeAds, chat, storeChat}}>
      {children}
    </UserContext.Provider>
  );
}
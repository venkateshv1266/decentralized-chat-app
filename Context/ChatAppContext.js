import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { CheckIfWalletConnected, connectWallet, connectingWithContract } from '@/Utils/apiFeature'

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("")

    //CHAT USER DATA
    const [currentUserName, setCurrentUserName] = useState("")
    const [currentUserAddress, setCurrentUserAddress] = useState("")

    const router = useRouter();

    //FETCH DATA TIME OF PAGE LOAD
    const fetchData = async () => {
        try {
            //get contract
            const contract = await connectingWithContract();
            //get account
            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);

            //get my friend list
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            // //get all app users
            const userList = await contract.getAllAppUser();
            setUserLists(userList);
        } catch (error) {
            // setError("Please Install And Connect Your Wallet.");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    //READ MESSAGE
    const readMessage = async (friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            console.log("Currently You Have No Message");
        }
    }

    //CREATE ACCOUNT
    const createAccount = async ({ name, accountAddress }) => {
        try {
            if (!name && !accountAddress)
                return setError("Name and Account Address cannot be empty. Reload the browser and try again.")

            const contract = await connectingWithContract();
            const newUser = await contract.createAccount(name);
            setLoading(true);
            await newUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while creating your account. Please reload the browser.")
        }
    }

    //ADD YOUR FRIEND
    const addFriends = async ({ name, accountAddress }) => {
        try {
            //if (name || accountAddress) return setError("Please provide name and account address");
            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {

        }
    }

    //SEND MESSAGE
    const sendMessage = async ({ msg, address }) => {
        try {
            // if (msg || address) return setError("Please Type Your Message");
            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {

        }
    }

    //READ USER INFO
    const readUser = async (userAddress) => {
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    }

    return (
        <ChatAppContext.Provider
            value={{
                readMessage, createAccount, addFriends, sendMessage, readUser, connectWallet,
                CheckIfWalletConnected,
                account, userName, friendLists, friendMsg, userLists, loading, error, currentUserAddress, currentUserName
            }}>
            {children}
        </ChatAppContext.Provider>
    )
}
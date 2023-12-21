import React from 'react'
import "../styles/globals.css"

import { ChatAppProvider } from '@/Context/ChatAppContext'
import { NavBar } from '@/Components/index'
import ChatApp from '.'

const MyApp = ({Component, pageProps}) => {
  return (
    <div>
      <ChatAppProvider>
        <NavBar />
        <Component {...pageProps} />
      </ChatAppProvider>
    </div>
    
  )
}

export default MyApp
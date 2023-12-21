import React, { useEffect, useState, useContext } from 'react'

import { ChatAppContext, ChatAppProvider } from '@/Context/ChatAppContext'
import { Filter, Friend } from '@/Components/index'

const ChatApp = () => {
  return (
    <div>
      <Filter />
      <Friend />
    </div>
  )
}

export default ChatApp
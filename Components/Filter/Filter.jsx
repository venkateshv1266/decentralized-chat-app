import React, { useState, useContext } from 'react'
import Image from 'next/image'
import Style from './Filter.module.css'
import images from "../../assets/index"
import { ChatAppContext } from '@/Context/ChatAppContext'
import { Model } from '../index'

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);

  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt='image' width={20} height={20} />
            <input type="text" placeholder='Search..' />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt='clear' width={20} height={20} />
            CLEAR CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt='addfriend' width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {/* MODEL COMPONENT    */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model openBox={setAddFriend}
            title="CHAT BUDDY"
            head="ADD FRIEND"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto voluptatum commodi sequi similique eos quisquam totam, placeat magni, id cumque voluptates quod ratione, esse dolore vero maiores animi harum at."
            smallInfo="Kindly Select Your Friend Name & Address"
            image={images.hero}
            functionName={addFriends}
          />

        </div>
      )}
    </div>
  )
}

export default Filter
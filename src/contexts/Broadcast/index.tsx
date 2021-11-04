import React, { createContext, useEffect } from 'react';
import { observer } from "mobx-react";
import useStore from "../../hooks/useStore";
import useToast from '../../hooks/useToast';


const BroadcastContext = createContext({})

const BroadcastProvider: React.FC = observer(({ children }) => {
  const { transactionStore } = useStore()
  const { toast } = useToast()

  // useEffect(() => {
  //   toast({ description: 'ee' })

  // }, [transactionStore.broadcasted])


  return (    
    <BroadcastContext.Provider value={{}}>
      {children}
    </BroadcastContext.Provider>

  )
})

export default BroadcastProvider
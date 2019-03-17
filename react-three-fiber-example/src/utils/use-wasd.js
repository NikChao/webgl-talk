import { useState } from 'react';
import useKey from 'use-key-hook';

export default function useWasd () {
  const [ fwd, setFwd ] = useState(false);
  const [ back, setBack ] = useState(false);
  const [ left, setLeft ] = useState(false);
  const [ right, setRight ] = useState(false);

  useKey(key => {
    setFwd(true);    
  }, { detectKeys: ['w'] })

  useKey(key => {
    setBack(true);    
  }, { detectKeys: ['s'] })

  useKey(key => {
    setLeft(true);    
  }, { detectKeys: ['a'] })

  useKey(key => {
    setRight(true);    
  }, { detectKeys: ['d'] })

  useKey(key => {
    setFwd(false);
  }, { detectKeys: ['w'], keyevent: 'keyup' })

  useKey(key => {
    setBack(false);    
  }, { detectKeys: ['s'], keyevent: 'keyup' })


  useKey(key => {
    left = false;
  }, { detectKeys: ['a'], keyevent: 'keyup' })

  useKey(key => {
    right = false;    
  }, { detectKeys: ['d'], keyevent: 'keyup' })

  return [ fwd, back, left, right];
}
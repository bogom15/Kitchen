
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/';

class Kitchen {
powerOn = false;
toaster = new Toaster();

startToasting = async () => {
if (!this.powerOn) {
console.log("Main power is off. Cannot start toasting.");
return;
}
const toast = await this.toaster.startToast();
toast?.pop();
}

turnOff = () => {
console.log("Turning off all appliances...");
this.powerOn = false;
this.toaster.turnOff();
}

turnOn = () => {
console.log("Turning on all appliances...");
this.powerOn = true;
}
}

class Toaster {
isOn = false;

startToast = async () => {
if (!this.isOn) {
console.log("Toaster is off. Cannot start toasting.");
return;
}
console.log("Toasting started...");
await new Promise(resolve => setTimeout(resolve, 30000));
console.log("Toasting completed.");
this.isOn = false;
return new Toast();
}

turnOff = () => {
if (this.isOn) {
console.log("Turning off toaster...");
this.isOn = false;
}
}

cancelToast = () => {
if (this.isOn) {
console.log("Cancelling toasting...");
this.isOn = false;
return new Toast();
}
}
}

class Toast {
isToasted = true;

pop = () => {
console.log("Toast popped.");
}
}

const kitchen = new Kitchen();




interface ToastState {
  isToasting: boolean;
}

interface KitchenState {
  isPowerOn: boolean;
}

function Index() {
  const dispatch = useDispatch();

  const toastState = useSelector<RootState, ToastState>(state => state.toast);
  const kitchenState = useSelector<RootState, KitchenState>(state => state.kitchen);

  function handlePowerToggle() {
    dispatch({ type: 'TOGGLE_POWER' });
  }

  async function handleToastStart() {
    if (!kitchenState.isPowerOn) {
      console.log("Main power is off. Cannot start toasting.");
      return;
    }
    dispatch({ type: 'TOGGLE_TOASTING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'TOGGLE_TOASTING', payload: false });
      dispatch({ type: 'POP_TOAST' });
    }, 30000);
  }

  function handleToastCancel() {
    dispatch({ type: 'CANCEL_TOAST' });
  }

  return (
<div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 m-auto">
      <div className="p-4">
        <h1 className="text-lg font-bold mb-2">Kitchen</h1>
        <p className="text-gray-700">Main Power: {kitchenState.isPowerOn ? 'On' : 'Off'}</p>
        <p className="text-gray-700">Toaster: {toastState.isToasting ? 'Toasting' : 'Idle'}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          onClick={handlePowerToggle}
        >
          {kitchenState.isPowerOn ? 'Turn Off' : 'Turn On'} Main Power
        </button>
        <br />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          onClick={handleToastStart}
          disabled={!toastState.isToasting}
        >
          Start Toasting
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-4"
          onClick={handleToastCancel}
          disabled={!toastState.isToasting}
        >
          Cancel Toasting
        </button>
      </div>
    </div>
    
  );
}

export default Index;
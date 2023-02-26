import React from 'react'

class Kitchen {
    powerOn: boolean;
    toaster: Toaster;
    constructor() {
      this.powerOn = false;
      this.toaster = new Toaster();
    }
  
    async startToasting() {
      if (!this.powerOn) {
        console.log("Main power is off. Cannot start toasting.");
        return;
      }
      const toast = await this.toaster.startToast();
      toast?.pop();
    }
  
    turnOff() {
      console.log("Turning off all appliances...");
      this.powerOn = false;
      this.toaster.turnOff();
    }
  
    turnOn() {
      console.log("Turning on all appliances...");
      this.powerOn = true;
    }
  }
  
  class Toaster {
    isOn: boolean;
    constructor() {
      this.isOn = false;
    }
  
    async startToast() {
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
  
    turnOff() {
      if (this.isOn) {
        console.log("Turning off toaster...");
        this.isOn = false;
      }
    }
  
    cancelToast() {
      if (this.isOn) {
        console.log("Cancelling toasting...");
        this.isOn = false;
        return new Toast();
      }
    }
  }
  
  class Toast {
    isToasted: boolean;
    constructor() {
      this.isToasted = true;
    }
  
    pop() {
      console.log("Toast popped.");
    }
  }

  const kitchen = new Kitchen();
kitchen.startToasting();
  
function index() {
  return (
    <div>
      Testing
    </div>
  )
}

export default index

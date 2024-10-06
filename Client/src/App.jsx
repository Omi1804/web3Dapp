import React, { useEffect, useState } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import "./App.css";
import Web3 from "web3";

const App = () => {
  const [state, setState] = useState({ web3: null, contract: null });

  const template = async () => {
    //connecting to the network
    const web3 = new Web3("http://127.0.0.1:7545");

    //to dynamically get the contract's address not just hard coping it
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorage.networks[networkId]; // gets all the details of the contract
    const address = deployedNetwork.address;

    const contract = new web3.eth.Contract(SimpleStorage.abi, address); // creating the instance of the contract --> thorugh this we can call any function in the contract

    setState({ web3: web3, contract: contract });
  };

  const getGanaceAccount = async () => {
    const web3 = new Web3("http://127.0.0.1:7545");

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
  };

  const readContract = async () => {
    const { contract } = state;
    const value = await contract.methods.getter().call();
    console.log(value);
  };

  const writeContract = async (value) => {
    const { contract } = state;
    const data = await contract.methods
      .setter(value)
      .send({ from: "0xE98755082561Ba2f541B602E09bc1a452e63a674" });
    console.log(data);
  };

  console.log(state);

  useEffect(() => {
    template();
  }, []);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <button onClick={getGanaceAccount}>Get all account on Ganace</button>
      <button onClick={readContract}>Read your contract</button>
      <button onClick={() => writeContract(100)}>
        Write to your contract value 100
      </button>
    </div>
  );
};

export default App;

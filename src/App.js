import { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";

function App() {
  const [connectedAddress, setConnectedAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [senderAddress, setSenderAddress] = useState();
  const [amount, setAmount] = useState();

  const connectWallet = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setConnectedAddress(account[0]);

    const web3 = new Web3(window.ethereum);

    web3.eth.getBalance(account[0]).then((e) => {
      setBalance(web3.utils.fromWei(e, "ether"));
    });
  };

  const sendTrasaction = async (senderAddress, amount) => {
    let txParam = {
      from: connectedAddress,
      to: senderAddress,
      gas: Number(21000).toString(16),
      gasPrice: Number(2500000).toString(16),
      value: Web3.utils.toHex(Web3.utils.toWei(amount, "ether")),
    };

    let res = await window.ethereum
      .request({ method: "eth_sendTransaction", params: [txParam] })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   console.log(window.ethereum);
  //   if (window.ethereum.selectedAddress != null) {
  //     setConnectedAddress(window.ethereum.selectedAddress);
  //   } else {
  //     console.log("Hit");
  //   }
  // }, []);

  return (
    <div className="App">
      {connectedAddress === "" ? (
        ""
      ) : (
        <div className="connected_wallet">{connectedAddress}</div>
      )}
      {balance === "" ? "" : <div className="balance">{balance}</div>}
      {connectedAddress === "" ? (
        <button className="btn" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <>
          <input
            type="text"
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
            placeholder="Public Address"
          />
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          <button
            className="btn"
            onClick={() => sendTrasaction(senderAddress, amount)}
          >
            Send Transaction
          </button>
        </>
      )}
    </div>
  );
}
// 0xdccc7442202a87007ad3214d96fc0d8f596122eb
export default App;


import abi from "./abi/abi.json" assert {type : "json"};

const connect = new Promise((res ,rej) => {
   if (typeof window.ethereum == "undefined"){
       PromiseRejectionEvent("Install Metamask");
   }
   window.ethereum.request({method :"eth_requestAccounts"});
   
   let web3 = new Web3(window.ethereum);
   let contract = new web3.eth.Contract(abi,"0x8B88cd4908Cc51c3A65FcC8001A2B06e87D31b8f");

   web3.eth.getAccounts().then((accounts) => {
       contract.methods
       .totalSupply()
       .call({from : accounts[0]})
       .then((supply)=>{
           contract.methods.getBuildings().call({from:accounts[0]})
           .then((data)=>{
               res({supply : supply, buildings :data});
           })
       });
   });


});

export default connect;
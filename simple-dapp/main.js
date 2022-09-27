
// Meta is our provider" in this case
const provider = new ethers.providers.Web3Provider(window.ethereum);

// you whoever sign into MetaMask) is the "signer"
const signer = provider.getSigner();
console.log(signer);

// the "contract" object allows us tp call function from our smart contract
const contract = new ethers.Contract(contractAddress, contractABI, provider);


async function init(){
  await provider.send("eth_requestAccounts",[])
}
init();
//Functions

//when i click on the setNum button;
$('@setNum').click(function(){
  setNum();
})
$('@getNum').click(function(){
  getNum();
})

//Changing the blockchain
async function getNum(){
const myNum = await contract.getNum();
console.log("myNum")
}


// Reading from the blockchain
function setNum(){
  const tokenwithSigner = contract.connect(signer);
console.log("calling function setNum")

  tokenwithSigner.setNum(10);

}
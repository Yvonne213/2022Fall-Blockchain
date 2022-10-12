// MetaMask is our 'provider' in this case
const provider = new ethers.providers.Web3Provider(window.ethereum);

// You (whoever is signed into MetaMask) is the 'signer'
const signer = provider.getSigner();

// the 'contract' object allows us to call functions from our smart contract
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// the 'contractWithSigner' object allows us to call smart contract functions that
// require us to send a transaction (like changing a number on the blockchain)
const contractWithSigner = contract.connect(signer);

async function init() {
  await provider.send("eth_requestAccounts", []);
}

init();

// EVENT LISTENERS

// when I click on the setNum button...
$('#setArtistButton').click(function(){
  setName();
})


// checks the blockchain for the current number every 2 seconds
// so that the page can be updated automatically if the number
// is changed.
setInterval(function(){
  getName();
}, 2000)

// FUNCTIONS

// CHANGING THE BLOCKCHAIN

async function getName() {

  // grab the number from the contract
  const currentName = await contract.getName();
  
  // display the current number to your web page
  $('#currentArtist').text(currentName)
}

// READING FROM THE BLOCKCHAIN

function setName() {
  // grab the user input from the input text box
  const nameToSet = $('#setArtistInput').val();

  // pass the converted number to the contract
  contractWithSigner.nameInput(nameToSet);
}


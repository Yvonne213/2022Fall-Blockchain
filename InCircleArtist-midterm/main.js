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
  setInfo();
})


// checks the blockchain for the current number every 2 seconds
// so that the page can be updated automatically if the number
// is changed.
setInterval(function(){
  getUserInfo();
}, 2000)

// FUNCTIONS

// CHANGING THE BLOCKCHAIN
async function getUserInfo() {

  // grab the number from the contract
  const currentName = await contract.getName();
  const currentAddress = await contract.getAddress();
  
  console.log(currentName)
  console.log(currentAddress)
  // currentName[0],currentName[1]

  // iterate through currentName and currentAddress, concat all items
  var nameAndAddressArray = [];
  var table = document.createElement("table");


  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = String("Artist");
  cell2.innerHTML = String("Address");

  for (var i=0; i < currentName.length ; i++) {

    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = String(currentName[i]);
    cell2.innerHTML = String(currentAddress[i]) ;


  }
  document.getElementById("currentArtist").innerHTML = "";
  document.getElementById("currentArtist").appendChild(table);

  // display the current nvvumber to your web page
  //$('#currentArtist').innerHTML = nameAndAddressArray

  // var row = table.insertRow(0);
  // var cell1 = row.insertCell(0);
  // var cell2 = row.insertCell(1);
  // cell1.innerHTML = "Artist";
  // cell2.innerHTML = "Address";
  // document.getElementById("currentArtist").appendChild(table);

  console.log(nameAndAddressArray)
  //document.getElementById("currentArtist").innerHTML = "<tr>"+"jjsjsjs"+"</tr>"
  // $('#currentAddress').text(currentAddress)

 
}


// READING FROM THE BLOCKCHAIN

function setInfo() {
  // grab the user input from the input text box
  
 

  const nameToSet = $('#setArtistInput').val();
  const addressToSet = $('#setAddressInput').val();

  if(addressToSet.length == 0) {
    alert("Please enter an address")
  } else {
    contractWithSigner.nameInput(addressToSet, nameToSet);
  }

  // pass the converted number to the contract
  
}


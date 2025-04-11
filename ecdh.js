var ec = new elliptic.ec('curve25519');
            
// alice and bob's keys
var aliceKeys = ec.genKeyPair();
var bobKeys = ec.genKeyPair();

// flags to check if all keys have been generated
var aPub = false;
var aPriv = false;
var bPub = false;
var bPriv = false;

// shared keys
var aliceShared;
var bobShared;

function generatePrivate(user) {
    let keyPair;
    switch (user) {
        case "alice":
            keyPair = aliceKeys;
            aPriv = true;
            break;
        case "bob":
            keyPair = bobKeys;
            bPriv = true;
            break;
        default:
            console.error("User not found");
            return;
    }
    
    if (keyPair) {
        console.log(`${user} Private Key:`, keyPair.getPrivate().toString(16));
        document.getElementById(`${user}-private`).value = keyPair.getPrivate().toString(16);
    }
}

function generatePublic(user) {
    let keyPair;
    switch (user) {
        case "alice":
            keyPair = aliceKeys;
            aPub = true;
            break;
        case "bob":
            keyPair = bobKeys;
            bPub = true;
            break;
        default:
            console.error("User not found");
            return;
    }
    
    if (keyPair) {
        console.log(`${user} Public Key:`, keyPair.getPublic().encode('hex'));
        document.getElementById(`${user}-public`).value = keyPair.getPublic().encode('hex');
    }
}
// Generate elliptic curve for ECDH using Curve25519
var ec = new elliptic.ec('curve25519');

// Key pairs for Alice and Bob
// Each key pair consists of a private and public key generated for each user
var aliceKeys = ec.genKeyPair();
var bobKeys = ec.genKeyPair();

// Flags to track which keys (public and private) have been generated for Alice and Bob
var aPub = false;
var aPriv = false;
var bPub = false;
var bPriv = false;

// Shared secret keys derived via ECDH
var aliceShared;
var bobShared;

/**
 * Generates and displays the private key for a specified user.
 * 
 * @param {string} user - The user identifier ('alice' or 'bob').
 * This function retrieves the user's key pair, marks their private key as generated,
 * logs the private key in hexadecimal format to the console, and displays it in the relevant input field.
 */
function generatePrivate(user) {
    let keyPair;

    // Select the appropriate key pair based on the user
    switch (user) {
        case "alice":
            keyPair = aliceKeys;
            aPriv = true; // Flag to indicate Alice's private key has been generated
            break;
        case "bob":
            keyPair = bobKeys;
            bPriv = true; // Flag to indicate Bob's private key has been generated
            break;
        default:
            console.error("User not found");
            return;
    }

    // If a key pair was found, log and display the private key
    if (keyPair) {
        console.log(`${user} Private Key:`, keyPair.getPrivate().toString(16));
        document.getElementById(`${user}-private`).value = keyPair.getPrivate().toString(16);
    }
}

/**
 * Generates and displays the public key for a specified user.
 * 
 * @param {string} user - The user identifier ('alice' or 'bob').
 * This function retrieves the user's key pair, marks their public key as generated,
 * logs the public key in hexadecimal format to the console, and displays it in the relevant input field.
 */
function generatePublic(user) {
    let keyPair;

    // Select the appropriate key pair based on the user
    switch (user) {
        case "alice":
            keyPair = aliceKeys;
            aPub = true; // Flag to indicate Alice's public key has been generated
            break;
        case "bob":
            keyPair = bobKeys;
            bPub = true; // Flag to indicate Bob's public key has been generated
            break;
        default:
            console.error("User not found");
            return;
    }

    // If a key pair was found, log and display the public key
    if (keyPair) {
        console.log(`${user} Public Key:`, keyPair.getPublic().encode('hex'));
        document.getElementById(`${user}-public`).value = keyPair.getPublic().encode('hex');
    }
}

/**
 * Computes and displays the shared secret key for a specified user using ECDH (Elliptic Curve Diffie-Hellman).
 * 
 * @param {string} user - The user identifier ('alice' or 'bob').
 * 
 * This function performs the following steps:
 * - Validates that the necessary private and public keys have been generated.
 * - Uses the user's private key and the other user's public key to derive a shared secret.
 * - Logs the shared key in hexadecimal format to the console.
 * - Displays the shared key in the corresponding input field on the page.
 */
function generateShared(user) {
    switch (user) {
        case "alice":
            // Check if Alice's private key and Bob's public key are generated
            if (!aPriv || !bPub) {
                alert("To generate Alice's shared key, you need to generate Alice's private key and Bob's public key first.");
                break;
            }
            // Alice derives the shared key using her private key and Bob's public key
            aliceShared = aliceKeys.derive(bobKeys.getPublic()); 
            console.log(`Alice Shared Key:`, aliceShared.toString(16));
            document.getElementById(`alice-shared`).value = aliceShared.toString(16);
            break;

        case "bob":
            // Check if Bob's private key and Alice's public key are generated
            if (!bPriv || !aPub) {
                alert("To generate Bob's shared key, you need to generate Bob's private key and Alice's public key first.");
                break;
            }
            // Bob derives the shared key using his private key and Alice's public key
            bobShared = bobKeys.derive(aliceKeys.getPublic()); 
            console.log(`Bob Shared Key:`, bobShared.toString(16));
            document.getElementById(`bob-shared`).value = bobShared.toString(16);
            break;

        default:
            console.error("User not found");
            return;
    }
}
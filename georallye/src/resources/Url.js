let domain = "https://www.api.onzeroadz.fr/index.php/"
let circuit = domain + "circuit/"
let question = domain + "question/"
let transit = domain + "transit/"

export default URL = {
    signup : domain + "signup",
    login : domain + "login",
    whoami : domain + "whoami",
    
    circuit : circuit,
    addCircuit : circuit+"add",
    disableCircuit : circuit+"disable/",
    publishCircuit : circuit+"publish/",
    publishedCircuits : circuit + "published",
    areaCircuits : circuit + "published/area",
    myCircuits : circuit + "my",
    updateProgress : circuit+"{idCircuit}/progress/",
    
    
    typeQuestion : question+"type",

    typeTransit : transit+"type",
    
    googlePlaces : "https://maps.googleapis.com/maps/api/place/details/json?&placeid=",
    googleAutocompletion : "https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=",

    apiKey : "AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk"
}

let domain = "https://www.api.onzeroadz.fr/index.php/"
let circuit = domain + "circuit"
let question = domain + "question/"
let transit = domain + "transit/"

export default URL = {
    signup : domain + "signup",
    login : domain + "login",
    whoami : domain + "whoami",
    
    circuit : circuit,
    getCircuit : circuit + "/",
    updateCircuit : circuit + "/",
    deleteCircuit : circuit + "/",
    disableCircuit : circuit + "/disable/",
    publishCircuit : circuit + "/publish/",
    publishedCircuits : circuit + "/published",
    areaCircuits : circuit + "/published/area",
    myCircuits : circuit + "/my",

    step : domain + "step",   
    
    updateTransit : transit,
    typeTransit : transit + "type",

    addQcm : question + "qcm",
    addFree : question + "free",
    updateQcm : question + "qcm/",
    updateFree : question + "free/",
    deleteQuestion : question + "question/",
    typeQuestion : question + "type",
    
    googlePlaces : "https://maps.googleapis.com/maps/api/place/details/json?&placeid=",
    googleAutocompletion : "https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=",

    apiKey : "AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk"
}

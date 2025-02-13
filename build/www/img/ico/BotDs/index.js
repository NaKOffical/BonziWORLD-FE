const Discord = require("discord.js");
const client = new Discord.Client();
var generator = require('generate-password');
const config = require("./config.json");
const proxy = require('./proxys.json')

client.login(config.token);

let prefix = config.prefix;

client.on('ready', async ()=> {

    

    
        console.log("││││││││││││││││││││││││││││││││││││││││")
        console.log("│││░░███░██░██▒██████│██││││██████░│││││")
        console.log("││││███████░██▒▒███▒▒││██│██│████│███░││││")
        console.log("││││███████░██▒▒███▒▒││██│░████│███░││││")
        console.log("│░░▒███▒▒██▒██░▒▒██▒▒░██▒▒▒▒██████▒█░│││")
        console.log("│░│███▒░▒▒█▒▒██▒▒██░▒▒██▒▒░▒░████▒▒░░│││")
        console.log("│░░▒██░░▒██▒███▒▒█░░▒▒█▒▒│▒▒░▒██▒▒░▒░│││")
        console.log("│░░▒██░░▒██▒███▒▒█░░▒▒█▒▒│▒▒░▒██▒▒░▒░│││")
        console.log("│││░░░░▒▒▒▒▒▒▒▒▒▒░░░░░░░░││░░░░░░░││││││")
        console.log("│││   ▓▓▓▓▓▓▓▒░││││░░│││││││││││││││││")
     

        console.log("*********************")
        console.log("Nitro Generator Bv.3")
        console.log("By H3x")
        console.log("----------------------")
        console.log("xRay                   |")
        console.log("     / \__")
        console.log("    (    @\___")
        console.log("   /          O")
        console.log("  /   (_____/")
        console.log(" /_____/   U")
        console.log("Node initializated")
        console.log("Windows initializated")
        console.log("Windows initializated")
        console.log("Python initializated")
        console.log("Windows initializated")
        console.log("Windows initializated")
        console.log("Node initializated")
     
        
        setTimeout(() =>{
             
            console.log("[Proxy Error]")
            console.log("[Proxy 34 Error]")

        }, 2000)
        setTimeout(() =>{
             
            console.log("[Proxy Conected]")
            console.log("[Proxy 36 Inicializated]")

        }, 5000)

        setTimeout(() =>{
             
            console.log("[Proxy Conected]")
            console.log("[Proxy 39 Inicializated]")

        }, 15000)

    setInterval(() =>{
        

        var password = generator.generate({
            length: 16,
            numbers: true
        });


        console.log(` - [ https://discord.com/gifts/${password} ]`)
        
        
}, 2300);



setInterval(() => {
    const prox = proxy.pros[Math.floor(proxy.pros.length * Math.random())];
    const pai = proxy.pais[Math.floor(proxy.pais.length * Math.random())];
    const secu = proxy.security[Math.floor(proxy.security.length * Math.random())];
    const type = proxy.tipo[Math.floor(proxy.tipo.length * Math.random())];
    const port = proxy.Puerto[Math.floor(proxy.Puerto.length * Math.random())];

    

    
    console.log(`\n \n - Proxy Contected: \n  [${prox}] [${pai}] \n  Security: [ ${secu} ] \n  Type: [ ${type} ] \n  Port : [${port}] \n \n `)

}, 15700)
});


client.on('message', async (message) =>{

    if(message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();




})
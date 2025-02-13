function theme(a){
    document.getElementById("theme").innerHTML=a
}
window.onload = function(){
    $("#updated")[(+localStorage.tos||0)<1593415280233?"show":"hide"]()
    socket.on("css",function(data){
	bonzis[data.guid].cancel()
        let button = document.createElement("button")
        button.title = data.css
        button.innerHTML = "Style"
        button.onclick = function(){
            let style = document.createElement("style")
            style.innerHTML = this.title
            style.classList.add("css")
            document.head.appendChild(style)
        }
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].appendChild(button)
    })
    socket.on("sendraw",function(data){
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].textContent = data.text
    })
    socket.on("admin",function(){
        admin = true;
    })
    socket.on("rickroll",function(data){
	bonzis[data.guid].cancel()
        let trap = document.createElement(data.link ? "u" : "button")
        data.link ? trap.style = "color:blue;cursor:pointer" : 0
        trap.innerHTML = data.text
        trap.onclick = function(){
            bonzis[data.guid].youtube("dQw4w9WgXcQ")
        }
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].innerHTML = ""
        bonzis[data.guid].$dialogCont[0].appendChild(trap)
    })
    $.contextMenu({
        selector:"#content",
        items:{
            wallpapers:{
                name:"Themes",
                items:{
                    defaultn:{name:"Default",callback:function(){socket.emit("command",{list:["unhack"]});socket.emit("command",{list:["unacid"]});socket.emit("command",{list:["unloskyize"]});socket.emit("command",{list:["unhell"]});socket.emit("command",{list:["nofry"]});socket.emit("command",{list:["unvaporwave"]})}},
					loskee:{name:"Losky",callback:function(){socket.emit("command",{list:["unhack"]});socket.emit("command",{list:["unacid"]});socket.emit("command",{list:["loskyize"]});socket.emit("command",{list:["unhell"]});socket.emit("command",{list:["nofry"]});socket.emit("command",{list:["unvaporwave"]})}},
					helling:{name:"Hell",callback:function(){socket.emit("command",{list:["unhack"]});socket.emit("command",{list:["unacid"]});socket.emit("command",{list:["unloskyize"]});socket.emit("command",{list:["hell"]});socket.emit("command",{list:["nofry"]});socket.emit("command",{list:["unvaporwave"]})}},
					acidoil:{name:"Acid",callback:function(){socket.emit("command",{list:["unhack"]});socket.emit("command",{list:["acid"]});socket.emit("command",{list:["unloskyize"]});socket.emit("command",{list:["unhell"]});socket.emit("command",{list:["nofry"]});socket.emit("command",{list:["unvaporwave"]})}},
					vaporwavey:{name:"Vaporwave",callback:function(){socket.emit("command",{list:["unhack"]});socket.emit("command",{list:["unacid"]});socket.emit("command",{list:["unloskyize"]});socket.emit("command",{list:["unhell"]});socket.emit("command",{list:["nofry"]});socket.emit("command",{list:["vaporwave"]})}},
					fuckack:{name:"Hack",callback:function(){socket.emit("command",{list:["unacid"]});socket.emit("command",{list:["hack"]});socket.emit("command",{list:["unloskyize"]});socket.emit("command",{list:["unhell"]});socket.emit("command",{list:["nofry"]});socket.emit("command",{list:["unvaporwave"]})}},
					french:{name:"Fry",callback:function(){socket.emit("command",{list:["unacid"]});socket.emit("command",{list:["hack"]});socket.emit("command",{list:["unloskyize"]});socket.emit("command",{list:["unhell"]});socket.emit("command",{list:["fry"]});socket.emit("command",{list:["unvaporwave"]})}}
                }
            },
            closedialog:{
                name:"Close",
                callback:function(){undefined}
            },
            commands:{
                name:"Quick Commands",
                items:{
                    triggered:{name:"Triggered",callback:function(){socket.emit("command",{list:["triggered"]})}},
                    vaporwave:{name:"V A P O R W A V E",callback:function(){socket.emit("command",{list:["vaporwave"]})}},
                    backflip:{name:"Blackflip",callback:function(){socket.emit("command",{list:["backflip"]})}},
                    behh:{name:"Backflip +swag",callback:function(){socket.emit("command",{list:["backflip","swag"]})}},
                    goddy:{name:"God",callback:function(){socket.emit("command",{list:["god"]})}},
                    pope:{name:"Pope Bonzi",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["pope"]})}},
                    disconnection:{name:"Disconnect",callback:function(){socket.disconnect()}}
                }
            },
            openkiddies:{
                name:"Open the Kiddie",
                callback:function(){
                    $("#page_kiddie").show('slow');
                }
            }
        }
    })
    $("#dm_input").keypress(n=>{
        if(n.which == 13) dm_send()
    })
}
function dm_send(){
    if(!$("#dm_input").val()){
        $("#page_dm").hide()
        return
    }
    socket.emit("command",{list:["dm2",{
        target:$("#dm_guid").val(),
        text:$("#dm_input").val()
    }]})
    $("#dm_input").val("")
    $("#page_dm").hide()
    $("#chat_message").focus()
}
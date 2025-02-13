const log = require("./log.js").log;
const Ban = require("./ban.js");
const Utils = require("./utils.js");
const io = require('./index.js').io;
const settings = require("./settings.json");
const sanitize = require('sanitize-html');

let roomsPublic = [];
let rooms = {};
let usersAll = [];

exports.beat = function() {
    io.on('connection', function(socket) {
        new User(socket);
    });
};

function checkRoomEmpty(room) {
    if (room.users.length != 0) return;

    log.info.log('debug', 'removeRoom', {
        room: room
    });

    let publicIndex = roomsPublic.indexOf(room.rid);
    if (publicIndex != -1)
        roomsPublic.splice(publicIndex, 1);
    
    room.deconstruct();
    delete rooms[room.rid];
    delete room;
}

class Room {
    constructor(rid, prefs) {
        this.rid = rid;
        this.prefs = prefs;
        this.users = [];
    }

    deconstruct() {
        try {
            this.users.forEach((user) => {
                user.disconnect();
            });
        } catch (e) {
            log.info.log('warn', 'roomDeconstruct', {
                e: e,
                thisCtx: this
            });
        }
        //delete this.rid;
        //delete this.prefs;
        //delete this.users;
    }

    isFull() {
        return this.users.length >= this.prefs.room_max;
    }

    join(user) {
        user.socket.join(this.rid);
        this.users.push(user);

        this.updateUser(user);
    }

    leave(user) {
        // HACK
        try {
            this.emit('leave', {
                 guid: user.guid
            });
     
            let userIndex = this.users.indexOf(user);
     
            if (userIndex == -1) return;
            this.users.splice(userIndex, 1);
     
            checkRoomEmpty(this);
        } catch(e) {
            log.info.log('warn', 'roomLeave', {
                e: e,
                thisCtx: this
            });
        }
    }

    updateUser(user) {
		this.emit('update', {
			guid: user.guid,
			userPublic: user.public
        });
    }

    getUsersPublic() {
        let usersPublic = {};
        this.users.forEach((user) => {
            usersPublic[user.guid] = user.public;
        });
        return usersPublic;
    }

    emit(cmd, data) {
		io.to(this.rid).emit(cmd, data);
    }
}

function newRoom(rid, prefs) {
    rooms[rid] = new Room(rid, prefs);
    log.info.log('debug', 'newRoom', {
        rid: rid
    });
}

let userCommands = {
    "godmode": function(word) {
        let success = word == this.room.prefs.godword;
        if (success) this.private.runlevel = 0;
        log.info.log('debug', 'godmode', {
            guid: this.guid,
            success: success
        });
    },
    "sanitize": function() {
        let sanitizeTerms = ["false", "off", "disable", "disabled", "f", "no", "n"];
        let argsString = Utils.argsString(arguments);
        this.private.sanitize = !sanitizeTerms.includes(argsString.toLowerCase());
    },
    "joke": function() {
        this.room.emit("joke", {
            guid: this.guid,
            rng: Math.random()
        });
    },
    "fact": function() {
        this.room.emit("fact", {
            guid: this.guid,
            rng: Math.random()
        });
    },
    "youtube": function(vidRaw) {
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("youtube", {
            guid: this.guid,
            vid: vid
        });
    },
    "backflip": function(swag) {
        this.room.emit("backflip", {
            guid: this.guid,
            swag: swag == "swag"
        });
    },
	"earth": function(earth) {
        this.room.emit("earth", {
            guid: this.guid,
        });
    },
	"swag_adjust": function(swag_adjust) {
        this.room.emit("swag_c", {
            guid: this.guid,
        });
    },
	"shrug": function(shrug) {
        this.room.emit("shrug", {
            guid: this.guid,
        });
    },
	"swag_still": function(swag_still) {
        this.room.emit("swag_still", {
            guid: this.guid,
        });
    },
	"surf": function(surf) {
        this.room.emit("surf", {
            guid: this.guid,
        });
    },
	"surf_leave": function(surf_leave) {
        this.room.emit("surf_out", {
            guid: this.guid,
        });
    },
	"surf_join": function(surf_join) {
        this.room.emit("surf_back", {
            guid: this.guid,
        });
    },
	"poof": function(poof) {
        this.room.emit("poof", {
            guid: this.guid,
        });
    },
	"grin": function(grin) {
        this.room.emit("grin", {
            guid: this.guid,
        });
    },
	"clap": function(clap) {
        this.room.emit("clap", {
            guid: this.guid,
        });
    },
	"earth": function(earth) {
        this.room.emit("earth", {
            guid: this.guid,
        });
    },
	"swag": function(swaggot) {
        this.room.emit("swag", {
            guid: this.guid,
        });
    },
	"beat": function(beat) {
        this.room.emit("beat", {
            guid: this.guid,
        });
    },
	"present": function(present) {
        this.room.emit("present", {
            guid: this.guid,
        });
    },
	"praise": function(praise) {
        this.room.emit("praise", {
            guid: this.guid,
        });
    },
    "linux": "passthrough",
    "pawn": "passthrough",
    "bees": "passthrough",
    "color": function(color) {
        if (typeof color != "undefined") {
            if (settings.bonziColors.indexOf(color) == -1)
                return;
            
            this.public.color = color;
        } else {
            let bc = settings.bonziColors;
            this.public.color = bc[
                Math.floor(Math.random() * bc.length)
            ];
        }

        this.room.updateUser(this);
    },
    "pope": function() {
        this.public.color = "pope";
        this.room.updateUser(this);
    },
	"god": function() {
        this.public.color = "god";
        this.room.updateUser(this);
    },
	"diogo": function() {
        this.public.color = "diogo";
        this.room.updateUser(this);
    },
	"cartoon": function() {
        this.public.color = "cartoon";
        this.room.updateUser(this);
    },
	"flipped": function() {
        this.public.color = "flipped";
        this.room.updateUser(this);
    },
	"hacker": function() {
        this.public.color = "hacker";
        this.room.updateUser(this);
    },
	"skygamer": function() {
        this.public.color = "skygamer";
        this.room.updateUser(this);
    },
	"16": function() {
        this.public.color = "sixteen";
        this.room.updateUser(this);
    },
	"unsaturate": function() {
        this.public.color = "unsaturate";
        this.room.updateUser(this);
    },
	"troller": function() {
        this.public.color = "trollface";
        this.room.updateUser(this);
    },
	"purple_saber": function() {
        this.public.color = "purplesaber";
        this.room.updateUser(this);
    },
	"slight": function() {
        this.public.color = "slightman";
        this.room.updateUser(this);
    },
	"revolute": function() {
        this.public.color = "revolution";
        this.room.updateUser(this);
    },
	"rainbow_saber": function() {
        this.public.color = "rainbowsaber";
        this.room.updateUser(this);
    },
	"owner": function() {
        this.public.color = "owner";
        this.room.updateUser(this);
    },
	"glitch3": function() {
        this.public.color = "glitch3";
        this.room.updateUser(this);
    },
	"con": function() {
        this.public.color = "glitch";
        this.room.updateUser(this);
    },
	"vapor": function() {
        this.public.color = "vapor";
        this.room.updateUser(this);
    },
	"glitch2": function() {
        this.public.color = "glitch2";
        this.room.updateUser(this);
    },
	"omegagod": function() {
        this.public.color = "omega";
        this.room.updateUser(this);
    },
	"samsung": function() {
        this.public.color = "sgh";
        this.room.updateUser(this);
    },
	"emerald": function() {
        this.public.color = "emerald";
        this.room.updateUser(this);
    },
	"gold": function() {
        this.public.color = "gold";
        this.room.updateUser(this);
    },
	"diamond": function() {
        this.public.color = "diamond";
        this.room.updateUser(this);
    },
	"aux": function() {
        this.public.color = "glitchy";
        this.room.updateUser(this);
    },
	"nul": function() {
        this.public.color = "buggiest";
        this.room.updateUser(this);
    },
	"old_god": function() {
        this.public.color = "oldgod";
        this.room.updateUser(this);
    },
	"power": function() {
        this.public.color = "power";
        this.room.updateUser(this);
    },
	"angel": function() {
        this.public.color = "angel";
        this.room.updateUser(this);
    },
	"nostalgia": function() {
        this.public.color = "nostalgic";
        this.room.updateUser(this);
    },
	"superpope": function() {
        this.public.color = "megapope";
        this.room.updateUser(this);
    },
	"power_burns_of_nazi": function() {
        this.public.color = "power_fire";
        this.room.updateUser(this);
    },
	"power_vaporwave_is_beamed": function() {
        this.public.color = "power_neon_color";
        this.room.updateUser(this);
    },
	"god_but_rightwards": function() {
        this.public.color = "god_glitch_lumisort";
        this.room.updateUser(this);
    },
	"god_but_it_has_a_physics": function() {
        this.public.color = "god_glitch_gravity";
        this.room.updateUser(this);
    },
	"jitter": function() {
        this.public.color = "glitch_jitter";
        this.room.updateUser(this);
    },
	"xavier_super_god": function() {
        this.public.color = "veryultrasupergod";
        this.room.updateUser(this);
    },
	"ultraomegagod": function() {
        this.public.color = "ultimateomegagod";
        this.room.updateUser(this);
    },
	"power_brains": function() {
        this.public.color = "power_zombie";
        this.room.updateUser(this);
    },
	"veryomegagod": function() {
        this.public.color = "superomegagod";
        this.room.updateUser(this);
    },
	"power_purple": function() {
        this.public.color = "power_violet";
        this.room.updateUser(this);
    },
	"power_rgb": function() {
        this.public.color = "power_orb_rainbowness";
        this.room.updateUser(this);
    },
	"power_jade": function() {
        this.public.color = "power_cyan";
        this.room.updateUser(this);
    },
	"apocalypsegod": function() {
        this.public.color = "overpowered_god";
        this.room.updateUser(this);
    },
    "asshole": function() {
        this.room.emit("asshole", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"gofag": function() {
        this.room.emit("gofag", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"kiddie": function() {
        this.room.emit("kiddie", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"beggar": function() {
        this.room.emit("beggar", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"nigger": function() {
        this.room.emit("nigger", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"smells": function() {
        this.room.emit("smells", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"gachafag": function() {
        this.room.emit("gachafag", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"muted": function() {
        this.room.emit("muted", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"forcer": function() {
        this.room.emit("forcer", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"bullshit": function() {
        this.room.emit("bullshit", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"schoolhell": function() {
        this.room.emit("schoolhell", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"fired": function() {
        this.room.emit("fired", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"grounded": function() {
        this.room.emit("grounded", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"getbanned": function() {
        this.room.emit("getbanned", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	"asshole": function() {
        this.room.emit("asshole", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
    "owo": function() {
        this.room.emit("owo", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
    "triggered": "passthrough",
    "vaporwave": function() {
        this.socket.emit("vaporwave");
        this.room.emit("youtube", {
            guid: this.guid,
            vid: "aQkPcPqTq4M"
        });
    },
    "unvaporwave": function() {
        this.socket.emit("unvaporwave");
    },
	"loskyize": function() {
        this.socket.emit("loskyize");
    },
	"unloskyize": function() {
        this.socket.emit("unloskyize");
    },
	"acid": function() {
        this.socket.emit("acid");
    },
	"unacid": function() {
        this.socket.emit("unacid");
    },
	"fry": function() {
        this.socket.emit("fry");
    },
	"nofry": function() {
        this.socket.emit("nofry");
    },
	"hell": function() {
        this.socket.emit("hell");
		this.public.color = "red";
        this.room.updateUser(this);
    },
	"unhell": function() {
        this.socket.emit("unhell");
    },
	"hack": function() {
        this.socket.emit("hack");
		this.public.color = "brown";
        this.room.updateUser(this);
    },
	"unhack": function() {
        this.socket.emit("unhack");
    },
	"disconnect": function() {
        this.socket.disconnect();
    },
    "name": function() {
        let argsString = Utils.argsString(arguments);
        if (argsString.length > this.room.prefs.name_limit)
            return;

        let name = argsString || this.room.prefs.defaultName;
        this.public.name = this.private.sanitize ? sanitize(name) : name;
        this.room.updateUser(this);
    },
    "pitch": function(pitch) {
        pitch = parseInt(pitch);

        if (isNaN(pitch)) return;

        this.public.pitch = Math.max(
            Math.min(
                parseInt(pitch),
                this.room.prefs.pitch.max
            ),
            this.room.prefs.pitch.min
        );

        this.room.updateUser(this);
    },
    "speed": function(speed) {
        speed = parseInt(speed);

        if (isNaN(speed)) return;

        this.public.speed = Math.max(
            Math.min(
                parseInt(speed),
                this.room.prefs.speed.max
            ),
            this.room.prefs.speed.min
        );
        
        this.room.updateUser(this);
    }
};


class User {
    constructor(socket) {
        this.guid = Utils.guidGen();
        this.socket = socket;

        // Handle ban
	    if (Ban.isBanned(this.getIp())) {
            Ban.handleBan(this.socket);
        }

        this.private = {
            login: false,
            sanitize: true,
            runlevel: 0
        };

        this.public = {
            color: settings.bonziColors[Math.floor(
                Math.random() * settings.bonziColors.length
            )]
        };

        log.access.log('info', 'connect', {
            guid: this.guid,
            ip: this.getIp()
        });

       this.socket.on('login', this.login.bind(this));
    }

    getIp() {
        return this.socket.request.connection.remoteAddress;
    }

    getPort() {
        return this.socket.handshake.address.port;
    }

    login(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)
        
        if (this.private.login) return;

		log.info.log('info', 'login', {
			guid: this.guid,
        });
        
        let rid = data.room;
        
		// Check if room was explicitly specified
		var roomSpecified = true;

		// If not, set room to public
		if ((typeof rid == "undefined") || (rid === "")) {
			rid = roomsPublic[Math.max(roomsPublic.length - 1, 0)];
			roomSpecified = false;
		}
		log.info.log('debug', 'roomSpecified', {
			guid: this.guid,
			roomSpecified: roomSpecified
        });
        
		// If private room
		if (roomSpecified) {
            if (sanitize(rid) != rid) {
                this.socket.emit("loginFail", {
                    reason: "nameMal"
                });
                return;
            }

			// If room does not yet exist
			if (typeof rooms[rid] == "undefined") {
				// Clone default settings
				var tmpPrefs = JSON.parse(JSON.stringify(settings.prefs.private));
				// Set owner
				tmpPrefs.owner = this.guid;
                newRoom(rid, tmpPrefs);
			}
			// If room is full, fail login
			else if (rooms[rid].isFull()) {
				log.info.log('debug', 'loginFail', {
					guid: this.guid,
					reason: "full"
				});
				return this.socket.emit("loginFail", {
					reason: "full"
				});
			}
		// If public room
		} else {
			// If room does not exist or is full, create new room
			if ((typeof rooms[rid] == "undefined") || rooms[rid].isFull()) {
				rid = Utils.guidGen();
				roomsPublic.push(rid);
				// Create room
				newRoom(rid, settings.prefs.public);
			}
        }
        
        this.room = rooms[rid];

        // Check name
		this.public.name = sanitize(data.name) || this.room.prefs.defaultName;

		if (this.public.name.length > this.room.prefs.name_limit)
			return this.socket.emit("loginFail", {
				reason: "nameLength"
			});
        
		if (this.room.prefs.speed.default == "random")
			this.public.speed = Utils.randomRangeInt(
				this.room.prefs.speed.min,
				this.room.prefs.speed.max
			);
		else this.public.speed = this.room.prefs.speed.default;

		if (this.room.prefs.pitch.default == "random")
			this.public.pitch = Utils.randomRangeInt(
				this.room.prefs.pitch.min,
				this.room.prefs.pitch.max
			);
		else this.public.pitch = this.room.prefs.pitch.default;

        // Join room
        this.room.join(this);

        this.private.login = true;
        this.socket.removeAllListeners("login");

		// Send all user info
		this.socket.emit('updateAll', {
			usersPublic: this.room.getUsersPublic()
		});

		// Send room info
		this.socket.emit('room', {
			room: rid,
			isOwner: this.room.prefs.owner == this.guid,
			isPublic: roomsPublic.indexOf(rid) != -1
		});

        this.socket.on('talk', this.talk.bind(this));
        this.socket.on('command', this.command.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
    }

    talk(data) {
        if (typeof data != 'object') { // Crash fix (issue #9)
            data = {
                text: "HEY EVERYONE LOOK AT ME I'M TRYING TO SCREW WITH THE SERVER LMAO"
            };
        }

        log.info.log('debug', 'talk', {
            guid: this.guid,
            text: data.text
        });

        if (typeof data.text == "undefined")
            return;

        let text = this.private.sanitize ? sanitize(data.text) : data.text;
        if ((text.length <= this.room.prefs.char_limit) && (text.length > 0)) {
            this.room.emit('talk', {
                guid: this.guid,
                text: text
            });
        }
    }

    command(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)

        var command;
        var args;
        
        try {
            var list = data.list;
            command = list[0].toLowerCase();
            args = list.slice(1);
    
            log.info.log('debug', command, {
                guid: this.guid,
                args: args
            });

            if (this.private.runlevel >= (this.room.prefs.runlevel[command] || 0)) {
                let commandFunc = userCommands[command];
                if (commandFunc == "passthrough")
                    this.room.emit(command, {
                        "guid": this.guid
                    });
                else commandFunc.apply(this, args);
            } else
                this.socket.emit('commandFail', {
                    reason: "runlevel"
                });
        } catch(e) {
            log.info.log('debug', 'commandFail', {
                guid: this.guid,
                command: command,
                args: args,
                reason: "unknown",
                exception: e
            });
            this.socket.emit('commandFail', {
                reason: "unknown"
            });
        }
    }

    disconnect() {
		let ip = "N/A";
		let port = "N/A";

		try {
			ip = this.getIp();
			port = this.getPort();
		} catch(e) { 
			log.info.log('warn', "exception", {
				guid: this.guid,
				exception: e
			});
		}

		log.access.log('info', 'disconnect', {
			guid: this.guid,
			ip: ip,
			port: port
		});
         
        this.socket.broadcast.emit('leave', {
            guid: this.guid
        });
        
        this.socket.removeAllListeners('talk');
        this.socket.removeAllListeners('command');
        this.socket.removeAllListeners('disconnect');

        this.room.leave(this);
    }
}

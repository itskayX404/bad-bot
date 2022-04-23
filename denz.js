const { WAConnection, MessageType, Presence, MessageOptions, Mimetype, WALocationMessage, WAMessageProto, ReconnectMode, ProxyAgent, ChatModification, GroupSettingChange, WA_MESSAGE_STUB_TYPES, WA_DEAFULT_EPHEMERAL, waChatKey, mentionedJid, processTime, prepareMessageFromContent, relayWAMessage } = require("@adiwajshing/baileys")
const fs = require("fs")
const setting = JSON.parse(fs.readFileSync("./settings.json"))
const ffmpeg = require('fluent-ffmpeg')
const simple = require('./all/simple.js')
const qrcode = require("qrcode")
const translate = require('@vitalets/google-translate-api')
const { fetchJson, fetchText } = require('./all/fetcher')
const moment = require("moment-timezone")
const { exec } = require('child_process')
const { ownerName, botName, ownerNumber, apiKey } = setting
const commandsDB = JSON.parse(fs.readFileSync('./all/commands.json'))
const scommand = JSON.parse(fs.readFileSync('./all/scommand.json'))
const { addCommands, checkCommands, deleteCommands } = require('./all/autoresp')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./all/functions.js')
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const numpang = new WAConnection()
autorespon = true
autoread = true
mode = true
clog = true
multiprefix = true
allprefix = false

mess = {
         wait: 'Permintaan anda sedang diproses',
         success: 'Permintaan anda berhasil diproses',
error: {
         lv: 'Link tidak valid',
         api: 'Maaf terjadi kesalahan',
         cmd: 'Gunakan perintah dengan benar'
},
         OnlyOwner: 'Perintah ini hanya dapat digunakan oleh *Owner Bot*',
         OnlyGrup: 'Perintah ini hanya bisa digunakan di *Grup Chat*',
         OnlyPM: 'Perintah ini hanya bisa digunakan di *Chat Pribadi*',
         GrupAdmin: 'Perintah ini hanya bisa digunakan oleh *Admin Grup*',
         BotAdmin: 'Perintah ini hanya bisa digunakan ketika bot menjadi *Admin Grup*'
}

const addCmd = (id, command) => { const obj = { id: id, chats: command }
scommand.push(obj)
fs.writeFileSync('./all/scommand.json', JSON.stringify(scommand))}
const getCommandPosition = (id) => { let position = null
Object.keys(scommand).forEach((i) => {
if (scommand[i].id === id) { position = i }})
if (position !== null) { return position}}
const getCmd = (id) => { let position = null
Object.keys(scommand).forEach((i) => {
if (scommand[i].id === id) { position = i }})
if (position !== null) { return scommand[position].chats }}    
    
module.exports = async (nisa, mek) => {
        try {
        const m = await simple.smsg(nisa, mek)
        const antibot = m.isBaileys
        const content = JSON.stringify(m.message)
        const from = m.key.remoteJid
        const type = Object.keys(mek.message)[0]
        const time = moment.tz('Asia/Jakarta').format('ha z')
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(mek.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
        if (multiprefix){ var prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(cmd) ? cmd.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : '.'
        } else {
        if (allprefix){ var prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(cmd) ? cmd.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : ''}}
        const body = (type === 'listResponseMessage' && mek.message.listResponseMessage.title) ? mek.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) : ""
		const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const bb = args.join(' ')
		const isCmd = body.startsWith(prefix)
		const arg = budy.slice(command.length + 2, budy.length)
        const q = body.slice(command.length + 1, body.length)
        const botNumber = nisa.user.jid
        const isGroup = from.endsWith('@g.us')
        const sender = mek.key.fromMe ? nisa.user.jid : isGroup ? m.participant : m.key.remoteJid
        const senderNumber = sender.split("@")[0]
        const groupMetadata = isGroup ? await nisa.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupDesc = isGroup ? groupMetadata.desc : ''
        const groupId = isGroup ? groupMetadata.jid : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender) || false
        const isOwner = ownerNomor.includes(sender)
        const conts = m.key.fromMe ? nisa.user.jid : nisa.contacts[sender] || { notify: jid.replace(/@.+/, '')}
        const pushname = m.key.fromMe ? nisa.user.name : conts.notify || conts.vname || conts.name || 'pushname not detected'
        const isUrl = (url) => { return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}
        String.prototype._replaceAllString = function(s, r) {return this.split(s).join(r); }; function _filterText(str,txt,dt){if (str) {var str = str.toLowerCase(); txt = txt ? txt : "***"; dt = dt ? dt : listkata; for (var i = 0; i < dt.length; i++) {var kk = dt[i].toLowerCase(); var ii = str.search(kk); if ( ii != -1) {str = str._replaceAllString(kk,txt); } } return str; }else{ return undefined; } }
        function parseMention(text = '') { return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}
        const reply = (teks) => { nisa.sendMessage(from, teks, text, { thumbnail: ppu, sendEphemeral: true, quoted: mek, contextInfo: { forwardingScore: 508, isForwarded: true }})}
        const sendMess = (id, teks) => { nisa.sendMessage(id, teks, text, { contextInfo: { forwardingScore: 508, isForwarded: true }})}
        const mentions = (teks, memberr, id) => { (id == null || id == undefined || id == false) ? nisa.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr }}): nisa.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr }})}
        const runtime = function(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " hari, ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " jam, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " menit, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " detik") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;}
        async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms));}
        
        function monospace(string) { return '```' + string + '```' }
        function jsonformat(string) { return JSON.stringify(string, null, 2)}
        function randomNomor(angka) { return Math.floor(Math.random() * angka) + 1 }
        
        let d = new Date
		let locale = 'en'
		const calender = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
		
        try { pporang = await nisa.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)} catch { pporang = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'}
		const ppu = await getBuffer(pporang)
		
        const isImage = (type === 'imageMessage')
        const isVideo = (type === 'videoMessage')
        const isSticker = (type == 'stickerMessage')                
        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
        const isQuotedMsg = type === 'extendedTextMessage' && content.includes('Message')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        
        const sendListMessage = (id, text1, desc1, sec  = [], options = {}) => {
        const listMessages = { buttonText: text1, description: desc1, sections: sec, listType: 1 }
        nisa.sendMessage(id, listMessages, MessageType.listMessage, options)}

        const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
        const buttonMessages = { contentText: text1, footerText: desc1, buttons: but, headerType: "EMPTY" }
        nisa.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)}
        
        const sendButDocument = async(id, text1, desc1, media, doc1, but = [], options = {}) => {
        kma = doc1
        mhan = await nisa.prepareMessage(from, media, document, kma)
        const buttonMessages = { documentMessage: mhan.message.documentMessage,contentText: text1,footerText: desc1,buttons: but,headerType: "DOCUMENT"}
        nisa.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)}
        
        const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
        kma = gam1
        mhan = await nisa.prepareMessage(from, kma, image)
        const buttonMessages = {imageMessage: mhan.message.imageMessage,contentText: text1,footerText: desc1,buttons: but,headerType: "IMAGE"}
        nisa.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)}
        
        const sendButVideo = async(id, text1, desc1, vid1, but = [], options = {}) => {
        kma = vid1
        mhan = await nisa.prepareMessage(from, kma, video)
        const buttonMessages = {videoMessage: mhan.message.videoMessage,contentText: text1,footerText: desc1,buttons: but,headerType: "VIDEO"}
        nisa.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)}
        
        const sendButLocation = async (id, text1, desc1, loc1, but = [], options = {}) => {
        kma = loc1
        mhan = await nisa.prepareMessage(from, kma, location)
        const buttonMessages = { locationMessage: mhan.message.locationMessage,contentText: text1,footerText: desc1,buttons: but,headerType: "LOCATION"}
        nisa.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)}
		
		selectedButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''
        responseButton = (type == 'listResponseMessage') ? mek.message.listResponseMessage.title : ''
        
        if (autoread) {nisa.chatRead(from)}
		if (mek.key.remoteJid == 'status@broadcast') return
	    if ([`${nisa.user.jid}`].includes((type === 'extendedTextMessage') ? mek.message.extendedTextMessage.contextInfo.participant : '')) {
        if (mek.key.fromMe) return
        if (command) return
        if (!isGroup) return
        if (!autorespon) return
        anu = await fetchJson(`https://simsimi.info/api/?text=${cmd}&lc=id`)
        hasil = anu.success
        translate(hasil, {from:'en', to:'auto'}).then((res) =>{
        nisa.sendMessage(from, `${res.text}`, text, {thumbnail: ppu, sendEphemeral: true, quoted:mek})})}
        if (!isGroup && !mek.key.fromMe && !command && autorespon) {
        anu = await fetchJson(`https://simsimi.info/api/?text=${cmd}&lc=id`)
        hasil = anu.success
        translate(hasil, {from:'en', to:'auto'}).then((res) =>{
        nisa.sendMessage(from, `${res.text}`, text, {thumbnail: ppu, sendEphemeral: true, quoted:mek})})}
        
        if (budy.startsWith(`$`)){ if (!isOwner && !mek.key.fromMe) return
		const sep = budy.split("\n")
        let exc = budy.replace(sep[0]+"\n", "")
        exec(exc, (err, stdout, stderr) => {
        if (stdout) return reply(`${stdout}`)
        if (stderr) return reply(`${stderr}`)
        if (err) return reply(`${err}`)})}
		
		if (listkata.includes(cmd)){reply('عَنْ أَبِي الدَّرْدَاءِ، أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: إِنَّ اللَّهَ لَيُبْغِضُ الفَاحِشَ البَذِيءَ\n\nDari Abu Ad-Darda’ radhiallahu ‘anhu bahwasanya Rasulullah ﷺ bersabda, “Sungguh Allah benci dengan orang yang lisannya kotor dan kasar.”')}
		if (['Ceoo','ceoo','Ceo','ceo','Ceeo','ceeo'].includes(cmd)){m.reply(`Halo kak ${pushname} ada yang bisa ${cmd} bantu? >-<`)}
		
		if (/^=?>/.test(budy) && (isOwner || mek.key.fromMe)){ let parse = /^=>/.test(budy) ? budy.replace(/^=>/,'return') : budy.replace(/^>/,'')
        try{ let evaluate = await eval(`;(async () => {${parse} })()`).catch(e => { return e })
        return reply(require('util').format(evaluate))} catch(e){
        return reply(require('util').format(e))}}

	    if (!mode) { if (!isOwner && !mek.key.fromMe) return }
        switch (command) {
	
        case 'menu': case 'help':
ubio = await nisa.getStatus(`${sender.split('@')[0]}@c.us`)
ubio = ubio.status == 401 ? 'Hey there! I am using WhatsApp.' : ubio.status
menunya = `☰ \`\`\`${botName}\`\`\`
⚥ ${isOwner ? 'owner' : 'user'} : _${pushname} - ${ubio}_
♺ date : _${calender} - ${time}_

☰ \`\`\`List Menu\`\`\`
❏ ${prefix}sticker [ _reply media_ ]
└ _membuat gambar/video menjadi sticker_

❏ ${prefix}emojimix [ _emoji1+emoji2_ ]
└ _mix emoji menjadi sticker_

❏ ${prefix}tahta [ _text_ ]
└ _membuat text menjadi gambar harta tahta_

❏ ${prefix}dadu [  ]
└ _mengirim sticker random dadu_

❏ ${prefix}ghstalk [ _username_ ]
└ _mengambil informasi user github_

❏ ${prefix}igstalk [ _username_ ]
└ _mengambil informasi user instagram_

❏ ${prefix}searchgc [ _text_ ]
└ _mencari grup whatsapp_

❏ ${prefix}brainly [ _text_ ]
└ _mencari jawaban menggunakan brainly_

❏ ${prefix}happymod [ _text_ ]
└ _mencari aplikasi mod di happymod_

❏ ${prefix}addcmd [ _reply sticker + text_ ]
└ _menambahkan command sticker_

❏ ${prefix}delcmd [ _reply cmd sticker_ ]
└ _menghapus command sticker_

❏ ${prefix}listcmd [  ]
└ _menampilkan list command sticker_

❏ ${prefix}update [  ]
└ _mengupdate sistem bot_

❏ ${prefix}restart [  ]
└ _merestart sistem bot_

❏ ${prefix}infobot [  ]
└ _mengirim informasi bot_

❏ ${prefix}shutdown [  ]
└ _mematikan sistem bot_

❏ ${prefix}delete [ _reply media_ ]
└ _menghapus chat bot_

❏ ${prefix}autorespon [  ]
└ _mengaktifkan/nonaktifkan fitur simsimi_

❏ ${prefix}autoread [  ]
└ _mengaktifkan/nonaktifkan fitur auto baca_

❏ ${prefix}mode [  ]
└ _mengganti mode public/self_

❏ ${prefix}jadibot [  ]
└ _menumpang jadi bot_

❏ ${prefix}stopjadibot [  ]
└ _mematikan jadi bot_

❏ ${prefix}bc [ _text_ ]
└ _mengirim broadcast ke semua chat_

❏ ${prefix}asupan [  ]
└ _mengirim gambar asupan_

❏ ${prefix}cekapi [  ]
└ _mengecek apikey_

❏ ${prefix}covid [ _country_ ]
└ _mengambil informasi corona virus_

❏ ${prefix}mplid [  ]
└ _mengambil informasi mpl indonesia_

❏ ${prefix}faktaunik [  ]
└ _mengirim text random fakta unik_

❏ ${prefix}pantun [  ]
└ _mengirim text random pantun_

❏ ${prefix}katabijak [  ]
└ _mengirim text random kata bijak_

❏ ${prefix}doaharian [  ]
└ _mengirim text random bacaan doa harian_

❏ ${prefix}kitabharian [  ]
└ _mengirim text random bacaan alkitab harian_

❏ ${prefix}listgc [  ]
└ _mengirim informasi list grup_

❏ ${prefix}infogempa [  ]
└ _mengirim informasi gempa terbaru_

❏ ${prefix}alquran [ _surah_ ]
└ _mencari surah al quran_

❏ ${prefix}alkitab [ _text_ ]
└ _mencari al kitab_

☰ \`\`\`Information\`\`\`
✆ developer : _@${denis.split('@')[0]} & @${ari.split('@')[0]}_
✎ note : _simbol [ ] tidak digunakan dalam perintah. jika perintah bot tidak merespon kemungkinan api's error_`
sendButMessage(from, menunya, copyright, [{buttonId:`sc`,buttonText:{displayText:'SCRIPT'},type:1},{buttonId:`owner`,buttonText:{displayText:'OWNER'},type:1},{buttonId:`status`,buttonText:{displayText:'STATUS'},type:1}],{quoted:mek, contextInfo: { mentionedJid: [denis,ari], forwardingScore: 508, isForwarded: true }})
        break
        
        case 'jadibot':
if (!isOwner && !mek.key.fromMe) return reply(`jika ingin menggunakan fitur ini silahkan izin terlebih dahulu ke owner bot wa.me/${ownerNumber}`)
numpang.logger.level = 'silent'
numpang.version = [2, 2142, 12]
numpang.browserDescription = [`${pushname}`,'Desktop','3.0']
if (args[0] && args[0].length > 200) { let json = Buffer.from(args[0], 'base64').toString('utf-8') 
let obj = JSON.parse(json)
await numpang.loadAuthInfo(obj)}
try { numpang.on('qr' ,async qr => {
qrbot = await qrcode.toDataURL(qr, { scale: 8 })
buffer = await Buffer.from(qrbot.split('data:image/png;base64,')[1], 'base64')
await fs.writeFileSync(`./trash/jadibot@${sender}.jpg`, buffer)
mhan = await nisa.prepareMessage(from, fs.readFileSync(`./trash/jadibot@${sender}.jpg`), image)
let scan = await nisa.sendMessage(from, {imageMessage: mhan.message.imageMessage,contentText: 'Scan QR ini untuk jadi bot sementara!\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini \n\nQR Expired dalam 20 detik',footerText: 'klik batal jika ingin membatalkan',buttons: [{buttonId:`dstopjadibot`,buttonText:{displayText:"BATAL"},type:1}], headerType: "IMAGE"}, MessageType.buttonsMessage, {quoted:mek})
setTimeout(() => { nisa.deleteMessage(from, scan.key)}, 20000);})  
numpang.on ('open', async () => { console.log('credentials update')
const authInfo = numpang.base64EncodedAuthInfo()
fs.writeFileSync(`./trash/${sender}.json`, JSON.stringify(authInfo  ,null, '\t'))
await numpang.sendMessage('0@s.whatsapp.net', `Kamu bisa login tanpa qr dengan pesan dibawah ini`, MessageType.extendedText)
numpang.sendMessage('0@s.whatsapp.net', `${prefix}${command} ${Buffer.from(JSON.stringify(authInfo)).toString('base64')}`, MessageType.extendedText)})
numpang.on('chat-update', async (chat) => { 
if (!chat.hasNewMessage) return
chat = chat.messages.all()[0]
if (!chat.message) return
if (chat.key && !chat.key.remoteJid == 'status@broadcast') return
require('./denz.js')(numpang, chat)})    
await numpang.connect().then(async ({user}) => { reply('Berhasil tersambung dengan WhatsApp - mu.\n*NOTE: Ini cuma numpang*\n' + JSON.stringify(user, null, 2))})
} catch { reply('jadibot telah dibatalkan')}
        break
        
        case 'dstopjadibot':
numpang.close()
        break
        
        case 'stopjadibot':
if (!isOwner && !mek.key.fromMe) return reply('perintah ini hanya dapat digunakan oleh saya')
try { reply(mess.wait)
fs.unlinkSync(`./trash/${sender}.json`)
numpang.close()} catch {reply(mess.error.api)}
        break
        
        case 'script': case 'sc':
nisa.sendMessage(from, `${script}`, text, { quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{previewType:"PHOTO",thumbnail:ppu,sourceUrl:script}}})
        break
       
        case 'd': case 'del': case 'delete':
nisa.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
		break
		
        case 'report':
if (!bb) return reply(mess.error.cmd)
reply("developer bot akan segera merespon laporan anda, terimakasih telah melaporkan")
nisa.sendMessage(denis, `command: ${bb}\ntime: ${calender} - ${time}\nfrom: ${pushname}`, text, {contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:"command reported",previewType:"PHOTO",thumbnail:ppu,sourceUrl:`https://api.whatsapp.com/send?phone=${senderNumber}`}}})
        break
        
        case 'owner':
nisa.sendMessage(from, { displayname: ownerName, vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + ownerName + '\n' + 'TEL;type=CELL;type=VOICE;waid=' + ownerNumber + ':+' + ownerNumber + '\n' + 'END:VCARD'}, MessageType.contact, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{previewType:"PHOTO",thumbnail:ppu,sourceUrl:`https://api.whatsapp.com/send?phone=${ownerNumber}`}}})
        break 
        
        case 'bc':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (!bb) return reply(mess.error.cmd)
anu = await nisa.chats.all()
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
buffer = await nisa.downloadMediaMessage(encmedia)
for (let _ of anu) { sendButImage(_.jid, `${bb}`, "jika anda merasa terganggu dengan boardcast ini, silahkan klik clear", buffer, [{buttonId:`dclearchat`,buttonText:{displayText:"CLEAR"},type:1}], {contextInfo: { forwardingScore: 508, isForwarded: true }})}
reply(mess.success)
} else { 
for (let _ of anu) { sendButMessage(_.jid, `${bb}`, "jika anda merasa terganggu dengan boardcast ini, silahkan klik clear", [{buttonId:`dclearchat`,buttonText:{displayText:"CLEAR"},type:1}], {contextInfo: { forwardingScore: 508, isForwarded: true }})}
reply(mess.success)}
        break
        
        case 'dclearchat':
if (isGroup) return reply(mess.OnlyPM)
sendMess(from, `selamat tinggal, jika ingin menggunakan bot ini kembali silahkan klik wa.me/${nisa.user.jid}`)
await sleep(3000)
nisa.modifyChat(from, "delete")
        break
        
        case 'info': case 'infobot':
teks = `${JSON.stringify(setting, null, 2)}
${JSON.stringify(nisa.user.phone, null, 2)}
${JSON.stringify(ip, null, 2)}`
nisa.sendMessage(from, _filterText(teks, '#hidden#' ), text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'status':
exec(`pm2 describe index`, (err, stdout, stderr) => {
if (stdout) return reply(`${stdout}`)
if (stderr) return reply(`${stderr}`)
if (err) return reply(`${err}`)})
        break
        
        case 'emojimix': case 'mixemoji':
if (!bb) return reply(mess.error.cmd)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
txt = bb.split("+")
teks1 = txt[0]
teks2 = txt[1]
ran1 = `./trash/${getRandom('.bin')}`
ran2 = `./trash/${getRandom('.webp')}`
anu = `https://violetics.pw/api/media/emojimix?apikey=${apiKey}&emoji1=${teks1}&emoji2=${teks2}`
exec(`wget "${anu}" -O ${ran1} && ffmpeg -i ${ran1} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ran2}`, (err) => { if (err) return reply("gagal, silahkan coba lagi menggunakan emoji yang berbeda/balik emoji yang anda kirim")
fs.unlinkSync(ran1)
buffer = fs.readFileSync(ran2)
nisa.sendMessage(from, buffer, sticker, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}}).then(() => {fs.unlinkSync(ran2)})})
        break
        
        case 's': case 'sticker': case 'stiker':
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
if ((isMedia || isQuotedVideo || isQuotedImage) && args.length == 0) {
const encmedia = isQuotedImage || isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
var file = await nisa.downloadAndSaveMediaMessage(encmedia, `./trash/${getRandom()}`)
var ran = getRandom('.webp')
ffmpeg(`./${file}`).input(file).on('error', () => { fs.unlinkSync(file)
reply(mess.error.api)}).on('end', () => {
nisa.sendMessage(from, fs.readFileSync(`./trash/${ran}`), sticker, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
fs.unlinkSync(file)
fs.unlinkSync(`./trash/${ran}`)}).addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`]).toFormat('webp').save(`./trash/${ran}`)} else {reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)}
        break
        
        case 'listgc':
const txs = nisa.chats.all().filter(d => d.jid.endsWith('g.us')).map(d =>`* ${nisa.getName(d.jid)}\n"${d.jid}"\n[ ${d.read_only ? 'left' : 'joined'} ]`).join`\n\n`
reply(txs)
        break
        
        case 'ghstalk':
if (!bb) return reply(mess.error.cmd)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/stalk/github?apikey=${apiKey}&username=${bb}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
buffer = await getBuffer(anu.result.avatar_url)
nisa.sendMessage(from, buffer, image, {quoted:mek, caption:`${jsonformat(anu.result)}`, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'igstalk':
if (!bb) return reply(mess.error.cmd)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/stalk/instagram?apikey=${apiKey}&username=${bb}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
buffer = await getBuffer(anu.result.profile_pic_url)
nisa.sendMessage(from, buffer, image, {quoted:mek, caption:`${jsonformat(anu.result)}`, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'searchgc': case 'carigc':
if (!bb) return reply(mess.error.cmd)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/search/group-whatsapp?apikey=${apiKey}&query=${bb}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
nisa.sendMessage(from, `${jsonformat(anu.result)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'addcmd': case 'setcmd':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (isQuotedSticker) {
if (!bb) return reply(mess.error.cmd)
var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
addCmd(kodenya, bb)
reply(mess.success)} else {reply(mess.error.cmd)}
        break
        
        case 'delcmd': case 'delcmd':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (isQuotedSticker) {
var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
scommand.splice(getCommandPosition(kodenya), 1)
fs.writeFileSync('./all/scommand.json', JSON.stringify(scommand))
reply(mess.success)} else {reply(mess.error.cmd)}
        break
        
        case 'listcmd':
nisa.sendMessage(from, `${jsonformat(scommand)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'brainly':
if (!bb) return reply(mess.error.cmd)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/media/brainly?apikey=${apiKey}&query=${bb}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
nisa.sendMessage(from, `${jsonformat(anu.result)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'update':
if (!isOwner) return reply(mess.OnlyOwner)
exec(`git remote set-url origin https://github.com/dcode-denpa/bad-bot.git && git pull`, (err, stdout, stderr) => { 
if (stdout) return reply(`${stdout}`)
if (stderr) return reply(`${stderr}`)
if (err) return reply(`${err}`)})
        break
        
        case 'restart':
if (!isOwner) return reply(mess.OnlyOwner)
exec(`pm2 restart index`, (err, stdout, stderr) => {
if (stdout) return reply(`${stdout}`)
if (stderr) return exec(`rs`, (err, stdout, stderr) => {if (stdout) return reply(`${stdout}`);if (stderr) return reply(`${stderr}`);if (err) return reply(`${err}`)})
if (err) return reply(`${err}`)})
        break
        
        case 'shutdown': case 'stop':
if (!isOwner) return reply(mess.OnlyOwner)
exec(`pm2 stop index`, (err, stdout, stderr) => {
if (stdout) return reply(`${stdout}`)
if (stderr) return nisa.sendMessage(from, JSON.stringify(eval(process.exit())))
if (err) return reply(`${err}`)})
        break
        
        case 'autorespon':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (args.length < 1) return sendButMessage(from, `silahkan pilih opsi berikut`, '', [{ buttonId: `autorespon on`, buttonText: { displayText: "ON" }, type: 1},{ buttonId: `autorespon off`, buttonText: { displayText: "OFF" }, type: 1}], {quoted:mek})
if (bb === 'on'){ autorespon = true
allprefix = false
multiprefix = true
reply(mess.success)
} else if (bb === 'off'){ autorespon = false
allprefix = true
multiprefix = false
reply(mess.success)} else { reply(mess.error.cmd)}
        break
        
        case 'mode':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (args.length < 1) return sendButMessage(from, `silahkan pilih opsi berikut`, '', [{ buttonId: `mode public`, buttonText: { displayText: "PUBLIC" }, type: 1},{ buttonId: `mode self`, buttonText: { displayText: "SELF" }, type: 1}], {quoted:mek})
if (bb === 'public'){ mode = true
reply(mess.success)
} else if (bb === 'self'){ mode = false
reply(mess.success)} else { reply(mess.error.cmd)}
        break
        
        case 'autoread':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (args.length < 1) return sendButMessage(from, `silahkan pilih opsi berikut`, '', [{ buttonId: `autoread on`, buttonText: { displayText: "ON" }, type: 1},{ buttonId: `autoread off`, buttonText: { displayText: "OFF" }, type: 1}], {quoted:mek})
if (bb === 'on'){ autoread = true
reply(mess.success)
} else if (bb === 'off'){ autoread = false
reply(mess.success)} else { reply(mess.error.cmd)}
        break
        
        case 'asupan':
if (args.length < 1) return  sendListMessage(from, 'List Asupan', 'silahkan pilih opsi berikut', [{rows: [{ "title":"asupan cecan"},{"title":"asupan chinese"},{"title":"asupan indonesia"},{"title":"asupan japan"},{"title":"asupan korea"},{"title":"asupan malaysia"},{"title":"asupan thailand"},{"title":"asupan vietnam"}]}],{quoted:mek})
if (bb === 'cecan'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/cecan?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
} else if (bb === 'chinese'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/chinese?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
} else if (bb === 'indonesia'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/indonesia?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
} else if (bb === 'japan'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/japan?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
} else if (bb === 'korea'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/korea?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
} else if (bb === 'malaysia'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/malaysia?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
} else if (bb === 'thailand'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/thailand?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
} else if (bb === 'vietnam'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/vietnam?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
} else { reply(mess.error.api) }
        break
        
        case 'tahta':
if (!bb) return reply(mess.error.cmd)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
buffer = await getBuffer(`https://violetics.pw/api/jimp/tahta?apikey=${apiKey}&text=${bb}`)
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'dadu':
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
buffer = await getBuffer(`https://violetics.pw/api/random/dadu?apikey=${apiKey}`)
nisa.sendMessage(from, buffer, sticker, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'happymod':
if (!bb) return reply(mess.error.cmd)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/apk/happymod?apikey=${apiKey}&apps=${bb}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
nisa.sendMessage(from, `${jsonformat(anu.result)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'cekapi':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
anu = await fetchJson(`https://violetics.pw/api/utility/check-apikey?apikey=${apiKey}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
result = _filterText(`${jsonformat(anu.result)}`, '#hidden#' );
reply(result)
        break
        
        case 'covid':
if (!bb) return reply(mess.error.cmd)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/information/corona-virus?apikey=${apiKey}&country=${bb}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
nisa.sendMessage(from, `${jsonformat(anu.result)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'mplid':
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/information/mplid?apikey=${apiKey}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
nisa.sendMessage(from, `${jsonformat(anu.result)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'alquran':
if (!bb) return reply(mess.error.cmd)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/religion/alquran?apikey=${apiKey}&surah=${bb}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
nisa.sendMessage(from, `${jsonformat(anu.result)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'alkitab':
if (!bb) return reply(mess.error.cmd)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/religion/alkitab-search?apikey=${apiKey}&text=${bb}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
nisa.sendMessage(from, `${jsonformat(anu.result)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        case 'faktaunik':
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/information/faktaunik?apikey=${apiKey}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
sendButMessage(from, `${jsonformat(anu.result)}`, "klik retry jika ingin mencoba kembali", [{buttonId:`faktaunik`,buttonText:{displayText:"RETRY"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
        break
        
        case 'doaharian':
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/religion/doa-harian?apikey=${apiKey}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
sendButMessage(from, `${jsonformat(anu.result)}`, "klik retry jika ingin mencoba kembali", [{buttonId:`doaharian`,buttonText:{displayText:"RETRY"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
        break
        
        case 'kitabharian':
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/religion/alkitab-bacaharian?apikey=${apiKey}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
sendButMessage(from, `${jsonformat(anu.result)}`, "klik retry jika ingin mencoba kembali", [{buttonId:`doaharian`,buttonText:{displayText:"RETRY"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
        break
        
        case 'pantun':
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/random/pantun?apikey=${apiKey}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
sendButMessage(from, `${jsonformat(anu.result)}`, "klik retry jika ingin mencoba kembali", [{buttonId:`pantun`,buttonText:{displayText:"RETRY"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
        break
        
        case 'katabijak':
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/random/katabijak?apikey=${apiKey}`, {method: 'get'})
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
sendButMessage(from, `${jsonformat(anu.result)}`, "klik retry jika ingin mencoba kembali", [{buttonId:`katabijak`,buttonText:{displayText:"RETRY"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
        break
        
        case 'infogempa':
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
anu = await fetchJson(`https://violetics.pw/api/information/gempa-terbaru?apikey=${apiKey}`, {method: 'get'})
buffer = await getBuffer(anu.result.shakemap)
if (anu.status == 400 || anu.isError == true) return reply(`${anu.message}`)
nisa.sendMessage(from, buffer, image, {quoted:mek, caption:`${jsonformat(anu.result)}`, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:`${grup}`}}})
        break
        
        default:

if (clog) {console.log(mek)}}} catch (e) { e = String(e)
if (!e.includes("jid is not defined")) { if (!e.includes("this.isZero")) { if (clog) {console.log(`\x1b[31m${e}\x1b[0m`)}}}}}
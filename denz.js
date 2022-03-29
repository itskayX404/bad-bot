const { WAConnection, MessageType, Presence, MessageOptions, Mimetype, WALocationMessage, WAMessageProto, ReconnectMode, ProxyAgent, ChatModification, GroupSettingChange, WA_MESSAGE_STUB_TYPES, WA_DEAFULT_EPHEMERAL, waChatKey, mentionedJid, processTime, prepareMessageFromContent, relayWAMessage } = require("@adiwajshing/baileys")
const fs = require("fs")
const setting = JSON.parse(fs.readFileSync("./settings.json"))
const ffmpeg = require('fluent-ffmpeg')
const simple = require('./all/simple.js')
const { fetchJson, fetchText } = require('./all/fetcher')
const moment = require("moment-timezone")
const { exec } = require('child_process')
const { color, bgcolor, clcolor } = require('./all/color.js')
const { ownerName, botName, ownerNumber, apiKey } = setting
const commandsDB = JSON.parse(fs.readFileSync('./trash/commands.json'))
const scommand = JSON.parse(fs.readFileSync('./trash/scommand.json'))
const { addCommands, checkCommands, deleteCommands } = require('./all/autoresp')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./all/functions.js')
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const copyright = `\`\`\`© by ${ownerName} 2k22\`\`\``
autorespon = false
autoread = true
autojoin = false
mode = true

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
fs.writeFileSync('./trash/scommand.json', JSON.stringify(scommand))}
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
        const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(cmd) ? cmd.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : ''
        const body = (type === 'listResponseMessage' && mek.message.listResponseMessage.title) ? mek.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) : ""
		const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const bb = args.join(' ')
		const isCmd = body.startsWith(prefix)
		const arg = budy.slice(command.length + 2, budy.length)
        const q = body.slice(command.length + 1, body.length)
        const totalchat = await nisa.chats.all()
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
        function parseMention(text = '') { return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}
        const reply = (teks) => { nisa.sendMessage(from, teks, text, { quoted: mek, contextInfo: { forwardingScore: 508, isForwarded: true }})}
        const sendMess = (id, teks) => { nisa.sendMessage(id, teks, text)}
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
        return dDisplay + hDisplay + mDisplay + sDisplay;
        }
        
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
		
		if (autoread) {nisa.chatRead(from)}
		if (!isGroup && !mek.key.fromMe && autorespon) {
        if (m.key.remoteJid == 'status@broadcast') return
        anu = await fetchJson(`https://simsimi.info/api/?text=${cmd}&lc=id`)
        hasil = anu.success
        nisa.sendMessage(from, `${hasil}`, text, {thumbnail: ppu, sendEphemeral: true, quoted:mek})}
        
        if (!mek.key.fromMe && autojoin) {
        if (budy.includes("://chat.whatsapp.com/")) { reply("group link detected, auto join")
        nisa.query({json:["action", "invite", `${budy.replace('https://chat.whatsapp.com/','')}`]})}}
        
        if (budy.startsWith(`$`)){ if (!isOwner && !mek.key.fromMe) return
		const sep = budy.split("\n")
        let exc = budy.replace(sep[0]+"\n", "")
        exec(exc, (err, stdout) => { if (err) return reply(`${err}`)
		if (stdout) { reply(`${stdout}`)}})}
		
	    if (!mode) { if (!isOwner && !mek.key.fromMe) return }
		if (isCmd && !isGroup)
        console.log(color('[ MAIN ]'), `${time}`, color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroup)
        console.log(color('[ MAIN ]'), `${time}`, color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        
        switch (command) {
	
        case 'menu': case 'help':
anu = await fetchJson(`https://numlookupapi.com/api/validate/${senderNumber}`, {method: 'get'})
ubio = await nisa.getStatus(`${sender.split('@')[0]}@c.us`)
ubio = ubio.status == 401 ? 'Hey there! I am using WhatsApp.' : ubio.status
menunya = `☰ \`\`\`${botName}\`\`\`
♺ date : _${calender} - ${time}_
⚥ ${isOwner ? 'owner' : 'user'} : _${pushname}, ${ubio} - ${anu.country_name}, ${anu.carrier} ${anu.line_type}_

☰ \`\`\`List Menu\`\`\`
❏ ${prefix}sticker [ _reply media_ ]
└ _membuat gambar/video menjadi sticker_

❏ ${prefix}tahta [ _text_ ]
└ _membuat text menjadi gambar tahta_

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

❏ ${prefix}delete [ _reply media_ ]
└ _menghapus chat bot_

❏ ${prefix}autorespon [  ]
└ _mengaktifkan/nonaktifkan fitur simsimi_

❏ ${prefix}autoread [  ]
└ _mengaktifkan/nonaktifkan fitur auto baca_

❏ ${prefix}autojoin [  ]
└ _mengaktifkan/nonaktifkan fitur auto gabung grup_

❏ ${prefix}mode [  ]
└ _mengganti mode public/self_

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
└ _mengirim informasi fakta unik_

❏ ${prefix}infogempa [  ]
└ _mengirim informasi gempa terbaru_

☰ \`\`\`Information\`\`\`
✆ developer : _@${denis.split('@')[0]} & @${ari.split('@')[0]}_
✎ note : _simbol [ ] tidak digunakan dalam perintah. jika perintah bot tidak merespon kemungkinan api's error_`
sendButMessage(from, menunya, copyright, [{buttonId:`sc`,buttonText:{displayText:'SCRIPT'},type:1},{buttonId:`owner`,buttonText:{displayText:'OWNER'},type:1},{buttonId:`status`,buttonText:{displayText:'STATUS'},type:1}],{quoted:mek, contextInfo: { mentionedJid: [denis,ari], forwardingScore: 508, isForwarded: true }})
        break
        
        case 'script': case 'sc':
nisa.sendMessage(from, 'https://github.com/dcode-denpa/bad-bot', text, { quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://github.com/dcode-denpa/bad-bot"}}})
        break
       
        case 'd': case 'del': case 'delete':
nisa.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
		break
		
        case 'report':
if (!bb) return reply(mess.error.cmd)
reply("developer bot akan segera merespon laporan anda, terimakasih telah melaporkan")
nisa.sendMessage("6285866295942@s.whatsapp.net", `command: ${bb}\ntime: ${time}\nfrom: ${pushname}`, text, {contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:"command reported",previewType:"PHOTO",thumbnail:ppu,sourceUrl:`https://api.whatsapp.com/send?phone=${senderNumber}`}}})
        break
        
        case 'owner':
nisa.sendMessage(from, { displayname: ownerName, vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + ownerName + '\n' + 'TEL;type=CELL;type=VOICE;waid=' + ownerNumber + ':+' + ownerNumber + '\n' + 'END:VCARD'}, MessageType.contact, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{previewType:"PHOTO",thumbnail:ppu,sourceUrl:`https://api.whatsapp.com/send?phone=${ownerNumber}`}}})
        break 
        
        case 'bc':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (!bb) return reply(mess.error.cmd)
anu = await nisa.chats.all()
for (let _ of anu) { nisa.sendMessage(_.jid, `${bb}`, text, {contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${botName} broadcast`,previewType:"PHOTO",thumbnail:ppu}}})}
reply(mess.success)
        break
        
        case 'status':
anu = await fetchJson(`http://ip-api.com/json/?fields=country,regionName,timezone,isp`, {method: 'get'})
teks = `${JSON.stringify(setting, null, 2)}
${JSON.stringify(nisa.user.phone, null, 2)}
${JSON.stringify(anu, null, 2)}`
nisa.sendMessage(from, teks, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 's': case 'sticker': case 'stiker':
if ((isQuotedVideo || isQuotedImage) && args.length == 0) {
const encmedia = isQuotedImage || isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
var file = await nisa.downloadAndSaveMediaMessage(encmedia, `./trash/${getRandom()}`)
var ran = getRandom('.webp')
ffmpeg(`./${file}`).input(file).on('error', () => { fs.unlinkSync(file)
reply(mess.error.api)}).on('end', () => {
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, fs.readFileSync(`./trash/${ran}`), sticker, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
fs.unlinkSync(file)
fs.unlinkSync(`./trash/${ran}`)}).addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`]).toFormat('webp').save(`./trash/${ran}`)} else {
reply(`reply media yang sudah dikirim`)}
        break
        
        case 'ghstalk':
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/stalk/github?apikey=${apiKey}&username=${bb}`, {method: 'get'})
buffer = await getBuffer(anu.result.avatar_url)
if (anu.status == 400) return reply(`${anu.message}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, caption:`${JSON.stringify(anu.result, null, 2)}`, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'igstalk':
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/stalk/instagram?apikey=${apiKey}&username=${bb}`, {method: 'get'})
buffer = await getBuffer(anu.result.profile_pic_url)
if (anu.status == 400) return reply(`${anu.message}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, caption:`${JSON.stringify(anu.result, null, 2)}`, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'searchgc':
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/search/group-whatsapp?apikey=${apiKey}&query=${bb}`, {method: 'get'})
if (anu.status == 400) return reply(`${anu.message}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, `${JSON.stringify(anu.result, null, 2)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
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
fs.writeFileSync('./trash/scommand.json', JSON.stringify(scommand))
reply(mess.success)} else {reply(mess.error.cmd)}
        break
        
        case 'listcmd':
nisa.sendMessage(from, `${JSON.stringify(scommand, null, 2)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'brainly':
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/media/brainly?apikey=${apiKey}&query=${bb}`, {method: 'get'})
if (anu.status == 400) return reply(`${anu.message}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, `${JSON.stringify(anu.result, null, 2)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'update':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
exec(`git remote set-url origin https://github.com/dcode-denpa/bad-bot.git && git pull`, (error, stdout, stderr) => { reply(stdout)})
        break
        
        case 'autorespon':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (args.length < 1) return sendButMessage(from, `silahkan pilih opsi berikut`, '', [{ buttonId: `autorespon on`, buttonText: { displayText: "ON" }, type: 1},{ buttonId: `autorespon off`, buttonText: { displayText: "OFF" }, type: 1}], {quoted:mek})
if (bb === 'on'){ autorespon = true
reply(mess.success)
} else if (bb === 'off'){ autorespon = false
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
        
        case 'autojoin':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (args.length < 1) return sendButMessage(from, `silahkan pilih opsi berikut`, '', [{ buttonId: `autojoin on`, buttonText: { displayText: "ON" }, type: 1},{ buttonId: `autojoin off`, buttonText: { displayText: "OFF" }, type: 1}], {quoted:mek})
if (bb === 'on'){ autojoin = true
reply(mess.success)
} else if (bb === 'off'){ autojoin = false
reply(mess.success)} else { reply(mess.error.cmd)}
        break
        
        case 'asupan':
if (args.length < 1) return  sendListMessage(from, 'List Asupan', 'silahkan pilih opsi berikut', [{rows: [{ "title":"asupan cecan"},{"title":"asupan chinese"},{"title":"asupan indonesia"},{"title":"asupan japan"},{"title":"asupan korea"},{"title":"asupan malaysia"},{"title":"asupan thailand"},{"title":"asupan vietnam"}]}],{quoted:mek})
if (bb === 'cecan'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/cecan?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'chinese'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/chinese?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'indonesia'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/indonesia?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'japan'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/japan?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'korea'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/korea?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'malaysia'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/malaysia?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'thailand'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/thailand?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'vietnam'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/vietnam?apikey=${apiKey}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else { reply(mess.error.api) }
        break
        
        case 'tahta':
if (!bb) return reply(mess.error.cmd)
buffer = await getBuffer(`https://violetics.pw/api/jimp/tahta?apikey=${apiKey}&text=${bb}`)
if (anu.status == 400) return reply(`${anu.message}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'happymod':
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/apk/happymod?apikey=${apiKey}&apps=${bb}`, {method: 'get'})
if (anu.status == 400) return reply(`${anu.message}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, `${JSON.stringify(anu.result, null, 2)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'cekapi':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
anu = await fetchJson(`https://violetics.pw/api/utility/check-apikey?apikey=${apiKey}`, {method: 'get'})
if (anu.status == 400) return reply(`${anu.message}`)
reply(`${JSON.stringify(anu.result, null, 2)}`)
        break
        
        case 'covid':
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/information/corona-virus?apikey=${apiKey}&country=${bb}`, {method: 'get'})
if (anu.status == 400) return reply(`${anu.message}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, `${JSON.stringify(anu.result, null, 2)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'mplid':
anu = await fetchJson(`https://violetics.pw/api/information/mplid?apikey=${apiKey}`, {method: 'get'})
if (anu.status == 400) return reply(`${anu.message}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, `${JSON.stringify(anu.result, null, 2)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'faktaunik':
anu = await fetchJson(`https://violetics.pw/api/information/faktaunik?apikey=${apiKey}`, {method: 'get'})
if (anu.status == 400) return reply(`${anu.message}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, `${JSON.stringify(anu.result, null, 2)}`, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'infogempa':
anu = await fetchJson(`https://violetics.pw/api/information/gempa-terbaru?apikey=${apiKey}`, {method: 'get'})
buffer = await getBuffer(anu.result.shakemap)
if (anu.status == 400) return reply(`${anu.message}`)
sendButMessage(from, mess.wait, "klik report jika bot tidak merespon", [{buttonId:`report ${command}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
nisa.sendMessage(from, buffer, image, {quoted:mek, caption:`${JSON.stringify(anu.result, null, 2)}`, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        default:

if (/^=?>/.test(budy) && (isOwner || mek.key.fromMe)){ let parse = /^=>/.test(budy) ? budy.replace(/^=>/,'return') : budy.replace(/^>/,'')
try{ let evaluate = await eval(`;(async () => {${parse} })()`).catch(e => { return e })
return reply(require('util').format(evaluate))} catch(e){
return reply(require('util').format(e))}}

}} catch (e) { e = String(e)
if (!e.includes("jid is not defined")) {
if (!e.includes("this.isZero")) { console.log(e)}}}}
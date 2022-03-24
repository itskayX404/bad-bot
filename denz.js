const { WAConnection, MessageType, Presence, MessageOptions, Mimetype, WALocationMessage, WAMessageProto, ReconnectMode, ProxyAgent, ChatModification, GroupSettingChange, WA_MESSAGE_STUB_TYPES, WA_DEAFULT_EPHEMERAL, waChatKey, mentionedJid, processTime, prepareMessageFromContent, relayWAMessage } = require("@adiwajshing/baileys")
const fs = require("fs")
const setting = JSON.parse(fs.readFileSync("./settings.json"))
const ffmpeg = require('fluent-ffmpeg')
const simple = require('./all/simple.js')
const { fetchJson, fetchText } = require('./all/fetcher')
const moment = require("moment-timezone")
const { exec } = require('child_process')
const { color, bgcolor, clcolor } = require('./all/color.js')
const { botName, ownerNumber, ownerName, apiKey } = setting
const commandsDB = JSON.parse(fs.readFileSync('./trash/commands.json'))
const scommand = JSON.parse(fs.readFileSync('./trash/scommand.json'))
const { addCommands, checkCommands, deleteCommands } = require('./all/autoresp')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./all/functions.js')
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const copyright = `\`\`\`© by ${ownerName} 2k22\`\`\``
autorespon = false

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
        const time = moment.tz('Asia/Jakarta').format('HH:mm')
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
        const sender = m.key.fromMe ? nisa.user.jid : isGroup ? m.participant : m.key.remoteJid
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
		
		if (!isGroup && !mek.key.fromMe && autorespon) {
        if (m.key.remoteJid == 'status@broadcast') return
        anu = await fetchJson(`https://api.simsimi.net/v2/?text=${cmd}&lc=id`)
        hasil = anu.success
        nisa.sendMessage(from, `${hasil}`, text, {thumbnail: ppu, sendEphemeral: true, quoted:mek})}
         
		if (isCmd && !isGroup)
        console.log(color('[ MAIN ]'), `${time}`, color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroup)
        console.log(color('[ MAIN ]'), `${time}`, color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        
        switch (command) {
	
        case "menu":
        case "help":
ubio = await nisa.getStatus(`${sender.split('@')[0]}@c.us`)
ubio = ubio.status == 401 ? 'Hey there! I am using WhatsApp.' : ubio.status
denis = "6285866295942@s.whatsapp.net"
ari = "6285863731628@s.whatsapp.net"
menunya = `☰ \`\`\`${botName}\`\`\`
⚥ ${isOwner ? 'owner' : 'user'} : _${pushname} - ${ubio}_
♺ date : _${calender} - ${time}_

☰ \`\`\`List Menu\`\`\`
❏ ${prefix}sticker [ _reply media_ ]
└ _membuat gambar/video menjadi sticker_

❏ ${prefix}attp [ _text_ ]
└ _membuat text menjadi sticker bergerak_

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

❏ ${prefix}autorespon [  ]
└ _mengaktifkan/nonaktifkan fitur simsimi_

❏ ${prefix}asupan [  ]
└ _mengirim gambar asupan_

☰ \`\`\`Information\`\`\`
✆ developer : _@${denis.split('@')[0]} & @${ari.split('@')[0]}_
✎ note : _simbol [ ] tidak digunakan dalam perintah. jika perintah bot tidak merespon kemungkinan api's error_`
sendButMessage(from, menunya, copyright, [{buttonId:`sc`,buttonText:{displayText:'SCRIPT'},type:1},{buttonId:`owner`,buttonText:{displayText:'OWNER'},type:1},{buttonId:`status`,buttonText:{displayText:'STATUS'},type:1}],{quoted:mek, contextInfo: { mentionedJid: [denis,ari], forwardingScore: 508, isForwarded: true }})
        break
        
        case "script":
        case "sc":
nisa.sendMessage(from, 'https://github.com/dcode-denpa/bad-bot', text, { quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://github.com/dcode-denpa/bad-bot"}}})
        break
       
        case 'owner':
	    case 'creator':
        case 'developer':
		case 'author':
nisa.sendMessage(from, { displayname: ownerName, vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + ownerName + '\n' + 'ORG:Contact\n' + 'TEL;type=CELL;type=VOICE;waid=' + ownerNumber + ':+' + ownerNumber + '\n' + 'END:VCARD'}, MessageType.contact, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{previewType:"PHOTO",thumbnail:ppu,sourceUrl:`https://api.WhatsApp.com/send?phone=${ownerNumber}`}}})
        break 
        
        case "s":
        case "sticker":
        case "stiker":
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await nisa.downloadAndSaveMediaMessage(encmedia, 'media_user')
ran = getRandom('.webp')
await ffmpeg(`${media}`)
.input(media)
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
reply(mess.error.api)
})
.on('end', function () {
console.log('Finish')
buffer = fs.readFileSync(ran)
reply(mess.wait)
nisa.sendMessage(from, buffer, sticker, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await nisa.downloadAndSaveMediaMessage(encmedia, 'media_user')
ran = getRandom('.webp')
reply(mess.wait)
await ffmpeg(`${media}`)
.inputFormat(media.split('.')[1])
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker. pastikan untuk video yang dikirim tidak lebih dari 9 detik`)
})
.on('end', function () {
console.log('Finish')
reply(mess.wait)
nisa.sendMessage(from, fs.readFileSync(ran), sticker, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await nisa.downloadAndSaveMediaMessage(encmedia, 'media_user')
ranw = getRandom('.webp')
ranp = getRandom('.png')
keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
await removeBackgroundFromImageFile({ path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp }).then(res => {
fs.unlinkSync(media)
let buffer = Buffer.from(res.base64img, 'base64')
fs.writeFileSync(ranp, buffer, (err) => {
if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
})
exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
fs.unlinkSync(ranp)
if (err) return reply(mess.error.api)
reply(mess.wait)
nisa.sendMessage(from, fs.readFileSync(ranw), sticker, { quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
fs.unlinkSync(ranw)
})
})
} else {
reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
}
        break
        
        case 'attp':
if (!bb) return reply(mess.error.cmd)
buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${bb}`)
reply(mess.wait)
nisa.sendMessage(from, buffer, sticker, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case "ghstalk":
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/stalk/github?apikey=${apiKey}&username=${bb}`, {method: 'get'})
teks = `Login : ${anu.result.login}
Id : ${anu.result.id}
Type : ${anu.result.type}
Site_admin : ${anu.result.site_admin}
Name : ${anu.result.name}
Company : ${anu.result.company}
Blog : ${anu.result.blog}
Location : ${anu.result.location}
Email : ${anu.result.email}
Hireable : ${anu.result.hireable}
Bio : ${anu.result.bio}
Twitter_username : ${anu.result.twitter_username}
Public_repos : ${anu.result.public_repos}
Public_gists : ${anu.result.public_gists}
Followers : ${anu.result.followers}
Following : ${anu.result.following}
Created_at : ${anu.result.created_at}
Updated_at : ${anu.result.updated_at}`
buffer = await getBuffer(anu.result.avatar_url)
reply(mess.wait)
nisa.sendMessage(from, ppu, image, {quoted:mek, caption:teks, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case "igstalk":
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/stalk/instagram?apikey=${apiKey}&username=${bb}`, {method: 'get'})
teks = `Biography : ${anu.result.biography}
Blocked_by_viewer : ${anu.result.blocked_by_viewer}
Restricted_by_viewer : ${anu.result.restricted_by_viewer}
Country_block : ${anu.result.country_block}
External_url : ${anu.result.external_url}
External_url_linkshimmed : ${anu.result.external_url_linkshimmed}
Edge_followed_by : ${anu.result.edge_followed_by.count}
Fbid : ${anu.result.fbid}
Followed_by_viewer : ${anu.result.followed_by_viewer}
Edge_follow : ${anu.result.edge_follow.count}
Follows_viewer : ${anu.result.follows_viewer}
Full_name : ${anu.result.full_name}
Has_ar_effects : ${anu.result.has_ar_effects}
Has_clips : ${anu.result.has_clips}
Has_guides : ${anu.result.has_guides}
Has_channel : ${anu.result.has_channel}
Has_blocked_viewer : ${anu.result.has_blocked_viewer}
Highlight_reel_count : ${anu.result.highlight_reel_count}
Has_requested_viewer : ${anu.result.has_requested_viewer}
Hide_like_and_view_counts : ${anu.result.hide_like_and_view_counts}
Id : ${anu.result.id}
Is_business_account : ${anu.result.is_business_account}
Is_professional_account : ${anu.result.is_professional_account}
Is_supervision_enabled : ${anu.result.is_supervision_enabled}
Is_guardian_of_viewer : ${anu.result.is_guardian_of_viewer}
Is_supervised_by_viewer : ${anu.result.is_supervised_by_viewer}
Is_embeds_disabled : ${anu.result.is_embeds_disabled}
Is_joined_recently : ${anu.result.is_joined_recently}
Business_address_json : ${anu.result.business_address_json}
Business_contact_method : ${anu.result.business_contact_method}
Business_email : ${anu.result.business_email}
Business_phone_number : ${anu.result.business_phone_number}
Business_category_name : ${anu.result.business_category_name}
Category_enum : ${anu.result.category_enum}
Category_name : ${anu.result.category_name}
Is_private : ${anu.result.is_private}
Is_verified : ${anu.result.is_verified}
Requested_by_viewer : ${anu.result.requested_by_viewer}
Should_show_category : ${anu.result.should_show_category}
Should_show_public_contacts : ${anu.result.should_show_public_contacts}
State_controlled_media_country : ${anu.result.state_controlled_media_country}
Username : ${anu.result.username}
Connected_fb_page : ${anu.result.connected_fb_page}`
buffer = await getBuffer(anu.result.profile_pic_url_hd)
reply(mess.wait)
nisa.sendMessage(from, ppu, image, {quoted:mek, caption:teks, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'searchgc':
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/search/group-whatsapp?apikey=${apiKey}&query=${bb}`, {method: 'get'})
anu = anu.result
teks = ""
for (var b of anu) {
teks += `Title : ${b.title}\n`
teks += `Url : ${b.url}\n\n`}
reply(mess.wait)
nisa.sendMessage(from, teks, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'addcmd': 
        case 'setcmd':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (isQuotedSticker) {
if (!bb) return reply(mess.error.cmd)
var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
addCmd(kodenya, bb)
reply(mess.success)} else {reply(mess.error.cmd)}
        break
        
        case 'delcmd':
        case 'delcmd':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (isQuotedSticker) {
var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
scommand.splice(getCommandPosition(kodenya), 1)
fs.writeFileSync('./trash/scommand.json', JSON.stringify(scommand))
reply(mess.success)} else {reply(mess.error.cmd)}
        break
        
        case 'listcmd':
teks = ""
let cemde = []
for (let i of scommand) { cemde.push(i.id)
teks += `Id : ${i.id}\n`
teks += `Cmd : ${i.chats}\n\n`}
nisa.sendMessage(from, teks, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'brainly':
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/media/brainly?apikey=${apiKey}&query=${bb}`, {method: 'get'})
anu = anu.result
teks = ""
for (var b of anu) {
teks += `Source : ${b.source}\n`
teks += `Pertanyaan : ${b.pertanyaan}\n`
teks += `${b.jawaban}\n`}
reply(mess.wait)
nisa.sendMessage(from, teks, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'update':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
exec(`git remote set-url origin https://github.com/dcode-denpa/bad-bot.git && git pull`, (error, stdout, stderr) => { reply(stdout)})
        break
        
        case 'autorespon':
if (!isOwner && !mek.key.fromMe) return reply(mess.OnlyOwner)
if (args.length < 1) return sendButMessage(from, `silahkan pilih opsi berikut`, '', [{ buttonId: `autorespon on`, buttonText: { displayText: `ON`, }, type: 1,},{ buttonId: `autorespon off`, buttonText: { displayText: `OFF`, }, type: 1,},], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
if (bb === 'on'){ autorespon = true
reply(mess.success)
} else if (bb === 'off'){ autorespon = false
reply(mess.success)} else { reply(mess.error.cmd)}
        break
        
        case 'asupan':
if (args.length < 1) return  sendListMessage(from, 'LIST ASUPAN', 'silahkan pilih opsi berikut', [{rows: [{ "title":"asupan cecan"},{"title":"asupan chinese"},{"title":"asupan indonesia"},{"title":"asupan japan"},{"title":"asupan korea"},{"title":"asupan malaysia"},{"title":"asupan thailand"},{"title":"asupan vietnam"}]}],{quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
if (bb === 'cecan'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/cecan?apikey=${apiKey}`)
reply(mess.wait)
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'chinese'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/chinese?apikey=${apiKey}`)
reply(mess.wait)
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'indonesia'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/indonesia?apikey=${apiKey}`)
reply(mess.wait)
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'japan'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/japan?apikey=${apiKey}`)
reply(mess.wait)
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'korea'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/korea?apikey=${apiKey}`)
reply(mess.wait)
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'malaysia'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/malaysia?apikey=${apiKey}`)
reply(mess.wait)
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'thailand'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/thailand?apikey=${apiKey}`)
reply(mess.wait)
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else if (bb === 'vietnam'){ buffer = await getBuffer(`https://violetics.pw/api/asupan/vietnam?apikey=${apiKey}`)
reply(mess.wait)
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
} else { reply(mess.error.api) }
        break
        
        case 'tahta':
if (!bb) return reply(mess.error.cmd)
reply(mess.wait)
buffer = await getBuffer(`https://violetics.pw/api/jimp/tahta?apikey=${apiKey}&text=${bb}`)
nisa.sendMessage(from, buffer, image, {quoted:mek, thumbnail:buffer, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        case 'happymod':
if (!bb) return reply(mess.error.cmd)
anu = await fetchJson(`https://violetics.pw/api/apk/happymod?apikey=${apiKey}&apps=${bb}`, {method: 'get'})
anu = anu.result
teks = ""
for (var b of anu) {
teks += `Title : ${b.title}\n`
teks += `Url : ${b.url}\n`
teks += `Rate : ${b.rate}\n\n`}
reply(mess.wait)
nisa.sendMessage(from, teks, text, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${command}`,previewType:"PHOTO",thumbnail:ppu,sourceUrl:"https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"}}})
        break
        
        default:

if (/^=?>/.test(budy) && (isOwner || mek.key.fromMe)){ let parse = /^=>/.test(budy) ? budy.replace(/^=>/,'return') : budy.replace(/^>/,'')
try{ let evaluate = await eval(`;(async () => {${parse} })()`).catch(e => { return e })
return reply(require('util').format(evaluate))} catch(e){
return reply(require('util').format(e))}}

}} catch (e) { e = String(e)
if (!e.includes("jid is not defined")) {
if (!e.includes("this.isZero")) { console.log(e)}}}}
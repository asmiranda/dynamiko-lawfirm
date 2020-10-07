class NodeUtil {
    async generateAvatar(email, gender, callback) {
        const AvatarGenerator = require('avatar-generator')
        const avatar = new AvatarGenerator({
            parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'],
            imageExtension: '.png'
        })
        const variant = gender.toLowerCase();
        const image = await avatar.generate(email, variant)
        const toArray = require('stream-to-array')
        toArray(image.png())
            .then(function (parts) {
                let buffers = []
                for (let i = 0, l = parts.length; i < l; ++i) {
                    let part = parts[i]
                    buffers.push((part instanceof Buffer) ? part : new Buffer(part))
                }
                return callback(Buffer.concat(buffers))
            })
    }

}

const nodeUtil = new NodeUtil();
module.exports = nodeUtil;
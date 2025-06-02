import { Extension, textInputRule } from '@tiptap/core'

export const QuickReactionShortcuts = Extension.create({
    name: 'quickReactionShortcuts',

    addInputRules() {
        return [
            // Quick reaction shortcuts
            textInputRule({ find: /:thumbsup: $/, replace: '👍 ' }),
            textInputRule({ find: /:thumbs_up: $/, replace: '👍 ' }),
            textInputRule({ find: /:\+1: $/, replace: '👍 ' }),
            textInputRule({ find: /:thumbsdown: $/, replace: '👎 ' }),
            textInputRule({ find: /:thumbs_down: $/, replace: '👎 ' }),
            textInputRule({ find: /:-1: $/, replace: '👎 ' }),
            textInputRule({ find: /:heart: $/, replace: '❤️ ' }),
            textInputRule({ find: /:joy: $/, replace: '😂 ' }),
            textInputRule({ find: /:laughing: $/, replace: '😂 ' }),
            textInputRule({ find: /:open_mouth: $/, replace: '😮 ' }),
            textInputRule({ find: /:wow: $/, replace: '😮 ' }),
            textInputRule({ find: /:cry: $/, replace: '😢 ' }),
            textInputRule({ find: /:crying_face: $/, replace: '😢 ' }),
            textInputRule({ find: /:sad: $/, replace: '😢 ' }),
            textInputRule({ find: /:rage: $/, replace: '😡 ' }),
            textInputRule({ find: /:angry: $/, replace: '😡 ' }),
            textInputRule({ find: /:mad: $/, replace: '😡 ' }),
            textInputRule({ find: /:tada: $/, replace: '🎉 ' }),
            textInputRule({ find: /:party: $/, replace: '🎉 ' }),
            textInputRule({ find: /:celebration: $/, replace: '🎉 ' }),

            // Additional common emoji shortcuts
            textInputRule({ find: /:smile: $/, replace: '😊 ' }),
            textInputRule({ find: /:smiley: $/, replace: '😊 ' }),
            textInputRule({ find: /:grin: $/, replace: '😀 ' }),
            textInputRule({ find: /:wink: $/, replace: '😉 ' }),
            textInputRule({ find: /:thinking: $/, replace: '🤔 ' }),
            textInputRule({ find: /:thinking_face: $/, replace: '🤔 ' }),
            textInputRule({ find: /:fire: $/, replace: '🔥 ' }),
            textInputRule({ find: /:rocket: $/, replace: '🚀 ' }),
            textInputRule({ find: /:star: $/, replace: '⭐ ' }),
            textInputRule({ find: /:100: $/, replace: '💯 ' }),
            textInputRule({ find: /:ok_hand: $/, replace: '👌 ' }),
            textInputRule({ find: /:wave: $/, replace: '👋 ' }),
            textInputRule({ find: /:clap: $/, replace: '👏 ' }),
            textInputRule({ find: /:pray: $/, replace: '🙏 ' }),
            textInputRule({ find: /:muscle: $/, replace: '💪 ' }),
            textInputRule({ find: /:eyes: $/, replace: '👀 ' }),
            textInputRule({ find: /:see_no_evil: $/, replace: '🙈 ' }),
            textInputRule({ find: /:hear_no_evil: $/, replace: '🙉 ' }),
            textInputRule({ find: /:speak_no_evil: $/, replace: '🙊 ' }),
        ]
    },
})

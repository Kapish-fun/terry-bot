module.exports = (client, msg, emoji, userID) => {
    if (emoji.name === "coal") {
      console.log(client)
      console.log(msg)
      const coalReactions = msg.reactions.get("coal").count;
      if (coalReactions === 1 && !client.notifiedMessages.has(msg.id)) {
        const member = msg.member;
        if (member) {
          const replyMessage = `${member.username} has opened a vote against ${msg.member.username} as they deem they are coal posting. React with 10 coal emojis to mute and delete their message.`;
          msg.channel.createMessage(replyMessage);
          client.notifiedMessages.add(msg.id);
        }
      } else if (coalReactions >= 10) {
        const member = msg.member;
        const time = new Date(Date.now() + 300000)
        if (member) { 
          try {
            client.editGuildMember(
              msg.guildID,
              member.id,
              { communicationDisabledUntil: 1}
            )
            msg.delete();
          } catch {

          }
          // Delete the message

        }
      }
    }
  };
  
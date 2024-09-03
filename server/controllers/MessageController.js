import UserModel from "../models/UserModel.js";
import ConversationModel from "../models/ConversationModel.js";
import MessageModel from "../models/MessageModel.js";

async function sendMessage(req, res) {
  const { receiverid } = req.params;
  const senderid = req.id;
  const { message } = req.body;

  try {
    if (senderid == receiverid) {
      return res.status(404).json({ error: "Cannot send msg to yourself!" });
    }

    const receiver = await UserModel.findById(receiverid);
    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderid, receiverid] }
    });
    if (!conversation) {
      conversation = new ConversationModel({
        participants: [senderid, receiverid],
        messages: []
      });
      const connection_res = await conversation.save();
      await UserModel.findByIdAndUpdate(senderid, {
        $push: { Conversations: connection_res }
      });
      await UserModel.findByIdAndUpdate(receiverid, {
        $push: { Conversations: connection_res }
      });
    } else {
      const sender = await UserModel.findById(senderid);
      let flag = sender.Conversations.find(
        item => item.toString() === conversation._id
      );
      if (!flag) {
        sender.Conversations.push(conversation._id);
        await sender.save();
      }
    }

    const newMessage = new MessageModel({
      sender: senderid,
      receiver: receiverid,
      message
    });
    await newMessage.save();

    conversation.messages.push(newMessage._id);
    conversation.lastMessage = newMessage._id;
    await conversation.save();

    return res
      .status(200)
      .json({ message: "Message sent successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "errow while sending message" });
  }
}
async function receiveMessage(req, res) {
  const { senderid } = req.params;
  const receiverid = req.id;
  try {
    if (senderid == receiverid) {
      return res.status(404).json({ error: "Cannot send msg to yourself!" });
    }

    const sender = await UserModel.findById(senderid);
    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderid, receiverid] }
    }).populate("messages");
    return res
      .status(200)
      .json({ messages: conversation ? conversation : [], success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "errow while receiving message" });
  }
}

export { sendMessage, receiveMessage };

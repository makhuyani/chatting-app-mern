import mongoose from "mongoose";
import Conversation from "../model/conversation.model.js";
import Message from "../model/messages.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // receiver is the renaming
    const senderId = req.user._id;

    // find the conversation between users
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // create the conversation
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    console.log(message);
    console.log(receiverId);
    // create the message and also add it to the conversation array
    const newMessage = new Messages({
      senderId,
      receiverId,
      message,
    });

    console.log("passing here");

    if (newMessage) {
      console.log("new message ", newMessage._id);
      conversation.messages.push(newMessage._id);
    }

    // save the message
    // await newMessage.save();
    // await conversation.save();

    // the promise will make the two statement runs at the same time optimizing performance
    await Promise.all(newMessage.save(), conversation.save());

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error.message);
    res.status(400).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatToId } = req.params;
    const senderId = req.user._id;

    // get the conversations between two users
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatToId] },
    }).populate("messages"); // the populate returns the child messages table

    //
    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    // return the messages
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages", error.message);
    res.status(400).json({ error: "Internal server error" });
  }
};

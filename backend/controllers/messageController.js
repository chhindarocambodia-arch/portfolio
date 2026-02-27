import { validationResult } from 'express-validator';
import Message from '../models/Message.js';

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const getUnreadMessages = async (req, res, next) => {
  try {
    const messages = await Message.findUnread();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;
    await Message.create({ name, email, subject, message });
    
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await Message.markAsRead(req.params.id);
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await Message.delete(req.params.id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getMessageStats = async (req, res, next) => {
  try {
    const count = await Message.count();
    const unreadCount = await Message.countUnread();
    res.json({ count, unreadCount });
  } catch (error) {
    next(error);
  }
};

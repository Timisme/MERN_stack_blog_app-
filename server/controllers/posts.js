import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// not default export 
export const getPosts = (req, res) => {
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// 1. 從 req 拿 body data 並解構
// 2. new 一個 PostMessage model 並傳入解構值
// 3. try saving obj to db (await)

export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// 1. 從 url request param 拿到 id, url body 拿到 data
// 2. 確認 mongo db 有該筆資料(透過 id)
// 3. findbyidandupdate 將該筆資料更新 (new=true => return new obj)
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}
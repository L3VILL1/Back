//import express from 'express';
const express = require('express');

//import createClient from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
//import {createClient} from '@supabase/supabase-js'
const supabaseClient = require('@supabase/supabase-js');

//import morgan from 'morgan';
const morgan = require('morgan');

//import bodyParser from "body-parser";
const bodyParser = require('body-parser');

//import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabase = 
    supabaseClient.createClient('https://gfitpethcsbbqmjqpjpj.supabase.co', 
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmaXRwZXRoY3NiYnFtanFwanBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxODExMDAsImV4cCI6MjAxNTc1NzEwMH0.W2u9B08E7XY9J_yZK20khtwTxB3-TDDspIj2K5-A1DQ')


app.get('/products', async (req, res) => {
    const {data, error} = await supabase
        .from('products')
        .select()
    res.send(data);
    console.log(`lists all products${data}`);
});

app.get('/products/:id', async (req, res) => {
    console.log("id = " + req.params.id);
    const {data, error} = await supabase
        .from('products')
        .select()
        .eq('id', req.params.id)
    res.send(data);

    console.log("retorno "+ data);
});

app.post('/products', async (req, res) => {
    const {error} = await supabase
        .from('products')
        .insert({
            id : req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        })
    if (error) {
        res.send(error);
    }
    res.send("created!!");
    console.log("retorno "+ req.body.id);
    console.log("retorno "+ req.body.name);
    console.log("retorno "+ req.body.description);
    console.log("retorno "+ req.body.price);

});

app.put('/products/:id', async (req, res) => {
    const {error} = await supabase
        .from('products')
        .update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/products/:id', async (req, res) => {
    console.log("delete: " + req.params.id);
    const {error} = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")
    console.log("delete: " + req.params.id);

});

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
    res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://34.235.136.21:3000/`);
});

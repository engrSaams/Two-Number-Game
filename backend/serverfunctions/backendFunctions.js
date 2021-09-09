const express = require('express');
const router = express.Router();
const connection = require('../configs/database.js');
const mysql = require('mysql2');


var db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'toor',
        password: 'Ron192000',
        port: 3307 // according to your Mysql settings/ configurations
    }
);

function InsertDraw(date,time,combo,gameID){
    db.query("INSERT INTO `numbers`.`draw`(`DrawDate`,`ShiftTime`,`DrawCombo`,`gameid`)VALUES(?,?,?,?)",[date,time,combo,gameID],(err,result)=>
    {
        if(err)
        {
            console.log("Failed to insert Draw");
            return;
        }
        if(result)
        {
            let data = JSON.stringify(result);
            console.log("Inserted new Draw "+ data[0]['date']) // is this right? xd
        }
    })
}


// Insert Bets
// Inert Tickets
// Insert Receipt
function InsertBets(bets)
{ // this will be a json from the client I supposed


}








function CreateTicketControl(user)
{
    let timestamp = + new Date;
    let control = timestamp+user;
    let hash = Buffer.from(control).toString('base64');
    console.log(hash + " " + hash.length);
    return hash;
}

// make a function that will multiply the bet to the result score


function ForceDraw(drawID)
{
    console.log("Draws")
    db.query("SELECT * FROM numbers.draw WHERE DrawID = ?",[drawID],(err,result)=>{

        if(result)
        {
            console.log(result)
            db.query("SELECT * FROM numbers.bets Where DrawID = ?",[drawID],(err,result)=>
            {
                if(result)
                {
                    for(let i = 0; i< result.length;i++)
                    {
                        let digits = result[i].Combo.split("-");
                        console.log(digits);
                    }

                }
            })
        }

    })
    // Get draw ID, query it, query all bets on that draw ID, match it, query it on to the results

}
function Match(userBet,drawCombo,gameID)
{
    switch(gameID)
    {
        case"Ez2ltt":
        MatchEZTwoResult(drawCombo,userBet)
        return;
        case"FoDgltt":
        Match3DigitGame(drawCombo,userBet);
        return;
        case"Sr3ltt":
        Match4DigitGame(drawCombo,userBet);
        return;
    }
}

function MatchEZTwoResult( result,userBet)
{
    let res = result.split("-");
    if(res[0] == res[1] && res[0] == userBet[0] &&res[1] == userBet[1])
    {
        return 500;
    }
    // straight
    if(res[0] == userBet[0] &&res[1] == userBet[1] )
    {
        return 300;
    }
    //rumble
    if(res[0] == userBet[1] &&res[1] == userBet[0] )
    {
        return 100;
    }

    
    // Consolation, please check if logic is right
    for(let i = 0; i<userBet.length;i++)
     for(let j = 0; j<userBet.length;j++)
     {
            if(userBet[i] == res[j])
            return 10;
     }
}
function Match3DigitGame(result,userBet)
{   // this can be optimized, made this with half functioning brain
    let i1 = false;
    let i2 = false;
    let i3 = false;


    for (let i =0; i<result.length;i++)
    {
        if(userBet[0] == result[i])
        {
            i1 = true;
        }
        if(userBet[1] == result[i])
        {
            i2 = true;
        }
        if(userBet[2] == result[i])
        {
            i3 = true;
        }
    }
    if(i1 && i2 && i3)
    {
        return 500;
    }
    return 0;
}

function Match4DigitGame(result,userBet)
{
    for(let i =0; i< result.length;i++)
    {
        if(result[i]!=userBet[i])
        return 0;
    }
    return 500;

}

module.exports = {CreateTicketControl,MatchEZTwoResult,InsertDraw,ForceDraw}

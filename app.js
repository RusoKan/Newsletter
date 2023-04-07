const express = require("express");

const bodyParser = require("body-parser");


const client = require("@mailchimp/mailchimp_marketing");
const http = require("http");
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000")
})

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/signup.html")
    console.log("Client is accessing the GET from Server")
})


app.post("/", (request, response) => {
    const FirstName = request.body.FirstName;
    const LastName = request.body.LastName;
    const Email = request.body.Email;
    console.log(FirstName)
    console.log(LastName)
    console.log(Email)

    const data = {
        members: [{
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: FirstName,
                LNAME: LastName,

            }
        }
        ]
    }
    const jsonData = JSON.stringify(data)




    client.setConfig({
        apiKey: "43c4f7911fcfe7269164e54f65d48191-us8",
        server: "us8",
    });
    //files can be in JSON or Structure like data, Works either way
    const run = async () => {
        try{
        const res = await client.lists.batchListMembers("fb4d966051",
            data
        );
        console.log(res)
        response.sendFile(__dirname + "/success.html")

    }
    
    catch(err){
        response.sendFile(__dirname + "/failure.html")
    }
        
    };

    run().then()
    console.log("did i come first?")
    // .then(response.sendFile(__dirname + "/success.html"))
    // .catch(response.sendFile(__dirname + "/failure.html"))

    
}



)

app.post("/failure",(request,response)=>{

    response.redirect("/")
    
})

// console.log("The number of memeber is "+res.total_created);
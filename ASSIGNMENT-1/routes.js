const users = [];

const reqRoutes = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url==="/"){
        res.write("<html>");
        res.write("<head><title>Landing Page</title></head>");
        res.write("<body>")
        res.write("<h1>Greetings From Bali!</h1>")
        res.write("<br><form method='POST' action='/create-user'><input type='text' name='user'><button type='submit'>Submit</button></form>");
        res.write("<br><br><a href='/users'>See user list</a>")
        res.write("</body>");
        res.write("</html>")
        res.end();
    }if(url==="/create-user" && method === "POST"){
        const body = [];
        req.on("data",(chunk)=>{
            body.push(chunk);
        });
        req.on("end",()=>{
            const bodyParser = Buffer.concat(body).toString();
            const user = bodyParser.split("=")[1].replaceAll("+"," ");
            users.push(user);
            console.log(`new user is ${user}`);
        })
        res.statusCode = 302;
        res.setHeader("Location", "/users");
        res.end();
    }if(url==="/users"){
        res.write("<html>");
        res.write("<head><title>Users List</title></head>");
        res.write("<body>");
        res.write("<h1>Users List</h1>");
        res.write("<ul>");
        users.forEach((user)=>{
            res.write(`<li>${user}</li>`);
        })
        res.write("</ul>")
        res.write("<br><a href='/'>Back to landing page</a>")
        res.write("</body>");
        res.write("</html>")
        res.end();
    }
}

module.exports = {reqRoutes, users};
 
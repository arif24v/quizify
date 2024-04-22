export default function Page() {
    var state = "L";
    function switchMethod(m){
        if(!m===state){
            if(m==="L"){
                console.log("logging in");
                state = "L";
                document.getElementById("submit").innerHTML="Register";
            } else{
                console.log("signing up");
                state = "S";
                document.getElementById("submit").innerHTML="Sign Up";
            }
        }
    }
    return (
        <main>
            <head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
                </link>
            </head>
            <body>
                <div class="row">
                <div id="image" class=".col-6 .col-sm-3">
                    <img src="imgplaceholder.jpg" width="100px" height="100px"></img>
                </div>
                <div id="loginscreen" class=".col-6 .col-sm-3">
                    <button type="button" onclick={switchMethod("L")}>Log In</button>
                    <button type="button" onclick={switchMethod("S")}>Sign Up</button>
                <form>
                    <div>
                        <h1 class="display-3">Log In</h1> 
                    </div>
                    <div class="form-row align-items-center">
                        <label for="inputUser" class="h4">Username</label>
                        <input type="text" class="form-control" id="inputUser" placeholder="Username"></input>
                    </div>
                    <div class="form-group">
                        <label for="inputPass" class="h4">Password</label>
                        <input type="text" class="form-control" id="inputPass" placeholder="Password"></input>
                    </div>
 
                    <button type="submit" class="btn btn-primary" id="submit">Sign in</button>
                </form>
                </div>
                </div>
            </body>
        </main>
    );
}




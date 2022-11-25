



function Page({id,name,sdescription,img,register,ldescription}){
    console.log("Render");
    return (
            <div className="register" >
                <center>
            <h1 className="rname"
            >{name}</h1>   </center>
            <p className="ldescription">{ldescription}</p>


                <a className="btn btn-success"  height="auto" href={register}>Register</a>

            </div>

    )
}
export default Page;
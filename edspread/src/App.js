import Page from "./page"
import ReactDom from "react-dom"
import i1 from "./images/1.jpg"
import i2 from "./images/2.jpg"
import i3 from "./images/3.jpg"
import i4 from "./images/4.jpg"
import i5 from "./images/5.jpg"
import i6 from "./images/6.jpg"


function App() {
  function idreturn(val){
    switch(val){
    case 1: return i1 ;break;
    case 2: return i2 ;break;
    case 3: return i3 ;break;
    case 4: return i4 ;break;
    case 5: return i5 ;break;
    case 6: return i6 ;break;
    default:break;
    }
  }


  function handleClick(eve){
    var clickedId=eve.target.id;
    // console.log(clickedId)
     if(clickedId==='S1'){
      ReactDom.createPortal(<Page {...club[0]} />,document.getElementById("root"))
     }
     if(clickedId==='S2'){
      ReactDom.render(<Page {...club[1]} />,document.getElementById("root"))
     }
     if(clickedId==='S3'){
      ReactDom.render(<Page {...club[2]} />,document.getElementById("root"))
     }
     if(clickedId==='S4'){
      ReactDom.render(<Page {...club[3]} />,document.getElementById("root"))
     }
     if(clickedId==='S5'){
      ReactDom.render(<Page {...club[4]} />,document.getElementById("root"))
     }
     if(clickedId==='S6'){
      ReactDom.render(<Page {...club[5]} />,document.getElementById("root"))
     }
      // case 'S2':  return (<Page ob={club[1] } />);break;
      // case 'S3':  return (<Page ob={club[2]} />);break;
      // case 'S4': return (<Page ob={club[3]}/>);break;
      // case 'S5':return (<Page ob={club[4]}/> );break;
      // case 'S6': return (<Page ob={club[5]}/>);break;
      // default:break;
    

  }
const club=[
{
  id:1,
  name:"Ramanujam  Maths Club",
  sdescription:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas fugit ab quas necessitatibus at repellendus dolores autem rerum repellat ratione? Sit delectus facilis eius omnis cumque iste sunt in dolorum!",
  register:"https://forms.office.com/Pages/ResponsePage.aspx?id=Qi-gizOk1Uq9qwEDobxfpVnUbd6-lGFKuA92JU1QZtJUQlhCTk5ZSTE2Rkw2SThMUVpCQzdRWU9COC4u",
  ldescription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem tenetur quibusdam cupiditate aut amet consequuntur distinctio quaerat, veniam, commodi debitis sit deleniti officiis quo nesciunt magni mollitia placeat nostrum. Quae.Officiis, consequuntur! Pariatur asperiores, hic similique ab iusto repellat perspiciatis facilis et ut fugiat libero sequi quisquam rerum mollitia, amet aperiam quo, sunt magni! Ratione numquam deleniti voluptatibus rem eligendi!Magnam ex fuga nisi ducimus quae suscipit autem. Repellendus, deleniti veniam saepe qui aliquid dolore distinctio, placeat iste enim eligendi voluptatibus neque alias? Non deleniti libero blanditiis iusto, reprehenderit quam!Sed doloribus libero, quos, quasi earum nam nesciunt voluptates similique sequi dolorem illum repellat quibusdam aut laudantium. Aliquid ea vitae quibusdam dolore ipsa mollitia. Eveniet magni illum obcaecati expedita dolorum!Doloremque, placeat libero eveniet expedita voluptates pariatur architecto, corporis, ullam similique eaque dolore! Quam at illo modi obcaecati, cupiditate fuga in adipisci molestias dolorum sint est repellat commodi, nostrum sunt?"

},
{
  id:2,
  name:"kreeda Club",
  sdescription:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas fugit ab quas necessitatibus at repellendus dolores autem rerum repellat ratione? Sit delectus facilis eius omnis cumque iste sunt in dolorum!n",
  ldescription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem tenetur quibusdam cupiditate aut amet consequuntur distinctio quaerat, veniam, commodi debitis sit deleniti officiis quo nesciunt magni mollitia placeat nostrum. Quae.Officiis, consequuntur! Pariatur asperiores, hic similique ab iusto repellat perspiciatis facilis et ut fugiat libero sequi quisquam rerum mollitia, amet aperiam quo, sunt magni! Ratione numquam deleniti voluptatibus rem eligendi!Magnam ex fuga nisi ducimus quae suscipit autem. Repellendus, deleniti veniam saepe qui aliquid dolore distinctio, placeat iste enim eligendi voluptatibus neque alias? Non deleniti libero blanditiis iusto, reprehenderit quam!Sed doloribus libero, quos, quasi earum nam nesciunt voluptates similique sequi dolorem illum repellat quibusdam aut laudantium. Aliquid ea vitae quibusdam dolore ipsa mollitia. Eveniet magni illum obcaecati expedita dolorum!Doloremque, placeat libero eveniet expedita voluptates pariatur architecto, corporis, ullam similique eaque dolore! Quam at illo modi obcaecati, cupiditate fuga in adipisci molestias dolorum sint est repellat commodi, nostrum sunt?"
,
register:"https://forms.office.com/r/C4S2197Bf4"

},{
  id:3,
  name:"Chaitanya Chaaya Club ",
  sdescription:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas fugit ab quas necessitatibus at repellendus dolores autem rerum repellat ratione? Sit delectus facilis eius omnis cumque iste sunt in dolorum!",
  ldescription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem tenetur quibusdam cupiditate aut amet consequuntur distinctio quaerat, veniam, commodi debitis sit deleniti officiis quo nesciunt magni mollitia placeat nostrum. Quae.Officiis, consequuntur! Pariatur asperiores, hic similique ab iusto repellat perspiciatis facilis et ut fugiat libero sequi quisquam rerum mollitia, amet aperiam quo, sunt magni! Ratione numquam deleniti voluptatibus rem eligendi!Magnam ex fuga nisi ducimus quae suscipit autem. Repellendus, deleniti veniam saepe qui aliquid dolore distinctio, placeat iste enim eligendi voluptatibus neque alias? Non deleniti libero blanditiis iusto, reprehenderit quam!Sed doloribus libero, quos, quasi earum nam nesciunt voluptates similique sequi dolorem illum repellat quibusdam aut laudantium. Aliquid ea vitae quibusdam dolore ipsa mollitia. Eveniet magni illum obcaecati expedita dolorum!Doloremque, placeat libero eveniet expedita voluptates pariatur architecto, corporis, ullam similique eaque dolore! Quam at illo modi obcaecati, cupiditate fuga in adipisci molestias dolorum sint est repellat commodi, nostrum sunt?",
  register:"https://forms.office.com/r/hv9zGRXnMn"

},
{
  id:4,
  name:"Google Development Student Club",
  sdescription:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas fugit ab quas necessitatibus at repellendus dolores autem rerum repellat ratione? Sit delectus facilis eius omnis cumque iste sunt in dolorum!",
  register:"https://forms.office.com/r/4JAJPpnDcz",
ldescription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem tenetur quibusdam cupiditate aut amet consequuntur distinctio quaerat, veniam, commodi debitis sit deleniti officiis quo nesciunt magni mollitia placeat nostrum. Quae.Officiis, consequuntur! Pariatur asperiores, hic similique ab iusto repellat perspiciatis facilis et ut fugiat libero sequi quisquam rerum mollitia, amet aperiam quo, sunt magni! Ratione numquam deleniti voluptatibus rem eligendi!Magnam ex fuga nisi ducimus quae suscipit autem. Repellendus, deleniti veniam saepe qui aliquid dolore distinctio, placeat iste enim eligendi voluptatibus neque alias? Non deleniti libero blanditiis iusto, reprehenderit quam!Sed doloribus libero, quos, quasi earum nam nesciunt voluptates similique sequi dolorem illum repellat quibusdam aut laudantium. Aliquid ea vitae quibusdam dolore ipsa mollitia. Eveniet magni illum obcaecati expedita dolorum!Doloremque, placeat libero eveniet expedita voluptates pariatur architecto, corporis, ullam similique eaque dolore! Quam at illo modi obcaecati, cupiditate fuga in adipisci molestias dolorum sint est repellat commodi, nostrum sunt?"


}
,{
  id:5,
  name:"Chaitanya Smriti Club",
  sdescription:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas fugit ab quas necessitatibus at repellendus dolores autem rerum repellat ratione? Sit delectus facilis eius omnis cumque iste sunt in dolorum!",
  ldescription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem tenetur quibusdam cupiditate aut amet consequuntur distinctio quaerat, veniam, commodi debitis sit deleniti officiis quo nesciunt magni mollitia placeat nostrum. Quae.Officiis, consequuntur! Pariatur asperiores, hic similique ab iusto repellat perspiciatis facilis et ut fugiat libero sequi quisquam rerum mollitia, amet aperiam quo, sunt magni! Ratione numquam deleniti voluptatibus rem eligendi!Magnam ex fuga nisi ducimus quae suscipit autem. Repellendus, deleniti veniam saepe qui aliquid dolore distinctio, placeat iste enim eligendi voluptatibus neque alias? Non deleniti libero blanditiis iusto, reprehenderit quam!Sed doloribus libero, quos, quasi earum nam nesciunt voluptates similique sequi dolorem illum repellat quibusdam aut laudantium. Aliquid ea vitae quibusdam dolore ipsa mollitia. Eveniet magni illum obcaecati expedita dolorum!Doloremque, placeat libero eveniet expedita voluptates pariatur architecto, corporis, ullam similique eaque dolore! Quam at illo modi obcaecati, cupiditate fuga in adipisci molestias dolorum sint est repellat commodi, nostrum sunt?"
,
register:"https://forms.office.com/r/9yhsGASwwG"

},{
  id:6,
  name:"Chaitanya Saahithi Club",
  sdescription:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas fugit ab quas necessitatibus at repellendus dolores autem rerum repellat ratione? Sit delectus facilis eius omnis cumque iste sunt in dolorum!",
  ldescription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem tenetur quibusdam cupiditate aut amet consequuntur distinctio quaerat, veniam, commodi debitis sit deleniti officiis quo nesciunt magni mollitia placeat nostrum. Quae.Officiis, consequuntur! Pariatur asperiores, hic similique ab iusto repellat perspiciatis facilis et ut fugiat libero sequi quisquam rerum mollitia, amet aperiam quo, sunt magni! Ratione numquam deleniti voluptatibus rem eligendi!Magnam ex fuga nisi ducimus quae suscipit autem. Repellendus, deleniti veniam saepe qui aliquid dolore distinctio, placeat iste enim eligendi voluptatibus neque alias? Non deleniti libero blanditiis iusto, reprehenderit quam!Sed doloribus libero, quos, quasi earum nam nesciunt voluptates similique sequi dolorem illum repellat quibusdam aut laudantium. Aliquid ea vitae quibusdam dolore ipsa mollitia. Eveniet magni illum obcaecati expedita dolorum!Doloremque, placeat libero eveniet expedita voluptates pariatur architecto, corporis, ullam similique eaque dolore! Quam at illo modi obcaecati, cupiditate fuga in adipisci molestias dolorum sint est repellat commodi, nostrum sunt?"
  ,register:"https://forms.office.com/r/Vu5eJSG5QF"
}
]
return (
  <div className="uphold">
    <div className="upcomming">
      <h1 style={{
        fontfamily: "'Chakra Petch', sans-serif",
        alignItems:"center",
        display:"flex",
        justifyContent:"center",
        fontSize:"50px",
        color:"white"
      }
      
      
      } className="update">Upcomming Events </h1>
      <marquee width="95%" direction="left" height="100px" >
        <p>
        <a href="/">This is upcomming Event 1  </a>
        <a href="/">This is upcomming Event 2</a>
        <a href="/">This is upcomming Event 3</a>
        <a href="/">This is upcomming Event 4</a>
        </p>
        </marquee>
    </div>
   <div className="cbody">

    {club.map((a)=>{
      return (
      // <div className={a.id} onClick={handleEvent}>
      // <img src={a.img} alt="Not found" width={300} height={200} />
      // <h1><strong>{a.name}</strong></h1>
      // <p>{a.sdescription}</p>
      // </div>

      <div className="card col-3 cd tcard " id={a.id} style={{display:"inline-block", margin:"20px", height:"400px", width:"400px"}}>
      <img className="card-img-top tcard" src={idreturn(a.id)} alt="abc" style={{width:"200px", height:"150px",alignItems:"center" ,display:"flex" ,justifyItems:"center"}} />
      < div className="card-body tcard">
      <h5 className="card-title tcard ">{a.name}</h5>
      <p className="card-text" tcard>{a.sdescription}</p>
      <button className="btn btn-primary" id={"S" +a.id} onClick={handleClick} style={{marginTop:"10px"}}>See more</button>
    </div>

</div>
      )
    })}
 </div>
 </div>
)
}

export default App;

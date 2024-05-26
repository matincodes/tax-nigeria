
const Button = (props) =>{
     return (
       <div>
         <button type="button" className="border rounded-lg pl-[25px] pr-[25px] pt-[15px] pb-[15px] h-[40px] bg-tax-blue text-tax-gray flex gap-2 text-center place-content-center items-center"> 
           {(props.icon && (props.iconposition === "left")) ? (
             <><h2 className="text-[19px]">{props.icon}</h2> <p className="text-sm">{props.text}</p></>
           ) : (props.icon && props.iconposition === "right") ? (
             <><p className="text-sm">{props.text}</p> <h2 className="text-[19px]">{props.icon}</h2></>
           ) : (
             <p className="text-sm">{props.text}</p>
           )}
          </button>
             
       </div>
     )
   }
   
   export default Button
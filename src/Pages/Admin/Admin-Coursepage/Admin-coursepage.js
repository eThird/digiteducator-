import React from "react";
import { Link } from "react-router-dom";

const Admincoursepage=()=>{
    return(
        <div>
           <Link to ='./CreateNewcourse/CreateNewcourse.js'>//this button will be linked to create new course page
            <button>
                Create New Course
            </button>
           </Link>
           
        </div>
    );
}

export default Admincoursepage;